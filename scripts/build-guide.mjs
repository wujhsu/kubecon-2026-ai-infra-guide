import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import MarkdownIt from 'markdown-it';

const ROOT = process.cwd();
const CONTENT = path.join(ROOT, 'content');
const OUTPUTS = [path.join(ROOT, 'site'), path.join(ROOT, 'public', 'guide')];
const CHECKED_AT = '2026-09-05';

const escapeHtml = (value = '') => String(value)
  .replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;').replaceAll("'", '&#039;');

const slugify = (value) => value.toLowerCase().trim()
  .replace(/[\s/：:、，,（）()]+/g, '-')
  .replace(/[^\w\u4e00-\u9fff-]/g, '')
  .replace(/^-+|-+$/g, '');

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

function makeMarkdown() {
  const toc = [];
  const md = new MarkdownIt({ html: true, linkify: true, typographer: true });
  const fence = md.renderer.rules.fence;
  md.renderer.rules.fence = (tokens, idx, options, env, self) => {
    if (tokens[idx].info.trim() === 'mermaid') {
      const source = Buffer.from(tokens[idx].content).toString('base64');
      return `<div class="diagram-wrap"><pre class="mermaid" data-mermaid-source="${source}">${escapeHtml(tokens[idx].content)}</pre></div>`;
    }
    return fence(tokens, idx, options, env, self);
  };
  md.renderer.rules.heading_open = (tokens, idx) => {
    const token = tokens[idx];
    const title = tokens[idx + 1]?.content || '';
    const id = slugify(title);
    if (Number(token.tag.slice(1)) <= 3) toc.push({ level: token.tag, title, id });
    return `<${token.tag} id="${id}">`;
  };
  return { md, toc };
}

const files = walk(CONTENT).filter((file) => file.endsWith('.md'));
const pages = files.map((file) => {
  const parsed = matter(fs.readFileSync(file, 'utf8'));
  const rel = path.relative(CONTENT, file).replace(/\.md$/, '.html');
  const outputPath = rel.replace(/^tutorials\//, 'tutorials/').replace(/^reference\//, 'reference/');
  return { ...parsed.data, body: parsed.content, sourceFile: file, outputPath };
}).sort((a, b) => Number(a.order) - Number(b.order));

const tutorials = pages.filter((page) => page.kind === 'tutorial');
const references = pages.filter((page) => page.kind === 'reference');

function extractGlossary() {
  const page = references.find((item) => item.outputPath === 'reference/glossary.html');
  if (!page) return [];
  const tokens = new MarkdownIt({ html: true }).parse(page.body, {});
  const rows = [];
  let row = null;
  for (const token of tokens) {
    if (token.type === 'tr_open') row = [];
    if (row && token.type === 'inline') row.push(token.content);
    if (token.type === 'tr_close' && row) { rows.push(row); row = null; }
  }
  return rows.slice(1).filter((cells) => cells.length >= 4).map((cells) => ({
    term: cells[0], full: cells[1], definition: cells[2], confused: cells[3],
    chapter: cells[4] || '', related: cells[5] || '',
  }));
}

const glossary = extractGlossary();

function nav(rootPrefix, currentPath = '') {
  const links = (items) => items.map((p) => `
    <a class="nav-link ${p.outputPath === currentPath ? 'is-active' : ''}" href="${rootPrefix}${p.outputPath}">
      <span class="nav-index">${String(p.kind === 'tutorial' ? Number(p.order) + 1 : p.order).padStart(2, '0')}</span><span>${escapeHtml(p.shortTitle || p.title)}</span>
    </a>`).join('');
  return `<nav class="course-nav" aria-label="课程导航">
    <button class="nav-close" type="button" aria-label="关闭目录" title="关闭目录">×</button>
    <a class="brand" href="${rootPrefix}index.html"><span class="brand-mark">AI</span><span>Infra Field Guide<small>KubeCon China 2026</small></span></a>
    <div class="nav-group"><p>学习路径</p>${links(tutorials)}</div>
    <div class="nav-group"><p>现场工具</p>${links(references)}</div>
  </nav>`;
}

function header(rootPrefix) {
  return `<header class="topbar">
    <button class="mobile-menu" type="button" aria-label="打开目录" aria-expanded="false" title="课程目录">目录</button>
    <a class="mobile-brand" href="${rootPrefix}index.html">AI Infra Field Guide</a>
    <div class="top-actions">
      <button type="button" data-action="search" aria-haspopup="dialog" title="搜索"><span aria-hidden="true">⌕</span> 搜索</button>
      <button type="button" data-action="glossary" aria-haspopup="dialog" title="术语速查">术语</button>
      <button type="button" data-action="theme" aria-label="切换深浅主题" title="切换主题">主题</button>
    </div>
  </header>`;
}

function overlays(rootPrefix) {
  return `<div class="backdrop" data-overlay-close hidden></div>
  <dialog class="search-dialog" data-dialog="search">
    <form method="dialog" class="dialog-head"><strong>搜索教程</strong><button aria-label="关闭">关闭</button></form>
    <label class="search-field"><span class="sr-only">搜索关键词</span><input type="search" placeholder="试试：KV Cache、NCCL、DRA" autocomplete="off" data-search-input></label>
    <div class="search-results" data-search-results><p class="empty-hint">输入术语、项目或论坛主题。</p></div>
  </dialog>
  <dialog class="glossary-dialog" data-dialog="glossary">
    <form method="dialog" class="dialog-head"><strong>核心术语速查</strong><button aria-label="关闭">关闭</button></form>
    <label class="search-field"><span class="sr-only">筛选术语</span><input type="search" placeholder="输入术语或中文解释" autocomplete="off" data-glossary-input></label>
    <div class="glossary-list" data-glossary-list></div>
    <a class="dialog-link" href="${rootPrefix}reference/glossary.html">打开完整术语表</a>
  </dialog>`;
}

function layout({ title, description, rootPrefix, currentPath, content, toc = '', bodyClass = '' }) {
  return `<!doctype html>
<html lang="zh-CN"><head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="description" content="${escapeHtml(description)}"><meta name="color-scheme" content="light dark">
  <title>${escapeHtml(title)} · AI Infra Field Guide</title>
  <link rel="icon" href="${rootPrefix}assets/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="${rootPrefix}assets/styles.css">
  <script>try{if(localStorage.getItem('guide-theme')==='dark')document.documentElement.classList.add('dark')}catch(e){}</script>
</head><body data-root="${rootPrefix}" data-page="${currentPath}" class="${bodyClass}">
  <div class="reading-progress" aria-hidden="true"><i></i></div>
  <a class="skip-link" href="#main">跳到正文</a>
  <div class="app-shell">${nav(rootPrefix, currentPath)}<div class="main-shell">${header(rootPrefix)}${content}</div>${toc}</div>
  <button class="nav-backdrop" type="button" aria-label="关闭目录" hidden></button>
  <button class="back-to-top" type="button" aria-label="返回顶部" title="返回顶部">↑</button>
  ${overlays(rootPrefix)}
  <script src="${rootPrefix}assets/search-index.js"></script>
  <script src="${rootPrefix}assets/glossary-index.js"></script>
  <script src="${rootPrefix}assets/mermaid.min.js"></script>
  <script src="${rootPrefix}assets/app.js"></script>
</body></html>`;
}

function pageHtml(page) {
  const rootPrefix = '../';
  const { md, toc } = makeMarkdown();
  const html = md.render(page.body);
  const renderedBody = html
    .replaceAll('href="../../notes/', 'href="../notes/')
    .replaceAll('href="https://kubecon-cloudnativecon-openinfra-pytorch-2026.sessionize.com/', 'class="external-session" data-online="true" href="https://kubecon-cloudnativecon-openinfra-pytorch-2026.sessionize.com/');
  const tocLinks = toc.filter(x => x.level !== 'h1').map(x => `<a href="#${x.id}" class="toc-${x.level}">${escapeHtml(x.title)}</a>`).join('');
  const tocHtml = `<aside class="page-toc" aria-label="页内目录"><p>本页内容</p>${tocLinks}<div class="freshness"><span>资料核对</span><strong>${escapeHtml(page.updated || CHECKED_AT)}</strong><small>${escapeHtml(page.version || '持续更新')}</small></div></aside>`;
  const prev = pages.filter(p => p.kind === page.kind && Number(p.order) < Number(page.order)).at(-1);
  const next = pages.find(p => p.kind === page.kind && Number(p.order) > Number(page.order));
  const sessions = Array.isArray(page.sessions) ? page.sessions : [];
  const article = `<main id="main" class="article-wrap">
    <article class="article">
      <header class="article-head"><div class="eyebrow">${escapeHtml(page.track)} · ${escapeHtml(page.minutes)} 分钟</div><h1>${escapeHtml(page.title)}</h1><p>${escapeHtml(page.summary)}</p><div class="meta"><span>${escapeHtml(page.level)}</span><span>更新于 ${escapeHtml(page.updated || CHECKED_AT)}</span><span>${sessions.length} 个关联场次</span></div></header>
      <details class="mobile-toc"><summary>本页目录</summary><nav aria-label="移动端页内目录">${tocLinks}</nav></details>
      <div class="prose">${renderedBody}</div>
      <nav class="article-pager" aria-label="上下篇">${prev ? `<a href="${path.basename(prev.outputPath)}"><small>上一篇</small>${escapeHtml(prev.shortTitle || prev.title)}</a>` : '<span></span>'}${next ? `<a class="next" href="${path.basename(next.outputPath)}"><small>下一篇</small>${escapeHtml(next.shortTitle || next.title)}</a>` : ''}</nav>
    </article>
  </main>`;
  return layout({ title: page.title, description: page.summary, rootPrefix, currentPath: page.outputPath, content: article, toc: tocHtml });
}

function homeHtml() {
  const minutes = tutorials.reduce((sum, p) => sum + Number(p.minutes || 0), 0);
  const cards = tutorials.map((p) => `<a class="course-row" href="${p.outputPath}"><span class="course-number">${String(Number(p.order) + 1).padStart(2, '0')}</span><span class="course-copy"><strong>${escapeHtml(p.shortTitle || p.title)}</strong><small>${escapeHtml(p.summary)}</small></span><span class="course-meta">${escapeHtml(p.minutes)} 分钟<br>${escapeHtml(p.level)}</span></a>`).join('');
  const content = `<main id="main" class="home-wrap">
    <section class="home-intro"><div><p class="eyebrow">2026.09.07–09 · 上海</p><h1>把论坛术语连成<br>一套 AI Infra 知识地图</h1><p class="lead">从一条请求如何抵达 GPU 开始，依次理解 PyTorch、分布式训练、推理、调度、Agent、安全与可观测性。</p></div>
      <div class="route-map" aria-label="学习路径"><span>请求</span><i></i><span>运行时</span><i></i><span>调度</span><i></i><span>GPU</span><i></i><span>指标</span></div>
    </section>
    <section class="status-strip" aria-label="课程概况"><div><strong>${tutorials.length}</strong><span>篇递进教程</span></div><div><strong>${Math.round(minutes / 60)}h</strong><span>预计预习时间</span></div><div><strong>离线</strong><span>无需会场网络</span></div><div><strong>${CHECKED_AT}</strong><span>资料核对日期</span></div></section>
    <section class="start-panel"><div><p class="eyebrow">从这里开始</p><h2>先建立全链路，再逐层下钻</h2><p>不要急着背项目名。先能回答“这个组件解决哪一层的问题”，论坛上的内容就会自动归位。</p></div><a class="primary-link" href="tutorials/00-learning-map.html">开始第 1 篇 <span aria-hidden="true">→</span></a></section>
    <section class="curriculum"><div class="section-head"><div><p class="eyebrow">8–12 小时学习路径</p><h2>十二个知识台阶</h2></div><a href="reference/schedule-map.html">查看议程映射</a></div><div class="course-list">${cards}</div></section>
    <section class="offline-note"><strong>现场笔记已经准备好</strong><p>按日期和推荐场次组织在 <code>notes/</code>，可直接用 Obsidian、Typora 或任意文本编辑器填写。</p><a href="reference/field-cheatsheet.html">打开会场速查页</a></section>
  </main>`;
  return layout({ title: '首页', description: 'KubeCon China 2026 AI Infra 初学者预习站', rootPrefix: '', currentPath: '', content, bodyClass: 'home-page' });
}

for (const output of OUTPUTS) {
  fs.rmSync(output, { recursive: true, force: true });
  fs.mkdirSync(path.join(output, 'assets'), { recursive: true });
  fs.mkdirSync(path.join(output, 'tutorials'), { recursive: true });
  fs.mkdirSync(path.join(output, 'reference'), { recursive: true });
  fs.mkdirSync(path.join(output, 'notes'), { recursive: true });
  fs.copyFileSync(path.join(ROOT, 'src-static', 'styles.css'), path.join(output, 'assets', 'styles.css'));
  fs.copyFileSync(path.join(ROOT, 'src-static', 'app.js'), path.join(output, 'assets', 'app.js'));
  fs.copyFileSync(path.join(ROOT, 'src-static', 'favicon.svg'), path.join(output, 'assets', 'favicon.svg'));
  fs.copyFileSync(path.join(ROOT, 'node_modules', 'mermaid', 'dist', 'mermaid.min.js'), path.join(output, 'assets', 'mermaid.min.js'));
  const concepts = path.join(CONTENT, 'assets', 'concepts');
  if (fs.existsSync(concepts)) fs.cpSync(concepts, path.join(output, 'assets', 'concepts'), { recursive: true });
  fs.cpSync(path.join(ROOT, 'notes'), path.join(output, 'notes'), { recursive: true });
  const searchIndex = pages.map(p => ({ title: p.title, shortTitle: p.shortTitle, summary: p.summary, track: p.track, path: p.outputPath, text: p.body.replace(/[`#>*_[\]()|-]/g, ' ').replace(/\s+/g, ' ').slice(0, 5000) }));
  fs.writeFileSync(path.join(output, 'assets', 'search-index.js'), `window.GUIDE_INDEX=${JSON.stringify(searchIndex)};\n`);
  fs.writeFileSync(path.join(output, 'assets', 'glossary-index.js'), `window.GUIDE_GLOSSARY=${JSON.stringify(glossary)};\n`);
  fs.writeFileSync(path.join(output, 'index.html'), homeHtml());
  for (const page of pages) fs.writeFileSync(path.join(output, page.outputPath), pageHtml(page));
}

console.log(`Built ${pages.length} pages into site/ and public/guide/`);
