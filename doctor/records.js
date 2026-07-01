/* ============================================================
   records.js — Doctor Records page logic
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  // ── FILTER TABS ──
  document.querySelectorAll('.record-tab').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.record-tab').forEach(function (b) {
        b.classList.remove('active');
      });
      this.classList.add('active');

      var filter = this.dataset.filter;
      document.querySelectorAll('#recordsGrid .record-card').forEach(function (card) {
        if (filter === 'all') {
          card.classList.remove('hidden');
        } else {
          card.classList.toggle('hidden', card.dataset.status !== filter);
        }
      });
    });
  });

  // ── SEARCH ──
  document.getElementById('recordSearch').addEventListener('input', function () {
    var q = this.value.toLowerCase();
    document.querySelectorAll('#recordsGrid .record-card').forEach(function (card) {
      card.classList.toggle('hidden', !card.textContent.toLowerCase().includes(q));
    });
  });

  // ── UPLOAD MODAL ──
  var modal = document.getElementById('uploadModal');

  document.getElementById('openUploadModal').addEventListener('click', function () {
    modal.classList.add('open');
  });

  document.getElementById('closeUploadModal').addEventListener('click', function () {
    modal.classList.remove('open');
  });

  document.getElementById('cancelUpload').addEventListener('click', function () {
    modal.classList.remove('open');
  });

  modal.addEventListener('click', function (e) {
    if (e.target === modal) modal.classList.remove('open');
  });

  document.getElementById('uploadForm').addEventListener('submit', function (e) {
    e.preventDefault();
    modal.classList.remove('open');
    this.reset();
  });

});
