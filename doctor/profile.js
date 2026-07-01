/* ============================================================
   profile.js — Doctor Profile page logic
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  // ── PROFESSIONAL INFO EDIT ──
  var profForm    = document.getElementById('profForm');
  var profActions = document.getElementById('profActions');

  document.getElementById('editProfBtn').addEventListener('click', function () {
    profForm.querySelectorAll('input, select').forEach(function (el) {
      el.disabled = false;
    });
    profActions.classList.remove('hidden');
    this.style.display = 'none';
  });

  document.getElementById('cancelProfBtn').addEventListener('click', function () {
    profForm.querySelectorAll('input, select').forEach(function (el) {
      el.disabled = true;
    });
    profActions.classList.add('hidden');
    document.getElementById('editProfBtn').style.display = '';
  });

  document.getElementById('saveProfBtn').addEventListener('click', function () {
    profForm.querySelectorAll('input, select').forEach(function (el) {
      el.disabled = true;
    });
    profActions.classList.add('hidden');
    document.getElementById('editProfBtn').style.display = '';
  });

  // ── AVAILABILITY EDIT ──
  var availForm    = document.getElementById('availForm');
  var availActions = document.getElementById('availActions');

  document.getElementById('editAvailBtn').addEventListener('click', function () {
    availForm.querySelectorAll('input, select').forEach(function (el) {
      el.disabled = false;
    });
    availActions.classList.remove('hidden');
    this.style.display = 'none';
  });

  document.getElementById('cancelAvailBtn').addEventListener('click', function () {
    availForm.querySelectorAll('input, select').forEach(function (el) {
      el.disabled = true;
    });
    availActions.classList.add('hidden');
    document.getElementById('editAvailBtn').style.display = '';
  });

  document.getElementById('saveAvailBtn').addEventListener('click', function () {
    availForm.querySelectorAll('input, select').forEach(function (el) {
      el.disabled = true;
    });
    availActions.classList.add('hidden');
    document.getElementById('editAvailBtn').style.display = '';
  });

  // ── CHANGE PASSWORD ──
  document.getElementById('changePasswordBtn').addEventListener('click', function () {
    var current = document.getElementById('currentPassword').value;
    var newPwd  = document.getElementById('newPassword').value;
    var confirm = document.getElementById('confirmPassword').value;

    if (!current || !newPwd || !confirm) return;
    if (newPwd !== confirm) {
      alert('New passwords do not match.');
      return;
    }

    document.getElementById('securityForm').reset();
  });

  // ── SAVE NOTIFICATIONS ──
  document.getElementById('saveNotificationsBtn').addEventListener('click', function () {
    // Preferences saved (would POST to server in production)
  });

});
