const sidebar = document.querySelector('#adminSidebar');
const overlay = document.querySelector('#sidebarOverlay');
const menuToggle = document.querySelector('#menuToggle');
const pageTitle = document.querySelector('#pageTitle');
const navItems = document.querySelectorAll('.nav-item');

function closeMenu() {
  sidebar.classList.remove('open');
  overlay.classList.remove('show');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open admin menu');
}

menuToggle.addEventListener('click', () => {
  const isOpen = sidebar.classList.toggle('open');
  overlay.classList.toggle('show', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close admin menu' : 'Open admin menu');
});

overlay.addEventListener('click', closeMenu);

navItems.forEach((item) => {
  item.addEventListener('click', () => {
    navItems.forEach((link) => link.classList.remove('active'));
    item.classList.add('active');
    pageTitle.textContent = item.dataset.page;
    document.querySelectorAll('.admin-view').forEach((view) => view.classList.remove('active'));
    const targetView = document.querySelector(`#${item.dataset.page.toLowerCase()}View`);
    (targetView || document.querySelector('#dashboardView')).classList.add('active');
    if (window.innerWidth <= 900) closeMenu();
  });
});

const thesisSearch = document.querySelector('#thesisSearch');
const statusFilter = document.querySelector('#statusFilter');
const categoryFilter = document.querySelector('#categoryFilter');
const noResults = document.querySelector('#noResults');

function filterTheses() {
  const query = thesisSearch.value.trim().toLowerCase();
  const status = statusFilter.value;
  const category = categoryFilter.value;
  let visible = 0;
  document.querySelectorAll('#thesesView .thesis-item').forEach((item) => {
    const matches = (!query || item.textContent.toLowerCase().includes(query)) &&
      (status === 'all' || item.dataset.status === status) &&
      (category === 'all' || item.dataset.category === category);
    item.classList.toggle('filtered-out', !matches);
    if (matches) visible += 1;
  });
  noResults.style.display = visible ? 'none' : 'block';
}

[thesisSearch, statusFilter, categoryFilter].forEach((control) => control.addEventListener('input', filterTheses));

document.querySelector('#addThesis').addEventListener('click', () => {
  thesisSearch.value = '';
  thesisSearch.placeholder = 'Add Thesis form is ready to be connected';
  thesisSearch.focus();
});

document.querySelector('#thesesView').addEventListener('click', (event) => {
  const item = event.target.closest('.thesis-item');
  if (!item) return;
  if (event.target.matches('.view-btn')) window.alert(item.querySelector('strong').textContent);
  if (event.target.matches('.approve-btn, .reject-btn')) {
    item.remove();
    const count = document.querySelectorAll('.pending-theses .thesis-item').length;
    document.querySelector('#thesesPendingCount').textContent = count;
    document.querySelector('.pending-theses .count-badge').textContent = count;
  }
});

const userSearch = document.querySelector('#userSearch');
const roleFilter = document.querySelector('#roleFilter');
const userStatusFilter = document.querySelector('#userStatusFilter');
const userCards = document.querySelectorAll('.user-card');
const noUsers = document.querySelector('#noUsers');

function filterUsers() {
  const query = userSearch.value.trim().toLowerCase();
  const role = roleFilter.value;
  const status = userStatusFilter.value;
  let visible = 0;
  userCards.forEach((card) => {
    const matches = (!query || card.textContent.toLowerCase().includes(query)) &&
      (role === 'all' || card.dataset.role === role) &&
      (status === 'all' || card.dataset.status === status);
    card.classList.toggle('filtered-out', !matches);
    if (matches) visible += 1;
  });
  document.querySelector('#visibleUserCount').textContent = (query || role !== 'all' || status !== 'all') ? visible : '976';
  noUsers.style.display = visible ? 'none' : 'block';
}

[userSearch, roleFilter, userStatusFilter].forEach((control) => control.addEventListener('input', filterUsers));

document.querySelector('#userList').addEventListener('click', (event) => {
  const card = event.target.closest('.user-card');
  if (!card) return;
  if (event.target.matches('.suspend-btn')) {
    const suspended = card.dataset.status === 'suspended';
    card.dataset.status = suspended ? 'active' : 'suspended';
    event.target.textContent = suspended ? 'Suspend' : 'Activate';
    event.target.classList.toggle('activate', !suspended);
    filterUsers();
  }
  if (event.target.matches('.user-view-btn')) {
    window.alert(card.querySelector('.user-info strong').textContent);
  }
});

const notificationForm = document.querySelector('#notificationForm');
const todayNotifications = document.querySelector('#todayNotifications');

notificationForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = document.querySelector('#notificationTitle');
  const message = document.querySelector('#notificationMessage');
  const recipient = document.querySelector('#notificationRecipient').value;
  const now = new Date();
  const card = document.createElement('article');
  card.className = 'notification-card unread new-card';
  card.innerHTML = `<span class="unread-dot"></span><strong>${escapeHtml(title.value)}</strong><p class="notification-subject">${escapeHtml(message.value)}</p><p>Sent to: <b>${escapeHtml(recipient)}</b></p><footer><span>${now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span><span>${now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</span></footer>`;
  todayNotifications.prepend(card);
  notificationForm.reset();
});

function escapeHtml(value) {
  const element = document.createElement('div');
  element.textContent = value;
  return element.innerHTML;
}

document.querySelector('#markAllRead').addEventListener('click', () => {
  document.querySelectorAll('.notification-card.unread').forEach((card) => card.classList.remove('unread'));
});

document.querySelector('.notification-feed').addEventListener('click', (event) => {
  const card = event.target.closest('.notification-card');
  if (card) card.classList.remove('unread');
});

const approvalList = document.querySelector('#approvalList');
const approvalCount = document.querySelector('#approvalCount');
const emptyApprovals = document.querySelector('#emptyApprovals');

function resolveApproval(button, action) {
  const item = button.closest('.approval-item');
  item.classList.add('removing');
  window.setTimeout(() => {
    item.remove();
    const remaining = approvalList.querySelectorAll('.approval-item').length;
    approvalCount.textContent = String(remaining);
    if (remaining === 0) emptyApprovals.style.display = 'block';
  }, 200);
}

approvalList.addEventListener('click', (event) => {
  if (event.target.matches('.approve-btn')) resolveApproval(event.target, 'approved');
  if (event.target.matches('.reject-btn')) resolveApproval(event.target, 'rejected');
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 900) closeMenu();
});
