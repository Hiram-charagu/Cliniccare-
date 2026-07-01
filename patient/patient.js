/* ── AUTH GUARD ── */
(function () {
  var raw = localStorage.getItem('cliniccare_user');
  if (!raw) { window.location.replace('../login.html'); return; }
  try {
    var user = JSON.parse(raw);
    if (!user || user.role !== 'patient') { window.location.replace('../login.html'); }
  } catch (e) {
    localStorage.removeItem('cliniccare_user');
    window.location.replace('../login.html');
  }
})();

/* ── LOGOUT ── */
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.logout').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      localStorage.removeItem('cliniccare_user');
      window.location.href = btn.getAttribute('href');
    });
  });
});