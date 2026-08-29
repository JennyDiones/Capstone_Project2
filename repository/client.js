const theses = [
  { title: 'Research Map of Undergraduate Theses of College of Nursing', authors: 'Nikka Marie L. Diaz, Antonette Switzel B. Pascual', year: 2015, pop: 91 },
  { title: 'Menopausal Awareness of West Campus Personnel and Effectiveness of EIC Materials', authors: 'Nikka Marie L. Diaz, Antonette Switzel B. Pascual', year: 2022, pop: 84 },
  {
    title: 'Effects of Scheduling of Medical-Surgical Nursing on the Learning Dynamics of Nursing Students in West and East Campus',
    authors: 'Clarisse C. Banua, Onidranreb R. Bernardino, Rojhen D. Cleope',
    year: 2024,
    pop: 89,
    researchers: [
      ['Clarisse C. Banua', 'Bachelor of Science in Nursing Student'],
      ['Onidranreb R. Bernardino', 'Bachelor of Science in Nursing Student'],
      ['Rojhen D. Cleope', 'Bachelor of Science in Nursing Student']
    ]
  },
  { title: 'Physiological Impact of Progressive Stair Running on Lower-Limb Muscle Activation and Aerobic Capacity', authors: 'Ronald Dela Rosa, Sarah Duterte', year: 2026, pop: 78 }
];

let sort = 'popular';
let activeContact = null;
const collapsedTheses = new Set();
const expandedRecommended = new Set();
const saved = new Set([1, 3]);

function researchAbstractCard(t, recommended = false) {
  const collapsed = recommended ? !expandedRecommended.has(t.i) : collapsedTheses.has(t.i);
  return `<article class="thesis-card client-expanded ${collapsed ? 'is-collapsed' : ''}">
    <div class="expanded-title"><span>▤</span><b>${t.title}</b><button class="bookmark-btn ${saved.has(t.i) ? 'active' : ''}" data-bookmark="${t.i}" aria-label="Bookmark">${saved.has(t.i) ? '▮' : '▱'}</button></div>
    <div class="collapsible-research">
    <div class="client-abstract">
      <h3>Abstract</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Blanditiis excepturi iure excepturi aspernatur est anim dolores occaecat odit et praesentium atque. Duis aspernatur minim explicabo tempor quasi quae mollitia consectetur. Porro proident culpa elit inventore illo. Anim enim voluptatum quas provident in.</p>
      <p>Id ex neque ullamco quaerat quaerat eiusmod dignissimos ipsum animi dolorem est non ea nisi. Sequi vitae neque pariatur fugit deserunt ea sit anim cupiditate corrupti vitae. Aliqua non vero blanditiis et praesentium in nulla nostrud tempora. Quasi ratione ipsam praesentium ad minim ullamco tempor cillum consectetur qui ducimus magna ex nulla. Irure cupidatat incididunt eius voluptatum ab veniam.</p>
    </div>
    <footer class="research-actions">
      <button type="button" class="open-contact" data-thesis="${t.i}">☎ <span>Contact<br>Authors</span></button>
      <button type="button" class="view-research">▣ <span>See whole<br>research</span></button>
      <button type="button" class="download-research">⇩ <span>Download</span></button>
    </footer>
    </div>
    <button type="button" class="thesis-toggle" data-toggle-thesis="${t.i}" data-toggle-mode="${recommended ? 'recommended' : 'search'}" aria-label="${collapsed ? 'Expand' : 'Collapse'} research details" aria-expanded="${!collapsed}">${collapsed ? '⌄' : '⌃'}</button>
  </article>`;
}

function researchContactCard(t) {
  const researchers = (t.researchers || t.authors.split(',').map(name => [name.trim(), 'Registered Researcher']))
    .map(([name, course]) => `<div class="registered-researcher"><div><b>${name}</b><small>${course}</small></div><span>Active</span><button type="button" class="contact-researcher" data-researcher="${name}">Contact</button></div>`)
    .join('');

  return `<article class="contact-research-card">
    <header>
      <div class="contact-heading"><span aria-hidden="true">♙</span><h2>Contact Authors</h2></div>
      <button class="bookmark-btn ${saved.has(t.i) ? 'active' : ''}" data-bookmark="${t.i}" aria-label="Bookmark research">${saved.has(t.i) ? '▮' : '▱'}</button>
    </header>
    <h3>${t.title}</h3>
    <p class="contact-meta">Authors: ${t.authors} (${t.year})</p>
    <h4>Registered Researchers:</h4>
    <div class="registered-list">${researchers}</div>
    <footer>
      <button type="button" class="contact-all">☎ <span>Contact<br>Authors</span></button>
      <button type="button" class="view-research">▣ <span>See whole<br>research</span></button>
      <button type="button" class="download-research">⇩ <span>Download</span></button>
    </footer>
  </article>`;
}

function render() {
  const input = document.querySelector('#clientSearch');
  const q = input.value.toLowerCase().replace(/\s+/g, '-');
  const rows = theses.map((t, i) => ({ ...t, i })).filter(t => t.title.toLowerCase().includes(q));
  rows.sort((a, b) => sort === 'az' ? a.title.localeCompare(b.title) : sort === 'oldest' ? a.year - b.year : sort === 'newest' ? b.year - a.year : b.pop - a.pop);

  document.querySelector('#clientTheses').innerHTML = rows.map(t => q
    ? (activeContact === t.i ? researchContactCard(t) : researchAbstractCard(t))
    : researchAbstractCard(t, true)
  ).join('');
  document.querySelector('#clientResultTitle').textContent = q ? `Results for “${input.value}”` : 'Recommended for You';
  renderBookmarks();
}

function renderBookmarks() {
  document.querySelector('#bookmarkList').innerHTML = [...saved].map(i => researchAbstractCard({ ...theses[i], i }, true)).join('');
}

function showView(name) {
  document.querySelectorAll('.client-view').forEach(v => v.classList.remove('active'));
  (document.querySelector(`#${name}View`) || document.querySelector('#homeView')).classList.add('active');
  document.querySelector('#clientDrawer').classList.remove('open');
  document.querySelector('#clientShade').classList.remove('open');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.addEventListener('click', e => {
  const nav = e.target.closest('[data-view]');
  if (nav) showView(nav.dataset.view);
  const mark = e.target.closest('[data-bookmark]');
  if (mark) {
    const i = +mark.dataset.bookmark;
    saved.has(i) ? saved.delete(i) : saved.add(i);
    render();
    return;
  }
  const researcher = e.target.closest('.contact-researcher');
  if (researcher) alert(`Opening contact options for ${researcher.dataset.researcher}.`);
  const toggle = e.target.closest('[data-toggle-thesis]');
  if (toggle) {
    const i = +toggle.dataset.toggleThesis;
    if (toggle.dataset.toggleMode === 'recommended') {
      expandedRecommended.has(i) ? expandedRecommended.delete(i) : expandedRecommended.add(i);
    } else {
      collapsedTheses.has(i) ? collapsedTheses.delete(i) : collapsedTheses.add(i);
    }
    render();
    return;
  }
  const openContact = e.target.closest('.open-contact');
  if (openContact) {
    activeContact = +openContact.dataset.thesis;
    render();
    document.querySelector('.contact-research-card')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  if (e.target.closest('.contact-all')) alert('Opening contact options for all available authors.');
  if (e.target.closest('.view-research')) alert('Opening the complete research manuscript.');
  if (e.target.closest('.download-research')) alert('The research download will start when a PDF is connected.');
});

document.querySelector('#clientSearch').addEventListener('input', () => { activeContact = null; render(); });
document.querySelector('#clientSort').onclick = () => document.querySelector('#sortModal').classList.add('open');
document.querySelectorAll('.close-modal').forEach(b => b.onclick = () => document.querySelector('#sortModal').classList.remove('open'));
document.querySelectorAll('.sort-box>[data-sort]').forEach(b => b.onclick = () => {
  sort = b.dataset.sort;
  document.querySelectorAll('.sort-box>[data-sort]').forEach(x => x.classList.toggle('selected', x === b));
  render();
  document.querySelector('#sortModal').classList.remove('open');
});
document.querySelector('#clientMenu').onclick = () => {
  document.querySelector('#clientDrawer').classList.add('open');
  document.querySelector('#clientShade').classList.add('open');
};
document.querySelector('#closeDrawer').onclick = document.querySelector('#clientShade').onclick = () => {
  document.querySelector('#clientDrawer').classList.remove('open');
  document.querySelector('#clientShade').classList.remove('open');
};
document.querySelector('#profileForm').onsubmit = e => { e.preventDefault(); alert('Profile saved successfully.'); };
document.querySelector('#confirmLogout').onclick = () => location.href = 'index.html';

const cats = ['Medical-Surgical', 'Maternal & Child', 'Mental Health', 'Community Health Nursing', 'Health Assessment', 'Lifestyle', 'Nursing Practice', 'Education & Research', 'Healthcare', 'Nursing Education', 'Food Security', 'Poverty Reduction', 'Nursing Administration', 'Pharmacology', 'Gerontological Nursing'];
document.querySelector('#categoryButtons').innerHTML = cats.map(c => `<button>${c}</button>`).join('');
const advisers = [['Jean Annette S. Ibo, RN, MAN, EdD', 'Community Health Nursing'], ['Marlo N. Robier, RN, RM, MAN', 'Medical-Surgical Nursing (Immunology)'], ['Melissa Sue M. Pecson, RN, MAN', 'Pharmacology']];
document.querySelector('#adviserList').innerHTML = advisers.map(a => `<article class="adviser-card"><div><b>◯ ${a[0]}</b><small>${a[1]}</small><button>Request Adviser</button></div><q>Specializes in ${a[1].toLowerCase()} and related clinical studies.</q></article>`).join('');
const steps = [['Browse or search theses', 'Use the search bar to find theses by title, author, keyword, or abstract.'], ['Preview & Download', 'Tap a thesis card to read the abstract or open the full manuscript.'], ['Bookmark theses', 'Tap the bookmark icon to save theses to your collection.'], ['Submit your thesis', 'Go to My Submission to upload your PDF.'], ['Get an adviser match', 'Visit Adviser Recommendation for suggestions matched by expertise.']];
document.querySelector('#stepsList').innerHTML = steps.map((s, i) => `<article class="step"><span>${i + 1}</span><div><b>${s[0]}</b><p>${s[1]}</p></div></article>`).join('');
render();
