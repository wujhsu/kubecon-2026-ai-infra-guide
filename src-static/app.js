(function () {
  const root = document.body.dataset.root || '';
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
  const glossary = window.GUIDE_GLOSSARY || [];

  const escapeHtml = (value = '') => String(value)
    .replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;').replaceAll("'", '&#039;');

  function openDialog(name) {
    const dialog = $(`[data-dialog="${name}"]`);
    if (dialog && !dialog.open) dialog.showModal();
    if (name === 'search') setTimeout(() => $('[data-search-input]')?.focus(), 0);
    if (name === 'glossary') setTimeout(() => $('[data-glossary-input]')?.focus(), 0);
  }

  function renderGlossary(query = '', selected = '') {
    const target = $('[data-glossary-list]');
    if (!target) return;
    const normalized = query.trim().toLowerCase();
    const items = glossary.filter((item) => !normalized || Object.values(item).join(' ').toLowerCase().includes(normalized));
    target.innerHTML = items.length ? items.map((item) => `<div class="${item.term === selected ? 'is-selected' : ''}" data-glossary-term="${escapeHtml(item.term)}"><dt>${escapeHtml(item.term)}${item.full ? `<small>${escapeHtml(item.full)}</small>` : ''}</dt><dd>${escapeHtml(item.definition)}${item.confused ? `<small>易混：${escapeHtml(item.confused)}</small>` : ''}</dd></div>`).join('') : '<p class="empty-hint">没有匹配术语。</p>';
    if (selected) target.querySelector('.is-selected')?.scrollIntoView({ block: 'center' });
  }

  $('[data-action="search"]')?.addEventListener('click', () => openDialog('search'));
  $('[data-action="glossary"]')?.addEventListener('click', () => { renderGlossary(); openDialog('glossary'); });
  $('[data-glossary-input]')?.addEventListener('input', (event) => renderGlossary(event.target.value));
  renderGlossary();

  function highlight(value, query) {
    const safe = escapeHtml(value);
    const terms = query.trim().split(/\s+/).filter(Boolean).map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    return terms.length ? safe.replace(new RegExp(`(${terms.join('|')})`, 'gi'), '<mark>$1</mark>') : safe;
  }

  const searchInput = $('[data-search-input]');
  searchInput?.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();
    const target = $('[data-search-results]');
    if (!query) { target.innerHTML = '<p class="empty-hint">输入术语、项目或论坛主题。</p>'; return; }
    const terms = query.split(/\s+/);
    const results = (window.GUIDE_INDEX || []).filter((item) => terms.every((term) => `${item.title} ${item.summary} ${item.track} ${item.text}`.toLowerCase().includes(term))).slice(0, 8);
    target.innerHTML = results.length ? results.map((item) => {
      const at = Math.max(0, item.text.toLowerCase().indexOf(terms[0]));
      const snippet = item.text.slice(Math.max(0, at - 45), at + 120);
      return `<a href="${root}${item.path}"><strong>${highlight(item.shortTitle || item.title, query)}</strong><span>...${highlight(snippet, query)}...</span></a>`;
    }).join('') : '<p class="empty-hint">没有直接结果。试试更短的词，例如“缓存”“调度”或“GPU”。</p>';
  });

  const menu = $('.mobile-menu');
  const navBackdrop = $('.nav-backdrop');
  function closeNav(restoreFocus = false) {
    document.body.classList.remove('nav-open');
    menu?.setAttribute('aria-expanded', 'false');
    if (navBackdrop) navBackdrop.hidden = true;
    if (restoreFocus) menu?.focus();
  }
  menu?.addEventListener('click', () => {
    const open = !document.body.classList.contains('nav-open');
    if (!open) { closeNav(); return; }
    document.body.classList.add('nav-open');
    menu.setAttribute('aria-expanded', 'true');
    if (navBackdrop) navBackdrop.hidden = false;
    setTimeout(() => $('.nav-close')?.focus(), 220);
  });
  $('.nav-close')?.addEventListener('click', () => closeNav(true));
  navBackdrop?.addEventListener('click', () => closeNav(true));

  document.addEventListener('keydown', (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); openDialog('search'); }
    if (event.key === 'Escape' && document.body.classList.contains('nav-open')) closeNav(true);
    if (event.key === 'Tab' && document.body.classList.contains('nav-open')) {
      const focusable = $$('a[href], button:not([disabled])', $('.course-nav')).filter((element) => element.offsetParent !== null);
      const first = focusable[0]; const last = focusable.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    }
  });

  function decodeMermaid(source) {
    const bytes = Uint8Array.from(atob(source), (char) => char.charCodeAt(0));
    return new TextDecoder().decode(bytes);
  }

  async function renderMermaid() {
    if (!window.mermaid) return;
    const nodes = $$('.mermaid');
    for (const node of nodes) {
      if (node.dataset.mermaidSource) node.textContent = decodeMermaid(node.dataset.mermaidSource);
      node.removeAttribute('data-processed');
    }
    window.mermaid.initialize({ startOnLoad: false, securityLevel: 'loose', theme: document.documentElement.classList.contains('dark') ? 'dark' : 'neutral', fontFamily: 'system-ui, sans-serif' });
    if (nodes.length) await window.mermaid.run({ nodes });
  }

  $('[data-action="theme"]')?.addEventListener('click', async () => {
    document.documentElement.classList.toggle('dark');
    try { localStorage.setItem('guide-theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light'); } catch {}
    await renderMermaid();
  });
  void renderMermaid();

  function annotateTerms() {
    if (document.body.dataset.page?.endsWith('glossary.html')) return;
    const prose = $('.prose');
    if (!prose || !glossary.length) return;
    const nodes = [];
    const walker = document.createTreeWalker(prose, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (!node.nodeValue.trim() || node.parentElement?.closest('a, button, code, pre, script, style, .mermaid')) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      },
    });
    while (walker.nextNode()) nodes.push(walker.currentNode);
    for (const item of [...glossary].sort((a, b) => b.term.length - a.term.length)) {
      if (item.term.length < 2) continue;
      const node = nodes.find((candidate) => candidate.isConnected && candidate.nodeValue.includes(item.term));
      if (!node) continue;
      const at = node.nodeValue.indexOf(item.term);
      const button = document.createElement('button');
      button.type = 'button'; button.className = 'term'; button.textContent = item.term;
      button.setAttribute('aria-label', `${item.term}：${item.definition}`);
      button.addEventListener('click', () => { renderGlossary('', item.term); openDialog('glossary'); });
      const after = node.splitText(at); after.splitText(item.term.length); after.replaceWith(button);
    }
  }
  annotateTerms();

  const progress = $('.reading-progress i');
  const backToTop = $('.back-to-top');
  function updateScrollUi() {
    const max = document.documentElement.scrollHeight - innerHeight;
    if (progress) progress.style.transform = `scaleX(${max > 0 ? Math.min(1, scrollY / max) : 0})`;
    if (backToTop) backToTop.classList.toggle('is-visible', scrollY > innerHeight * 0.8);
  }
  addEventListener('scroll', updateScrollUi, { passive: true });
  updateScrollUi();
  backToTop?.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));

  const kv = $('[data-kv-calculator]');
  if (kv) {
    const update = () => {
      const get = (name) => Math.max(0, Number($(`[name="${name}"]`, kv).value) || 0);
      const bytes = get('layers') * 2 * get('heads') * get('headDim') * get('tokens') * get('batch') * get('bytes');
      $('[data-kv-result]', kv).textContent = `${(bytes / 1024 ** 3).toFixed(2)} GiB`;
    };
    $$('input, select', kv).forEach((element) => element.addEventListener('input', update)); update();
  }

  const latency = $('[data-latency-demo]');
  if (latency) {
    const update = () => {
      const prefill = Number($('[name="prefill"]', latency).value);
      const decode = Number($('[name="decode"]', latency).value);
      const output = Number($('[name="output"]', latency).value);
      $('[data-prefill-value]', latency).textContent = `${prefill} ms`;
      $('[data-decode-value]', latency).textContent = `${decode} ms`;
      $('[data-output-value]', latency).textContent = `${output}`;
      $('[data-ttft]', latency).textContent = `${prefill} ms`;
      $('[data-total]', latency).textContent = `${((prefill + Math.max(0, output - 1) * decode) / 1000).toFixed(3)}s`;
      $('.timeline-prefill', latency).style.flexGrow = Math.max(1, prefill);
      $('.timeline-decode', latency).style.flexGrow = Math.max(1, Math.max(0, output - 1) * decode);
    };
    $$('input', latency).forEach((element) => element.addEventListener('input', update)); update();
  }
})();
