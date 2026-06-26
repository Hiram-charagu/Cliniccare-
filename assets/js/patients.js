document.addEventListener('DOMContentLoaded', function () {
  const search = document.querySelector('.search-input');
  const rows = document.querySelectorAll('tbody tr');

  if (!search) {
    return;
  }

  search.addEventListener('input', function () {
    const query = this.value.toLowerCase();
    rows.forEach(function (row) {
      row.style.display = Array.from(row.cells).some(function (cell) {
        return cell.textContent.toLowerCase().includes(query);
      })
        ? ''
        : 'none';
    });
  });
});
