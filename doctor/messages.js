/* ============================================================
   messages.js — Doctor Messages page logic
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  var threads = {
    john:  { sender: 'John Doe',      date: 'Today',   avatar: 'JD' },
    amina: { sender: 'Amina Patel',   date: 'Yesterday', avatar: 'AP' },
    clinic: { sender: 'Clinic Admin', date: 'Jun 30',  avatar: 'CL' },
    lab:   { sender: 'Lab Team',      date: 'Jun 28',  avatar: 'LB' }
  };

  // ── INBOX SWITCHING ──
  document.querySelectorAll('.inbox-item').forEach(function (item) {
    item.addEventListener('click', function () {
      document.querySelectorAll('.inbox-item').forEach(function (i) {
        i.classList.remove('active');
      });
      this.classList.add('active');
      this.querySelector('.unread-dot') && (this.querySelector('.unread-dot').style.display = 'none');

      var key = this.dataset.msg;
      var thread = threads[key];

      document.getElementById('threadSender').textContent = thread.sender;
      document.getElementById('threadDate').textContent   = thread.date;
      document.getElementById('threadAvatar').textContent = thread.avatar;

      document.querySelectorAll('.message-bubble').forEach(function (b) {
        b.classList.add('hidden');
      });
      var el = document.getElementById('msg-' + key);
      if (el) el.classList.remove('hidden');
    });
  });

  // ── SEND REPLY ──
  document.getElementById('sendReply').addEventListener('click', function () {
    var text = document.getElementById('replyText').value.trim();
    if (!text) return;

    var bubble = document.createElement('div');
    bubble.className = 'message-bubble sent';
    bubble.innerHTML = '<p>' + text + '</p><span class="msg-time">Just now</span>';
    document.getElementById('threadBody').appendChild(bubble);
    document.getElementById('replyText').value = '';
    document.getElementById('threadBody').scrollTop = 99999;
  });

  // ── SEARCH ──
  document.getElementById('msgSearch').addEventListener('input', function () {
    var q = this.value.toLowerCase();
    document.querySelectorAll('.inbox-item').forEach(function (item) {
      item.style.display = item.textContent.toLowerCase().includes(q) ? '' : 'none';
    });
  });

  // ── COMPOSE MODAL ──
  var modal = document.getElementById('composeModal');

  document.getElementById('openComposeModal').addEventListener('click', function () {
    modal.classList.add('open');
  });

  document.getElementById('closeComposeModal').addEventListener('click', function () {
    modal.classList.remove('open');
  });

  document.getElementById('cancelCompose').addEventListener('click', function () {
    modal.classList.remove('open');
  });

  modal.addEventListener('click', function (e) {
    if (e.target === modal) modal.classList.remove('open');
  });

  document.getElementById('composeForm').addEventListener('submit', function (e) {
    e.preventDefault();
    modal.classList.remove('open');
    this.reset();
  });

});
