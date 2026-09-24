<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>BUCN-NEST Client</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="{{ asset('client.css') }}">
</head>
<body>
  <header class="client-header">
    <button class="client-menu" id="clientMenu" aria-label="Open menu">
      <i></i>
      <i></i>
      <i></i>
    </button>
    <div class="client-avatar">👩🏻</div>
    <b class="client-logo">BUCN-NEST</b>
    <nav>
      <button data-view="home">
        <small>Home</small>
      </button>
      <button data-view="bookmarks">
        <small>Bookmarks</small>
      </button>
      <button data-view="notifications">
        <small>Notification</small>
      </button>
      <button data-view="profile">
        <small>Profile</small>
      </button>
    </nav>
  </header>

  <div class="client-shade" id="clientShade"></div>

  <aside class="client-drawer" id="clientDrawer">
    <header>
      <button id="closeDrawer">☰</button>
      <div>
        <b>{{ Auth::user()->first_name }} {{ Auth::user()->last_name }}</b>
        <small>ID: {{ Auth::user()->user_id }}<br>{{ Auth::user()->role->role_name }} Account</small>
      </div>
      <div class="client-avatar">👩🏻</div>
    </header>
    <nav>
      <button data-view="home">Home</button>
      <button data-view="bookmarks">Bookmarked</button>
      <button data-view="notifications">Notifications</button>
      <button data-view="profile">Edit Profile</button>
      <button data-view="categories">Categories</button>
      <button data-view="submission">My Submission</button>
      <button data-view="advisers">Adviser Recommendation</button>
      <button data-view="howto">How to Use</button>
      <button data-view="help">Help &amp; Feedback</button>
      <button data-view="settings">Settings</button>
      <button class="logout-link" data-view="logout">⇥ Logout</button>
    </nav>
  </aside>

  <main>
    <!-- Home View -->
    <section class="client-view active" id="homeView">
      <div class="client-hero">
           <h1>Welcome, {{ Auth::user()->first_name }}</h1>
        <p>Explore research. Inspire knowledge.</p>
        <div class="client-search">
          <b>⌕</b>
          <input id="clientSearch" value="" placeholder="Search for research title, keyword...">
          <button id="clientFilter">☷</button>
        </div>
      </div>
      <div class="client-results">
        <div class="result-bar">
          <h2 id="clientResultTitle">Recommended for You</h2>
          <button id="clientSort">☰ &nbsp; Sort</button>
        </div>
        <div id="clientTheses"></div>
      </div>
    </section>

    <!-- Bookmarks View -->
    <section class="client-view panel-view" id="bookmarksView">
      <div class="view-panel">
        <h1>🔖 &nbsp; Bookmarked</h1>
        <h3>SAVED THESES</h3>
        <div id="bookmarkList"></div>
      </div>
    </section>

    <!-- Notifications View -->
    <section class="client-view panel-view" id="notificationsView">
      <div class="view-panel">
        <h1>🔔 &nbsp; Notifications</h1>
        <h3>LATEST</h3>
        <article class="notice unread">
          <b>Submission approved</b>
          <p>Your thesis upload has been verified and approved by the admin.</p>
          <footer>
            May 18, 2026
            <span>1:43 PM</span>
          </footer>
        </article>
        <article class="notice unread">
          <b>New Thesis Upload</b>
          <p>Physiological Impact of Progressive Stair Running on Lower-Limb Muscle Activation and Aerobic Capacity</p>
          <footer>
            May 11, 2026
            <span>4:20 PM</span>
          </footer>
        </article>
        <h3>EARLIER</h3>
        <article class="notice">
          <b>Advisor Request</b>
          <p>
            <strong>Ma. Claudette L. Orense, RN, MN</strong>, has accepted your request.
          </p>
        </article>
      </div>
    </section>

    <!-- Profile View -->
    <section class="client-view panel-view" id="profileView">
      <form class="view-panel profile-form" id="profileForm">
        <h1>
          👩‍🎓 &nbsp; Edit Profile
          <span>Change photo&nbsp; 👨‍🎓</span>
        </h1>
        <div class="form-grid">
          <label>
            First Name
            <input value="{{ Auth::user()->first_name }}">
          </label>
          <label>
            Last Name
            <input value="{{ Auth::user()->last_name }}">
          </label>
          <label>
            Role
            <input value="{{ Auth::user()->role->role_name }}" readonly>
          </label>
          <label class="wide">
            User ID
            <input value="{{ Auth::user()->user_id }}" readonly>
          </label>
          <label class="wide">
            Email Address
            <input type="email" value="{{ Auth::user()->email }}">
          </label>
        </div>
        <footer>
          <button type="reset">Cancel</button>
          <button type="submit">Save</button>
        </footer>
      </form>
    </section>

    <!-- Categories View -->
    <section class="client-view panel-view" id="categoriesView">
      <div class="view-panel">
        <h1>⊞ &nbsp; Categories</h1>
        <div class="category-buttons" id="categoryButtons"></div>
        <h3>FILTER BY METHODOLOGY</h3>
        <div class="method-buttons">
          <button class="selected">All</button>
          <button>Qualitative</button>
          <button>Quantitative</button>
          <button>Mixed</button>
        </div>
      </div>
    </section>

    <!-- Submission View -->
    <section class="client-view panel-view" id="submissionView">
      <div class="view-panel">
        <h1>
          ⬇️ &nbsp; My Submission
          <span>+</span>
        </h1>
        <h3>SUBMISSION STATUS</h3>
        <article class="submission-card">
          <b>No thesis submitted yet</b>
          <div>
            <strong>Not Started</strong>
          </div>
        </article>
      </div>
    </section>

    <!-- Advisers View -->
    <section class="client-view panel-view" id="advisersView">
      <div class="view-panel">
        <h1>👍 &nbsp; Adviser Recommendation</h1>
        <h3>ADVISERS &amp; RESEARCH SPECIALIZATION</h3>
        <div id="adviserList"></div>
      </div>
    </section>

    <!-- How to Use View -->
    <section class="client-view panel-view" id="howtoView">
      <div class="view-panel">
        <h1>ⓘ &nbsp; How to Use</h1>
        <h3>GETTING STARTED</h3>
        <div id="stepsList"></div>
      </div>
    </section>

    <!-- Help View -->
    <section class="client-view panel-view" id="helpView">
      <div class="view-panel">
        <h1>? &nbsp; Help &amp; Feedback</h1>
        <h3>SUPPORT</h3>
        <div class="simple-list">
          <button>
            ❔
            <b>Frequently asked questions</b>
            <small>How to search, submit, bookmark, and use the system.</small>
          </button>
          <button>
            📞
            <b>Contact support</b>
            <small>bucnnest-support@bucn.edu.ph</small>
          </button>
        </div>
      </div>
    </section>

    <!-- Settings View -->
    <section class="client-view panel-view" id="settingsView">
      <div class="view-panel">
        <h1>⚙ &nbsp; Settings</h1>
        <div class="simple-list">
          <h3>ACCOUNT</h3>
          <button>
            ▣
            <b>Change password</b>
          </button>
        </div>
      </div>
    </section>

    <!-- Logout View -->
    <section class="client-view panel-view" id="logoutView">
      <div class="view-panel logout-panel">
        <h1>⇥ &nbsp; Logout</h1>
        <div>⇥</div>
        <h2>Log Out of BUCN-NEST?</h2>
        <p>
          You will be returned to the login screen.<br>
          All your bookmarks, submission and profile data remain saved securely.
        </p>
        <footer>
          <button data-view="home">Cancel</button>
          <button id="confirmLogout">⇥ Log out</button>
        </footer>
      </div>
    </section>
  </main>

  <!-- Sort Modal -->
  <div class="client-modal" id="sortModal">
    <div class="sort-box">
      <header>
        <b>Sort by</b>
        <button class="close-modal">×</button>
      </header>
      <button data-sort="newest">
        ▣
        <span>
          <b>Newest First</b>
          <small>Recently added Theses</small>
        </span>
      </button>
      <button class="selected" data-sort="popular">
        ♨
        <span>
          <b>Most Popular</b>
          <small>Most viewed Theses</small>
        </span>
      </button>
      <button data-sort="az">
        ▤
        <span>
          <b>A-Z Title</b>
          <small>Alphabetical order</small>
        </span>
      </button>
      <button data-sort="oldest">
        ◷
        <span>
          <b>Oldest First</b>
          <small>Oldest theses first</small>
        </span>
      </button>
    </div>
  </div>

  <!-- Hidden logout form para sa totoong Laravel logout -->
  <form id="logoutForm" method="POST" action="{{ route('logout') }}" style="display: none;">
    @csrf
  </form>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>
  <script src="{{ asset('client.js') }}"></script>
  <script>
    document.querySelector('#confirmLogout').onclick = () => {
      document.querySelector('#logoutForm').submit();
    };
    render();
  </script>
</body>
</html>
