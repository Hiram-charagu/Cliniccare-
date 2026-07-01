/* ── AUTH GUARD + USER INJECTION ── */
(function () {
  var raw = localStorage.getItem('cliniccare_user');
  if (!raw) { window.location.replace('../login.html'); return; }
  try {
    var user = JSON.parse(raw);
    if (!user || user.role !== 'patient') { window.location.replace('../login.html'); return; }

    // Inject name into topbar once DOM is ready
    document.addEventListener('DOMContentLoaded', function () {
      var name = user.name || 'Patient';
      var initials = (name.trim().split(' ').map(function(p){ return p[0]; }).join('')).toUpperCase().slice(0,2);
      var first = name.trim().split(' ')[0];
      var h = new Date().getHours();
      var greet = h < 12 ? 'morning' : h < 17 ? 'afternoon' : 'evening';

      document.querySelectorAll('[data-cc-name]').forEach(function(el){ el.textContent = name; });
      document.querySelectorAll('[data-cc-first]').forEach(function(el){ el.textContent = first; });
      document.querySelectorAll('[data-cc-initials]').forEach(function(el){ el.textContent = initials; });
      document.querySelectorAll('[data-cc-greeting]').forEach(function(el){ el.textContent = 'Good ' + greet + ', ' + first; });
      document.querySelectorAll('[data-cc-name-input]').forEach(function(el){ el.value = name; });
      document.querySelectorAll('[data-cc-email]').forEach(function(el){
        if (el.tagName === 'INPUT') el.value = user.email || '';
        else el.textContent = user.email || '';
      });

      // legacy #userName span
      var un = document.getElementById('userName');
      if (un) un.textContent = name;
    });
  } catch (e) {
    localStorage.removeItem('cliniccare_user');
    window.location.replace('../login.html');
  }
})();

/* ── LOGOUT ── */
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.logout, [data-cc-logout]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      localStorage.removeItem('cliniccare_user');
      window.location.href = '../login.html';
    });
  });

  var logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function () {
      localStorage.removeItem('cliniccare_user');
      window.location.href = '../login.html';
    });
  }
});