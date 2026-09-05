import fs from 'node:fs';
import path from 'node:path';

/* oxlint-disable typescript/restrict-template-expressions */

const root = process.cwd();
const checkedAt = '2026-09-05';
const failures = [];
const warnings = [];
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchWithRetry(url, options = {}) {
  let lastError;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const response = await fetch(url, {
        redirect: 'follow',
        signal: AbortSignal.timeout(15_000),
        headers: { 'User-Agent': 'kubecon-ai-infra-guide-verifier/1.0', ...options.headers },
      });
      if ((response.status === 429 || response.status >= 500) && attempt < 3) {
        await response.body?.cancel();
        await sleep(600 * attempt);
        continue;
      }
      return response;
    } catch (error) {
      lastError = error;
      if (attempt < 3) await sleep(600 * attempt);
    }
  }
  warnings.push(`网络失败：${url} (${lastError?.message || 'unknown'})`);
  return null;
}

const versionChecks = [
  ['Kubernetes', 'v1.37.0', 'https://dl.k8s.io/release/stable.txt', async (response) => (await response.text()).trim()],
  ['PyTorch', 'v2.14.0', 'https://api.github.com/repos/pytorch/pytorch/releases/latest', async (response) => (await response.json()).tag_name],
  ['vLLM', 'v0.28.0', 'https://api.github.com/repos/vllm-project/vllm/releases/latest', async (response) => (await response.json()).tag_name],
  ['SGLang', 'v0.5.19', 'https://api.github.com/repos/sgl-project/sglang/releases/latest', async (response) => (await response.json()).tag_name],
  ['Kueue', 'v0.19.3', 'https://api.github.com/repos/kubernetes-sigs/kueue/releases/latest', async (response) => (await response.json()).tag_name],
  ['LeaderWorkerSet', 'v0.10.0', 'https://api.github.com/repos/kubernetes-sigs/lws/releases/latest', async (response) => (await response.json()).tag_name],
  ['Volcano', 'v1.15.2', 'https://api.github.com/repos/volcano-sh/volcano/releases/latest', async (response) => (await response.json()).tag_name],
  ['Karmada', 'v1.19.0', 'https://api.github.com/repos/karmada-io/karmada/releases/latest', async (response) => (await response.json()).tag_name],
  ['Kata Containers', '4.1.0', 'https://api.github.com/repos/kata-containers/kata-containers/releases/latest', async (response) => (await response.json()).tag_name.replace(/^v/, '')],
  ['OpenTelemetry Semantic Conventions', 'v1.44.0', 'https://api.github.com/repos/open-telemetry/semantic-conventions/releases/latest', async (response) => (await response.json()).tag_name],
];

for (const [name, expected, url, extract] of versionChecks) {
  const response = await fetchWithRetry(url, { headers: { Accept: 'application/vnd.github+json' } });
  if (!response) continue;
  if (response.status === 403 || response.status === 429) {
    warnings.push(`限流：${name} (${response.status})`);
    await response.body?.cancel();
    continue;
  }
  if (!response.ok) {
    failures.push(`${name} 版本端点返回 HTTP ${response.status}`);
    await response.body?.cancel();
    continue;
  }
  const actual = await extract(response);
  if (actual !== expected) failures.push(`${name} 稳定版已变化：冻结值 ${expected}，当前 ${actual}`);
  else console.log(`版本 OK  ${name}: ${actual}`);
}

const expectedSessions = [
  ['1312719', '2026-09-07T14:00:00', '2026-09-07T16:00:00', 'Pearl Hall', null],
  ['1225136', '2026-09-08T11:00:00', '2026-09-08T11:30:00', 'Mandarin Hall I', 'Chinese'],
  ['1225364', '2026-09-08T11:45:00', '2026-09-08T12:15:00', 'Mandarin Hall I', 'English'],
  ['1222146', '2026-09-08T13:45:00', '2026-09-08T14:15:00', '5B + C', 'Chinese'],
  ['1221808', '2026-09-08T14:30:00', '2026-09-08T15:00:00', 'Grand Ballroom II + III', 'English'],
  ['1209151', '2026-09-08T15:30:00', '2026-09-08T16:00:00', 'Grand Ballroom II + III', 'English'],
  ['1219807', '2026-09-08T16:15:00', '2026-09-08T16:45:00', '5B + C', 'Chinese'],
  ['1224575', '2026-09-08T17:00:00', '2026-09-08T17:30:00', 'Grand Ballroom II + III', 'Chinese'],
  ['1224671', '2026-09-09T11:00:00', '2026-09-09T11:30:00', 'Mandarin Hall I', 'Chinese'],
  ['1223450', '2026-09-09T11:45:00', '2026-09-09T12:15:00', 'Mandarin Hall I', 'English'],
  ['1223545', '2026-09-09T13:45:00', '2026-09-09T14:15:00', 'Grand Ballroom II + III', 'Chinese'],
  ['1223860', '2026-09-09T14:30:00', '2026-09-09T15:00:00', 'Mandarin Hall II', 'Chinese'],
  ['1222763', '2026-09-09T15:30:00', '2026-09-09T16:00:00', 'Mandarin Hall I', 'Chinese'],
  ['1220647', '2026-09-09T16:15:00', '2026-09-09T16:45:00', 'Mandarin Hall II', 'Chinese'],
  ['1224567', '2026-09-08T13:45:00', '2026-09-08T15:00:00', 'Pearl Hall', 'English'],
  ['1224503', '2026-09-08T13:45:00', '2026-09-08T14:15:00', 'Grand Ballroom II + III', 'English'],
  ['1177779', '2026-09-08T13:45:00', '2026-09-08T14:15:00', 'Mandarin Hall I', 'English'],
  ['1224844', '2026-09-09T11:00:00', '2026-09-09T11:30:00', 'Mandarin Hall II', 'Chinese'],
  ['1222557', '2026-09-09T14:30:00', '2026-09-09T15:00:00', 'Mandarin Hall I', 'Chinese'],
  ['1220661', '2026-09-09T14:30:00', '2026-09-09T15:00:00', 'Pearl Hall', 'English'],
  ['1222331', '2026-09-09T15:30:00', '2026-09-09T16:00:00', 'Pearl Hall', 'English'],
  ['1223308', '2026-09-09T16:15:00', '2026-09-09T16:45:00', 'Pearl Hall', 'Chinese'],
  ['1222060', '2026-09-09T16:15:00', '2026-09-09T16:45:00', '5B + C', 'Chinese'],
  ['1218010', '2026-09-09T16:15:00', '2026-09-09T16:45:00', 'Grand Ballroom II + III', 'Chinese'],
];

const scheduleUrl = 'https://kubecon-cloudnativecon-openinfra-pytorch-2026.sessionize.com/api/schedule';
const scheduleResponse = await fetchWithRetry(scheduleUrl);
if (scheduleResponse?.ok) {
  const schedule = await scheduleResponse.json();
  const rooms = new Map(schedule.rooms.map((room) => [String(room.id), room.name]));
  const languageItems = new Map(schedule.categories.find((category) => category.title === 'Language')?.items.map((item) => [item.id, item.name]) || []);
  for (const [id, startsAt, endsAt, room, language] of expectedSessions) {
    const session = schedule.sessions.find((item) => String(item.id) === id);
    if (!session) { failures.push(`Sessionize 场次已不存在：${id}`); continue; }
    const actualLanguage = session.categoryItems.map((item) => languageItems.get(item)).find(Boolean) || null;
    const actual = [session.startsAt, session.endsAt, rooms.get(String(session.roomId)), actualLanguage];
    const expected = [startsAt, endsAt, room, language];
    if (JSON.stringify(actual) !== JSON.stringify(expected)) failures.push(`Sessionize 场次已变化：${id} ${session.title}`);
  }
  console.log(`议程 OK  ${expectedSessions.length} 场（冻结于 ${checkedAt}）`);
} else if (scheduleResponse) {
  if (scheduleResponse.status === 429) warnings.push('限流：Sessionize API');
  else failures.push(`Sessionize API 返回 HTTP ${scheduleResponse.status}`);
  await scheduleResponse.body?.cancel();
}

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}
const markdownFiles = [...walk(path.join(root, 'content')), ...walk(path.join(root, 'sources'))].filter((file) => file.endsWith('.md'));
const extractedUrls = markdownFiles.flatMap((file) => [...fs.readFileSync(file, 'utf8').matchAll(/https:\/\/[^\s<>"']+/g)]
  .map((match) => match[0].replace(/[),.;]+$/, '')));
const externalUrls = new Set(extractedUrls.filter((url) => !url.includes('sessionize.com/session/')));

const urls = [...externalUrls];
let checkedLinks = 0;
for (let index = 0; index < urls.length; index += 6) {
  await Promise.all(urls.slice(index, index + 6).map(async (url) => {
    const response = await fetchWithRetry(url);
    if (!response) return;
    if (response.status === 403 || response.status === 429) warnings.push(`受限，未判坏链：${url} (${response.status})`);
    else if (response.status === 404 || response.status === 410) failures.push(`外部链接失效：${url} (${response.status})`);
    else if (!response.ok) warnings.push(`外部链接状态未知：${url} (${response.status})`);
    else checkedLinks += 1;
    await response.body?.cancel();
  }));
}

console.log(`链接 OK  ${checkedLinks}/${urls.length}；Sessionize 单场链接由议程 API 覆盖`);
for (const warning of warnings) console.warn(`WARN ${warning}`);
if (failures.length) {
  for (const failure of failures) console.error(`FAIL ${failure}`);
  process.exit(1);
}
console.log(`在线核对完成：${warnings.length ? `${warnings.length} 项因限流或网络未能确认` : '无未知项'}`);
