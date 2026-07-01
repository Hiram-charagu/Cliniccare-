document.addEventListener('DOMContentLoaded', function () {
  // Password toggle
  var toggle = document.getElementById('passwordToggle');
  var pwInput = document.getElementById('password');
  if (toggle && pwInput) {
    toggle.addEventListener('click', function () {
      var hidden = pwInput.type === 'password';
      pwInput.type = hidden ? 'text' : 'password';
      toggle.textContent = hidden ? 'Hide' : 'Show';
    });
  }

  // Password strength
  var bar   = document.getElementById('pwBar');
  var label = document.getElementById('pwLabel');
  if (pwInput && bar && label) {
    pwInput.addEventListener('input', function () {
      var v = pwInput.value;
      var score = 0;
      if (v.length >= 8) score++;
      if (/[A-Z]/.test(v)) score++;
      if (/[0-9]/.test(v)) score++;
      if (/[^A-Za-z0-9]/.test(v)) score++;
      var levels = [
        { w: '0%',   bg: '#e5e7eb', text: 'Enter a password' },
        { w: '25%',  bg: '#ef4444', text: 'Weak' },
        { w: '50%',  bg: '#f97316', text: 'Fair' },
        { w: '75%',  bg: '#eab308', text: 'Good' },
        { w: '100%', bg: '#22c55e', text: 'Strong' },
      ];
      var l = v.length === 0 ? levels[0] : levels[score];
      bar.style.width = l.w;
      bar.style.background = l.bg;
      label.textContent = l.text;
      label.style.color = l.bg;
    });
  }

  var form = document.getElementById('signupForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var firstName = document.getElementById('firstName').value.trim();
    var lastName  = document.getElementById('lastName').value.trim();
    var email     = document.getElementById('email').value.trim().toLowerCase();
    var role      = document.getElementById('role').value;

    if (!role) { alert('Please select an account type.'); return; }

    localStorage.setItem('cliniccare_user', JSON.stringify({
      name: firstName + ' ' + lastName, email, role
    }));

    var routes = { doctor: 'doctor/dashboard.html', patient: 'patient/dashboard.html' };
    window.location.href = routes[role] || 'login.html';
  });
});
