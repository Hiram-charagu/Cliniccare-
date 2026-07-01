/* ============================================================
   patients.js — My Patients page logic
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  // ── FILTER TABS ──
  document.querySelectorAll('.patient-tab').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.patient-tab').forEach(function (b) {
        b.classList.remove('active');
      });
      this.classList.add('active');

      var filter = this.dataset.filter;
      document.querySelectorAll('#patientTable tr').forEach(function (row) {
        if (filter === 'all') {
          row.classList.remove('hidden');
        } else {
          row.classList.toggle('hidden', row.dataset.status !== filter);
        }
      });
    });
  });

  // ── SEARCH ──
  document.getElementById('patientSearch').addEventListener('input', function () {
    var q = this.value.toLowerCase();
    document.querySelectorAll('#patientTable tr').forEach(function (row) {
      row.classList.toggle('hidden', !row.textContent.toLowerCase().includes(q));
    });
  });

  // ── ADD PATIENT MODAL ──
  var modal = document.getElementById('addPatientModal');

  document.getElementById('addPatientBtn').addEventListener('click', function () {
    modal.classList.add('open');
  });

  document.getElementById('closeAddPatient').addEventListener('click', function () {
    modal.classList.remove('open');
  });

  document.getElementById('cancelAddPatient').addEventListener('click', function () {
    modal.classList.remove('open');
  });

  modal.addEventListener('click', function (e) {
    if (e.target === modal) modal.classList.remove('open');
  });

  document.getElementById('addPatientForm').addEventListener('submit', function (e) {
    e.preventDefault();
    modal.classList.remove('open');
    this.reset();
  });

});
