/* ============================================================
   appointments.js — Doctor Appointments page logic
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  // ── FILTER TABS ──
  document.querySelectorAll('.appt-tab').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.appt-tab').forEach(function (b) {
        b.classList.remove('active');
      });
      this.classList.add('active');

      var filter = this.dataset.filter;
      document.querySelectorAll('#apptTable tr').forEach(function (row) {
        if (filter === 'all') {
          row.classList.remove('hidden');
        } else {
          row.classList.toggle('hidden', row.dataset.status !== filter);
        }
      });
    });
  });

  // ── SEARCH ──
  document.getElementById('apptSearch').addEventListener('input', function () {
    var q = this.value.toLowerCase();
    document.querySelectorAll('#apptTable tr').forEach(function (row) {
      row.classList.toggle('hidden', !row.textContent.toLowerCase().includes(q));
    });
  });

  // ── MODAL ──
  var modal = document.getElementById('bookModal');

  document.getElementById('openBookModal').addEventListener('click', function () {
    modal.classList.add('open');
  });

  document.getElementById('closeBookModal').addEventListener('click', function () {
    modal.classList.remove('open');
  });

  document.getElementById('cancelBookModal').addEventListener('click', function () {
    modal.classList.remove('open');
  });

  modal.addEventListener('click', function (e) {
    if (e.target === modal) modal.classList.remove('open');
  });

  document.getElementById('bookForm').addEventListener('submit', function (e) {
    e.preventDefault();
    modal.classList.remove('open');
    this.reset();
  });

});
