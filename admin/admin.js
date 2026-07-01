/* ── AUTH GUARD ── */
(function () {
  var raw = localStorage.getItem('cliniccare_user');
  if (!raw) { window.location.replace('../login.html'); return; }
  try {
    var user = JSON.parse(raw);
    if (!user || user.role !== 'admin') { window.location.replace('../login.html'); }
  } catch (e) {
    localStorage.removeItem('cliniccare_user');
    window.location.replace('../login.html');
  }
})();

/* ── PORTAL TABS ── */
document.addEventListener('DOMContentLoaded', function () {
  var links    = document.querySelectorAll('[data-section]');
  var sections = document.querySelectorAll('.portal-section');
  var title    = document.getElementById('pageTitle');

  function showSection(id) {
    sections.forEach(function (s) {
      if (s.id === id) {
        s.classList.add('active');
        if (title) title.textContent = s.dataset.title || title.textContent;
      } else {
        s.classList.remove('active');
      }
    });
    links.forEach(function (l) {
      l.classList.toggle('active', l.dataset.section === id);
    });
  }

  links.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      var id = link.dataset.section;
      history.replaceState(null, '', '#' + id);
      showSection(id);
    });
  });

  showSection(window.location.hash.replace('#', '') || 'dashboard');

  /* ── LOGOUT ── */
  document.querySelectorAll('.logout').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      localStorage.removeItem('cliniccare_user');
      window.location.href = btn.getAttribute('href');
    });
  });
});
