import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import MarkdownIt from 'markdown-it';

const root = process.cwd();
const required = ['title', 'shortTitle', 'order', 'kind', 'track', 'level', 'minutes', 'updated', 'summary', 'sessions', 'sources'];
const tutorialDir = path.join(root, 'content', 'tutorials');
const tutorialFiles = fs.readdirSync(tutorialDir).filter((file) => file.endsWith('.md'));
const errors = [];

if (tutorialFiles.length !== 12) errors.push(`Expected 12 tutorials, found ${tutorialFiles.length}`);

let totalMinutes = 0;
for (const file of tutorialFiles) {
  const full = path.join(tutorialDir, file);
  const { data, content } = matter(fs.readFileSync(full, 'utf8'));
  for (const key of required) if (data[key] === undefined) errors.push(`${file}: missing ${key}`);
  totalMinutes += Number(data.minutes || 0);
  const quizzes = (content.match(/<details>/g) || []).length;
  if (quizzes !== 5) errors.push(`${file}: expected 5 quiz questions, found ${quizzes}`);
  if (!content.includes('```mermaid')) errors.push(`${file}: missing Mermaid diagram`);
  for (const heading of ['## 学习目标', '## 完整案例', '## 动手练习', '### 参考答案', '## 学完检查', '## 常见误区', '## 对应论坛场次', '## 五道自测题', '## 延伸阅读']) {
    if (!content.includes(heading)) errors.push(`${file}: missing section ${heading}`);
  }
}
if (totalMinutes < 480 || totalMinutes > 720) errors.push(`Tutorial time must be 8-12 hours, found ${totalMinutes} minutes`);

const glossaryPath = path.join(root, 'content', 'reference', 'glossary.md');
const glossaryBody = matter(fs.readFileSync(glossaryPath, 'utf8')).content;
const glossaryTokens = new MarkdownIt().parse(glossaryBody, {});
const glossaryRows = glossaryTokens.filter((token) => token.type === 'tr_open').length - 1;
if (glossaryRows < 80) errors.push(`Expected at least 80 glossary terms, found ${glossaryRows}`);

const sessionNotes = ['day-1', 'day-2', 'day-3'].flatMap((day) => fs.readdirSync(path.join(root, 'notes', day))
  .filter((file) => file.endsWith('.md') && file !== 'README.md' && file !== 'daily-review.md')
  .map((file) => path.join(root, 'notes', day, file)));
if (sessionNotes.length !== 24) errors.push(`Expected 24 session notes, found ${sessionNotes.length}`);
for (const file of sessionNotes) {
  const content = fs.readFileSync(file, 'utf8');
  for (const heading of ['## 会前猜想', '## 核心架构', '## 现场记录', '## 量化证据', '## 适用边界', '## 待提问题', '## 人物与项目', '## 会后行动']) {
    if (!content.includes(heading)) errors.push(`${path.relative(root, file)}: missing ${heading}`);
  }
}

const scheduleBody = matter(fs.readFileSync(path.join(root, 'content', 'reference', 'schedule-map.md'), 'utf8')).content;
const scheduleNoteLinks = [...scheduleBody.matchAll(/\.\.\/\.\.\/notes\/(day-[123]\/[^)]+\.md)/g)].map((match) => match[1]);
if (new Set(scheduleNoteLinks).size !== 24) errors.push(`Schedule map must link 24 unique notes, found ${new Set(scheduleNoteLinks).size}`);
for (const rel of scheduleNoteLinks) if (!fs.existsSync(path.join(root, 'notes', rel))) errors.push(`Schedule map missing note: ${rel}`);

function readWebpSize(file) {
  const buffer = fs.readFileSync(file);
  if (buffer.toString('ascii', 0, 4) !== 'RIFF' || buffer.toString('ascii', 8, 12) !== 'WEBP') return null;
  const chunk = buffer.toString('ascii', 12, 16);
  if (chunk === 'VP8X') return { width: 1 + buffer.readUIntLE(24, 3), height: 1 + buffer.readUIntLE(27, 3) };
  if (chunk === 'VP8 ') return { width: buffer.readUInt16LE(26) & 0x3fff, height: buffer.readUInt16LE(28) & 0x3fff };
  if (chunk === 'VP8L') {
    const bits = buffer.readUInt32LE(21);
    return { width: 1 + (bits & 0x3fff), height: 1 + ((bits >> 14) & 0x3fff) };
  }
  return null;
}

const conceptDir = path.join(root, 'content', 'assets', 'concepts');
const conceptFiles = fs.existsSync(conceptDir) ? fs.readdirSync(conceptDir).filter((file) => file.endsWith('.webp')) : [];
if (conceptFiles.length !== 8) errors.push(`Expected 8 concept illustrations, found ${conceptFiles.length}`);
for (const file of conceptFiles) {
  const full = path.join(conceptDir, file);
  const size = fs.statSync(full).size;
  const dimensions = readWebpSize(full);
  if (!dimensions || dimensions.width < 1536 || dimensions.height < 1024) errors.push(`${file}: must be at least 1536x1024`);
  if (size > 1.5 * 1024 * 1024) errors.push(`${file}: exceeds 1.5 MB`);
}

const htmlFiles = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith('.html')) htmlFiles.push(full);
  }
}
walk(path.join(root, 'site'));
if (htmlFiles.length !== 16) errors.push(`Expected 16 HTML files including index, found ${htmlFiles.length}`);

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8');
  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const href = match[1];
    if (/^(https?:|#|mailto:|data:)/.test(href)) continue;
    const target = path.resolve(path.dirname(file), href.split('#')[0]);
    if (!fs.existsSync(target)) errors.push(`${path.relative(root, file)}: broken local asset ${href}`);
  }
  for (const match of html.matchAll(/<img[^>]+src="[^"]*concepts[^"]+"[^>]*>/g)) {
    for (const attr of ['width="1536"', 'height="1024"', 'loading="lazy"', 'decoding="async"', 'alt="']) {
      if (!match[0].includes(attr)) errors.push(`${path.relative(root, file)}: concept image missing ${attr}`);
    }
  }
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

const imageBytes = conceptFiles.reduce((sum, file) => sum + fs.statSync(path.join(conceptDir, file)).size, 0);
console.log(`Verified ${tutorialFiles.length} tutorials (${totalMinutes} min), ${glossaryRows} glossary terms, ${sessionNotes.length} session notes, ${conceptFiles.length} illustrations (${(imageBytes / 1024 / 1024).toFixed(2)} MB), ${htmlFiles.length} HTML files, and local links.`);
