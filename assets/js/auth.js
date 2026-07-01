// ── ClinicCare shared auth utility ──
// Usage: include this script, then call CC.getUser(), CC.initPortal(), etc.

var CC = (function () {

  function getUser() {
    try { return JSON.parse(localStorage.getItem('cliniccare_user')) || null; }
    catch (e) { return null; }
  }

  function getInitials(name) {
    if (!name) return '??';
    var parts = name.trim().split(' ');
    return (parts[0][0] + (parts[parts.length - 1][0] || '')).toUpperCase();
  }

  function getFirstName(name) {
    if (!name) return 'there';
    return name.trim().split(' ')[0];
  }

  function getHour() {
    var h = new Date().getHours();
    if (h < 12) return 'morning';
    if (h < 17) return 'afternoon';
    return 'evening';
  }

  // Guard: redirect to login if not logged in (or wrong role)
  function requireRole(role) {
    var u = getUser();
    if (!u) { window.location.href = '../login.html'; return null; }
    if (role && u.role !== role) {
      var routes = { admin: '../admin/dashboard.html', doctor: '../doctor/dashboard.html', patient: '../patient/dashboard.html' };
      window.location.href = routes[u.role] || '../login.html';
      return null;
    }
    return u;
  }

  // Inject user info into every portal page
  // Looks for elements with data-cc-* attributes and fills them
  function initPortal(role) {
    var u = requireRole(role);
    if (!u) return;

    var name     = u.name  || 'User';
    var email    = u.email || '';
    var initials = getInitials(name);
    var first    = getFirstName(name);
    var greeting = 'Good ' + getHour() + ', ' + (u.role === 'doctor' ? name : first);

    // data-cc-name  → full name
    document.querySelectorAll('[data-cc-name]').forEach(function (el) { el.textContent = name; });
    // data-cc-first → first name
    document.querySelectorAll('[data-cc-first]').forEach(function (el) { el.textContent = first; });
    // data-cc-initials → initials
    document.querySelectorAll('[data-cc-initials]').forEach(function (el) { el.textContent = initials; });
    // data-cc-greeting → "Good morning, Jane"
    document.querySelectorAll('[data-cc-greeting]').forEach(function (el) { el.textContent = greeting; });
    // data-cc-email → email
    document.querySelectorAll('[data-cc-email]').forEach(function (el) {
      if (el.tagName === 'INPUT') el.value = email;
      else el.textContent = email;
    });
    // data-cc-role → role label
    document.querySelectorAll('[data-cc-role]').forEach(function (el) {
      el.textContent = u.role.charAt(0).toUpperCase() + u.role.slice(1);
    });

    // Logout buttons
    document.querySelectorAll('[data-cc-logout], .logout').forEach(function (el) {
      el.addEventListener('click', function (e) {
        if (el.tagName === 'A' && el.getAttribute('href')) return; // let link navigate
        e.preventDefault();
        localStorage.removeItem('cliniccare_user');
        window.location.href = '../login.html';
      });
    });
  }

  // For the landing page (index.html) — swap nav buttons if logged in
  function initLanding() {
    var u = getUser();
    var actions = document.querySelector('.nav-actions');
    var mobileMenu = document.querySelector('.mobile-menu');
    if (!u || !actions) return;

    var routes = { admin: 'admin/dashboard.html', doctor: 'doctor/dashboard.html', patient: 'patient/dashboard.html' };
    var portal = routes[u.role] || 'login.html';
    var first  = getFirstName(u.name);
    var initials = getInitials(u.name);

    // Replace nav buttons with user chip + go to portal
    actions.innerHTML =
      '<div class="nav-user-chip">' +
        '<div class="nav-user-avatar">' + initials + '</div>' +
        '<span>Hi, ' + first + '</span>' +
      '</div>' +
      '<a class="btn btn-primary" href="' + portal + '">Go to Portal →</a>';

    // Update mobile menu too
    if (mobileMenu) {
      var signIn = mobileMenu.querySelector('a[href="login.html"]');
      var getStarted = mobileMenu.querySelector('a[href="signup.html"]');
      if (signIn) signIn.remove();
      if (getStarted) {
        getStarted.textContent = 'Go to Portal →';
        getStarted.href = portal;
      }
    }

    // Update hero buttons
    var heroActions = document.querySelector('.hero-actions');
    if (heroActions) {
      heroActions.innerHTML =
        '<a class="btn btn-primary btn-lg" href="' + portal + '">' +
          'Go to Your Portal →' +
        '</a>' +
        '<a class="btn btn-ghost btn-lg" href="#portals">Explore Features</a>';
    }

    // Update hero greeting stat pill if present
    var heroBadge = document.querySelector('.hero-badge');
    if (heroBadge) {
      heroBadge.innerHTML = '<span class="badge-dot"></span> Welcome back, ' + first + '!';
    }
  }

  return { getUser: getUser, getInitials: getInitials, getFirstName: getFirstName, requireRole: requireRole, initPortal: initPortal, initLanding: initLanding };
})();
