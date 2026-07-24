const tabs = document.querySelectorAll('.legal-tab');
const panels = document.querySelectorAll('.legal-panel');
const search = document.querySelector('#law-search');
const clearSearch = document.querySelector('#clear-search');
const result = document.querySelector('#search-result');
const menuButton = document.querySelector('.legal-menu-button');
const navigation = document.querySelector('.legal-navigation');

document.querySelector('#year').textContent = new Date().getFullYear();

function activateTab(name) {
  tabs.forEach((tab) => {
    const active = tab.dataset.tab === name;
    tab.classList.toggle('active', active);
    tab.setAttribute('aria-selected', String(active));
  });
  panels.forEach((panel) => panel.classList.toggle('active', panel.dataset.panel === name));
  const url = new URL(window.location.href);
  url.searchParams.set('tab', name);
  history.replaceState(null, '', url);
  window.scrollTo({ top: document.querySelector('.legal-shell').offsetTop - 80, behavior: 'smooth' });
}

tabs.forEach((tab) => tab.addEventListener('click', () => activateTab(tab.dataset.tab)));
const requestedTab = new URLSearchParams(location.search).get('tab');
if (requestedTab && document.querySelector(`[data-panel="${requestedTab}"]`)) activateTab(requestedTab);

function normalize(value) {
  return value.toLocaleLowerCase('bg-BG').trim();
}

function filterArticles() {
  const term = normalize(search.value);
  let visible = 0;
  document.querySelectorAll('.law-chapter').forEach((chapter) => {
    let chapterMatches = 0;
    chapter.querySelectorAll('.law-article').forEach((article) => {
      const matches = !term || normalize(article.dataset.search).includes(term);
      article.hidden = !matches;
      if (matches) { visible += 1; chapterMatches += 1; }
    });
    chapter.hidden = chapterMatches === 0;
    if (term && chapterMatches) chapter.open = true;
  });
  result.textContent = term
    ? `Намерени са ${visible} члена за „${search.value.trim()}“.`
    : `Показани са всички ${document.querySelectorAll('.law-article').length} члена.`;
}

search.addEventListener('input', filterArticles);
clearSearch.addEventListener('click', () => { search.value = ''; filterArticles(); search.focus(); });

document.querySelectorAll('.article-link').forEach((button) => {
  button.addEventListener('click', async () => {
    const url = new URL(location.href);
    url.search = '';
    url.hash = button.dataset.link;
    try {
      await navigator.clipboard.writeText(url.toString());
      const old = button.textContent;
      button.textContent = '✓';
      setTimeout(() => button.textContent = old, 1200);
    } catch {
      location.hash = button.dataset.link;
    }
  });
});

document.querySelector('.print-law').addEventListener('click', () => window.print());

menuButton.addEventListener('click', () => {
  const open = navigation.classList.toggle('open');
  document.body.classList.toggle('menu-open', open);
  menuButton.setAttribute('aria-expanded', String(open));
});
navigation.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  navigation.classList.remove('open');
  document.body.classList.remove('menu-open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

if (location.hash.startsWith('#art-')) {
  const article = document.querySelector(location.hash);
  if (article) article.closest('details').open = true;
}
