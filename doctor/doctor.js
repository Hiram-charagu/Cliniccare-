// Doctor Portal — auth guard + user injection
document.addEventListener('DOMContentLoaded', function () {
  import('../assets/js/firebase.js').then(function (firebase) {
    firebase.useSessionPersistence().then(function () {
      firebase.auth.onAuthStateChanged(async function (user) {
        if (!user) { window.location.replace('../login.html'); return; }
        var profile = await firebase.ensureUserProfile(user);
        if (!profile || profile.role !== 'doctor') {
          window.location.replace(firebase.getPortalRoute(profile && profile.role));
          return;
        }

        var name = profile.name || user.displayName || 'Doctor';
        var email = profile.email || user.email || '';
        var initials = (name.trim().split(' ').map(function (p) { return p[0]; }).join('')).toUpperCase().slice(0, 2);
        var first = name.trim().split(' ')[0];
        var h = new Date().getHours();
        var greet = 'Good ' + (h < 12 ? 'morning' : h < 17 ? 'afternoon' : 'evening') + ', ' + name;

        document.querySelectorAll('[data-cc-name]').forEach(function (el) { el.textContent = name; });
        document.querySelectorAll('[data-cc-name-input]').forEach(function (el) { el.value = name; });
        document.querySelectorAll('[data-cc-first]').forEach(function (el) { el.textContent = first; });
        document.querySelectorAll('[data-cc-initials]').forEach(function (el) { el.textContent = initials; });
        document.querySelectorAll('[data-cc-greeting]').forEach(function (el) { el.textContent = greet; });
        document.querySelectorAll('[data-cc-email]').forEach(function (el) {
          if (el.tagName === 'INPUT') el.value = email;
          else el.textContent = email;
        });

        document.querySelectorAll('.logout').forEach(function (a) {
          a.addEventListener('click', function (e) {
            e.preventDefault();
            firebase.signOutUser().finally(function () {
              window.location.href = '../login.html';
            });
          });
        });
      });
    });
  });
});
