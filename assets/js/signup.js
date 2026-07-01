document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('signupForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var firstName = document.getElementById('firstName').value.trim();
    var lastName  = document.getElementById('lastName').value.trim();
    var email     = document.getElementById('email').value.trim().toLowerCase();
    var role      = document.getElementById('role').value;

    if (!role) {
      alert('Please select an account type.');
      return;
    }

    localStorage.setItem('cliniccare_user', JSON.stringify({
      name:  firstName + ' ' + lastName,
      email: email,
      role:  role
    }));

    var routes = { doctor: 'doctor/dashboard.html', patient: 'patient/dashboard.html' };
    window.location.href = routes[role] || 'login.html';
  });
});
