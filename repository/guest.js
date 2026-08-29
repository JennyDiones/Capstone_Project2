const cards = [...document.querySelectorAll('.research-card')];
const list = document.querySelector('#researchList');
const search = document.querySelector('#guestSearch');
let sortMode = 'popular';

function renderResearch() {
  const rawQuery = (document.querySelector('#keywordFilter').value || search.value).trim();
  const query = rawQuery.toLowerCase();
  const author = document.querySelector('#authorFilter').value.trim().toLowerCase();
  const from = Number(document.querySelector('#fromYear').value) || 0;
  const to = Number(document.querySelector('#toYear').value) || 9999;
  cards.forEach(card => {
    const matches = card.dataset.title.toLowerCase().includes(query) && card.dataset.author.toLowerCase().includes(author) && +card.dataset.year >= from && +card.dataset.year <= to;
    card.classList.toggle('hidden', !matches);
    if (query && matches) card.classList.add('open');
    if (!query && !author && !from && to === 9999) card.classList.remove('open');
  });
  cards.sort((a,b) => sortMode==='az' ? a.dataset.title.localeCompare(b.dataset.title) : sortMode==='oldest' ? a.dataset.year-b.dataset.year : sortMode==='newest' ? b.dataset.year-a.dataset.year : b.dataset.popularity-a.dataset.popularity).forEach(card=>list.append(card));
  const visible = cards.filter(card=>!card.classList.contains('hidden')).length;
  document.querySelector('#guestEmpty').style.display=visible?'none':'block';
  document.querySelector('#resultsTitle').textContent = rawQuery ? `Results for “${rawQuery}”` : 'Recommended for You';
}

search.addEventListener('input', renderResearch);
document.querySelectorAll('.research-summary').forEach(button=>button.addEventListener('click',()=>{
  const card=button.closest('.research-card');
  card.classList.toggle('open');
  if(card.dataset.title.startsWith('Research Map')){
    if(card.classList.contains('open')) showContactForCard(card,true);
    else document.querySelector('#inlineContactView').classList.remove('open');
  }
}));

function openModal(id){document.querySelector(id).classList.add('open')}
function closeModals(){document.querySelectorAll('.modal-backdrop').forEach(modal=>modal.classList.remove('open'))}
document.querySelector('#openFilters').addEventListener('click',()=>openModal('#filterModal'));
document.querySelector('#openSort').addEventListener('click',()=>openModal('#sortModal'));
document.querySelectorAll('.modal-close').forEach(button=>button.addEventListener('click',closeModals));
document.querySelectorAll('.modal-backdrop').forEach(modal=>modal.addEventListener('click',event=>{if(event.target===modal)closeModals()}));

document.querySelectorAll('[data-sort]').forEach(button=>button.addEventListener('click',()=>{sortMode=button.dataset.sort;document.querySelectorAll('[data-sort]').forEach(b=>b.classList.toggle('selected',b.dataset.sort===sortMode));renderResearch();if(button.closest('.sort-modal'))closeModals()}));
document.querySelector('#filterForm').addEventListener('submit',event=>{event.preventDefault();search.value=document.querySelector('#keywordFilter').value;renderResearch();closeModals()});
document.querySelector('#clearFilters').addEventListener('click',()=>{document.querySelector('#filterForm').reset();search.value='';sortMode='popular';renderResearch()});

document.querySelectorAll('.contact-authors').forEach(button=>button.addEventListener('click',()=>{
  const card=button.closest('.research-card');
  showContactForCard(card,false);
}));

function showContactForCard(card,underCard){
  const isInactive=card.dataset.title.startsWith('Research Map');
  document.querySelector('#inlineResearchTitle').textContent=card.dataset.title;
  document.querySelector('#inactiveWarning').style.display=isInactive?'flex':'none';
  document.querySelector('#helpResources').style.display=isInactive?'block':'none';
  document.querySelector('#inlineResearchers').innerHTML=card.dataset.author.split(',').map(name=>`<div class="inline-researcher${isInactive?' inactive-row':''}"><span>${name.trim()}<small>Bachelor of Science in Nursing Student</small></span>${isInactive?'<button class="inactive" type="button">Inactive</button>':'<button class="active" type="button">Active</button><button class="direct-contact" type="button">Contact</button>'}</div>`).join('');
  const contactView=document.querySelector('#inlineContactView');
  if(underCard){
    card.querySelector('.research-details').append(contactView);
    document.querySelector('.research-content').style.display='block';
  }else{
    document.querySelector('main').append(contactView);
    document.querySelector('.research-content').style.display='none';
  }
  contactView.classList.add('open');
}

document.querySelector('#closeContactView').addEventListener('click',()=>{document.querySelector('#inlineContactView').classList.remove('open');document.querySelector('.research-content').style.display='block'});

document.addEventListener('keydown',event=>{if(event.key==='Escape')closeModals()});

const researchMapCard = document.querySelector('.research-card[data-title^="Research Map"]');
if (researchMapCard) {
  researchMapCard.classList.add('open');
  showContactForCard(researchMapCard, true);
}

document.querySelectorAll(`[data-sort="${sortMode}"]`).forEach(button => button.classList.add('selected'));
