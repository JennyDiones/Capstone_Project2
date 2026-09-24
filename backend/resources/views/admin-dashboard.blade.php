<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>NEST Admin</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="{{ asset('admin.css') }}">
</head>
<body>
  <button class="menu-toggle" id="menuToggle" type="button" aria-label="Open admin menu" aria-expanded="false">
    <span></span>
    <span></span>
    <span></span>
  </button>
  <div class="sidebar-overlay" id="sidebarOverlay"></div>

  <aside class="sidebar" id="adminSidebar">
    <div class="sidebar-brand">BUCN-NEST ADMIN</div>
    <nav aria-label="Admin navigation">
      <a class="nav-item active" href="#dashboard" data-page="Dashboard">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="2" y="2" width="9" height="7" rx="1"/>
          <rect x="13" y="2" width="9" height="12" rx="1"/>
          <rect x="2" y="11" width="9" height="11" rx="1"/>
          <rect x="13" y="16" width="9" height="6" rx="1"/>
        </svg>
        <span>Dashboard</span>
      </a>
      <a class="nav-item" href="#theses" data-page="Theses">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 2h12a2 2 0 012 2v12l-5 5H5a2 2 0 01-2-2V4a2 2 0 012-2z"/>
          <path class="cutout" d="M14 21v-4a1 1 0 011-1h4M7 7h8M7 11h8"/>
        </svg>
        <span>Theses</span>
      </a>
      <a class="nav-item" href="#users" data-page="Users">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="7" r="5"/>
          <path d="M4 22a8 8 0 0116 0z"/>
        </svg>
        <span>Users</span>
      </a>
      <a class="nav-item" href="#notification" data-page="Notification">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 18h16l-2-3V9a6 6 0 00-12 0v6z"/>
          <path d="M9 20a3 3 0 006 0z"/>
        </svg>
        <span>Notification</span>
      </a>
      <a class="nav-item" href="#settings" data-page="Settings">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path fill-rule="evenodd" d="M9.5 2h5l.7 2.5c.7.3 1.3.6 1.9 1.1l2.5-.7 2.5 4.3-1.8 1.8a8 8 0 010 2.1l1.8 1.8-2.5 4.3-2.5-.7c-.6.4-1.2.8-1.9 1.1l-.7 2.4h-5l-.7-2.5c-.7-.3-1.3-.6-1.9-1.1l-2.5.7-2.5-4.3L3.7 13a8 8 0 010-2.1L1.9 9.1l2.5-4.3 2.5.7c.6-.4 1.2-.8 1.9-1.1L9.5 2zM12 16a4 4 0 100-8 4 4 0 000 8z"/>
        </svg>
        <span>Settings</span>
      </a>
      <a class="nav-item" href="#" id="adminLogoutLink" style="margin-top: auto; color: #d9534f;">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/>
        </svg>
        <span>Logout</span>
      </a>
    </nav>
  </aside>

  <main class="admin-content">
    <h1 class="mobile-page-title" id="pageTitle">Dashboard</h1>

    <!-- Dashboard View -->
    <div class="admin-view active" id="dashboardView">
      <section class="stats-grid" aria-label="Dashboard statistics">
        <article class="stat-card">
          <div class="stat-label">Total Theses</div>
          <div class="stat-body">
            <div>
              <strong>0</strong>
              <small>No data yet</small>
            </div>
            <span class="stat-icon">▤</span>
          </div>
        </article>
        <article class="stat-card">
          <div class="stat-label">Pending Reviews</div>
          <div class="stat-body">
            <div>
              <strong>0</strong>
              <small>Needs Attention</small>
            </div>
            <span class="stat-icon clock-icon">◷</span>
          </div>
        </article>
        <article class="stat-card">
          <div class="stat-label">Registered Users</div>
          <div class="stat-body">
            <div>
              <strong>{{ \App\Models\User::count() }}</strong>
              <small>Live from database</small>
            </div>
            <span class="stat-icon">♙</span>
          </div>
        </article>
        <article class="stat-card">
          <div class="stat-label">Active Advisers</div>
          <div class="stat-body">
            <div>
              <strong>0</strong>
              <small>No data yet</small>
            </div>
            <span class="stat-icon">♧</span>
          </div>
        </article>
      </section>

      <section class="dashboard-panel approvals-panel">
        <header class="panel-header">
          <span class="panel-icon">◷</span>
          <h2>Pending Approvals</h2>
          <span class="count-badge" id="approvalCount">0</span>
        </header>
        <div class="approval-list" id="approvalList">
          <p class="empty-approvals" id="emptyApprovals">No pending approvals yet. Thesis data will appear here once the Thesis Repository module is built.</p>
        </div>
      </section>
    </div>

    <!-- Theses View -->
    <div class="admin-view" id="thesesView">
      <div class="theses-toolbar">
        <label class="thesis-search">
          <span aria-hidden="true"></span>
          <input id="thesisSearch" type="search" placeholder="Search for research title, keyword..." aria-label="Search theses">
        </label>
        <div class="filter-row">
          <button class="add-thesis-btn" id="addThesis" type="button">
            <b>+</b> Add Thesis
          </button>
        </div>
      </div>
      <p class="no-results">No theses in the database yet.</p>
    </div>

    <!-- Users View -->
    <div class="admin-view" id="usersView">
      <div class="users-toolbar">
        <label class="thesis-search">
          <span aria-hidden="true"></span>
          <input id="userSearch" type="search" placeholder="Search name, ID, email..." aria-label="Search users">
        </label>
      </div>
      <h2 class="users-count">USERS (<span id="visibleUserCount">{{ \App\Models\User::count() }}</span>)</h2>
      <section class="user-list" id="userList">
        @foreach (\App\Models\User::with('role')->get() as $u)
        <article class="user-card">
          <div class="avatar">{{ strtoupper(substr($u->first_name, 0, 1) . substr($u->last_name, 0, 1)) }}</div>
          <div class="user-info">
            <strong>{{ $u->first_name }} {{ $u->last_name }}</strong>
            <span>{{ $u->email }} — {{ $u->role->role_name }}</span>
          </div>
          <button class="suspend-btn" type="button">Suspend</button>
          <button class="user-view-btn" type="button">View</button>
        </article>
        @endforeach
      </section>
    </div>

    <!-- Notification View -->
    <div class="admin-view" id="notificationView">
      <div class="notification-heading">
        <h1>Notification</h1>
      </div>
      <form class="notification-form" id="notificationForm">
        <header>
          <span class="send-plane">➤</span>
          <h2>Send Notification</h2>
        </header>
        <div class="notification-fields">
          <label>
            RECIPIENT
            <select id="notificationRecipient">
              <option>All users</option>
              <option>Students</option>
              <option>Faculty / Advisers</option>
            </select>
          </label>
          <label>
            TITLE
            <input id="notificationTitle" type="text" placeholder="Notification title..." required>
          </label>
          <label>
            MESSAGE
            <textarea id="notificationMessage" placeholder="Type message..." required></textarea>
          </label>
          <button class="send-notification-btn" type="submit">Send Notification</button>
        </div>
      </form>
      <section class="notification-feed">
        <p style="padding: 20px; color: #888;">No notifications yet.</p>
      </section>
    </div>
  </main>

  <!-- Hidden logout form para sa totoong Laravel logout -->
  <form id="adminLogoutForm" method="POST" action="{{ route('logout') }}" style="display: none;">
    @csrf
  </form>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>
  <script src="{{ asset('admin.js') }}"></script>
  <script>
    document.querySelector('#adminLogoutLink').addEventListener('click', function(e) {
      e.preventDefault();
      document.querySelector('#adminLogoutForm').submit();
    });
  </script>
</body>
</html>
