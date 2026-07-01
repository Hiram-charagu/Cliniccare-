var users = [
  { email: 'admin@cliniccare.com',   password: 'admin123',   name: 'Admin User',      role: 'admin',   route: 'admin/dashboard.html'   },
  { email: 'doctor@cliniccare.com',  password: 'doctor123',  name: 'Dr. Emily Chen',  role: 'doctor',  route: 'doctor/dashboard.html'  },
  { email: 'patient@cliniccare.com', password: 'patient123', name: 'John Doe',        role: 'patient', route: 'patient/dashboard.html' },
];

document.addEventListener('DOMContentLoaded', function () {
  // If already logged in, redirect straight to their portal
  var existing = localStorage.getItem('cliniccare_user');
  if (existing) {
    try {
      var u = JSON.parse(existing);
      if (u && u.role) {
        var routes = { admin: 'admin/dashboard.html', doctor: 'doctor/dashboard.html', patient: 'patient/dashboard.html' };
        if (routes[u.role]) { window.location.href = routes[u.role]; return; }
      }
    } catch (e) { localStorage.removeItem('cliniccare_user'); }
  }

  var form          = document.getElementById('loginForm');
  var passwordInput = document.getElementById('password');
  var toggle        = document.getElementById('passwordToggle');

  if (toggle && passwordInput) {
    toggle.addEventListener('click', function () {
      var hidden = passwordInput.type === 'password';
      passwordInput.type = hidden ? 'text' : 'password';
      toggle.textContent  = hidden ? 'Hide' : 'Show';
    });
  }

  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var email = document.getElementById('email').value.trim().toLowerCase();
    var pass  = passwordInput.value;
    var user  = users.find(function (u) { return u.email === email && u.password === pass; });

    if (!user) {
      showError('Incorrect email or password. Please try again.');
      return;
    }

    localStorage.setItem('cliniccare_user', JSON.stringify({ name: user.name, email: user.email, role: user.role }));
    window.location.href = user.route;
  });
});

function showError(msg) {
  var el = document.getElementById('errorMessage');
  if (!el) return;
  el.textContent = msg;
  el.hidden = false;
}
