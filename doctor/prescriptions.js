/* ============================================================
   prescriptions.js — Prescriptions page logic
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  // ── FILTER TABS ──
  document.querySelectorAll('.rx-tab').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.rx-tab').forEach(function (b) {
        b.classList.remove('active');
      });
      this.classList.add('active');

      var filter = this.dataset.filter;
      document.querySelectorAll('#rxGrid .prescription-card').forEach(function (card) {
        if (filter === 'all') {
          card.classList.remove('hidden');
        } else {
          card.classList.toggle('hidden', card.dataset.status !== filter);
        }
      });
    });
  });

  // ── SEARCH ──
  document.getElementById('rxSearch').addEventListener('input', function () {
    var q = this.value.toLowerCase();
    document.querySelectorAll('#rxGrid .prescription-card').forEach(function (card) {
      card.classList.toggle('hidden', !card.textContent.toLowerCase().includes(q));
    });
  });

  // ── MODAL ──
  var modal = document.getElementById('newRxModal');

  document.getElementById('openNewRx').addEventListener('click', function () {
    modal.classList.add('open');
  });

  document.getElementById('closeNewRx').addEventListener('click', function () {
    modal.classList.remove('open');
  });

  document.getElementById('cancelNewRx').addEventListener('click', function () {
    modal.classList.remove('open');
  });

  modal.addEventListener('click', function (e) {
    if (e.target === modal) modal.classList.remove('open');
  });

  document.getElementById('rxForm').addEventListener('submit', function (e) {
    e.preventDefault();
    modal.classList.remove('open');
    this.reset();
  });

});
