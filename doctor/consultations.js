/* ============================================================
   consultations.js — Consultations page logic
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  // ── SEARCH ──
  document.getElementById('consultSearch').addEventListener('input', function () {
    var q = this.value.toLowerCase();
    document.querySelectorAll('#consultGrid .consultation-card').forEach(function (card) {
      card.classList.toggle('hidden', !card.textContent.toLowerCase().includes(q));
    });
  });

  // ── MODAL ──
  var modal = document.getElementById('newConsultModal');

  document.getElementById('openNewConsult').addEventListener('click', function () {
    modal.classList.add('open');
  });

  document.getElementById('closeNewConsult').addEventListener('click', function () {
    modal.classList.remove('open');
  });

  document.getElementById('cancelNewConsult').addEventListener('click', function () {
    modal.classList.remove('open');
  });

  modal.addEventListener('click', function (e) {
    if (e.target === modal) modal.classList.remove('open');
  });

  document.getElementById('consultForm').addEventListener('submit', function (e) {
    e.preventDefault();
    modal.classList.remove('open');
    this.reset();
  });

});
