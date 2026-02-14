document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('.sidebar a');
  const currentFile = window.location.pathname.split('/').pop() || 'index.html';
  links.forEach(a => {
    const href = a.getAttribute('href');
    if (!href) return;
    const target = href.split('/').pop();
    if (target === currentFile) {
      a.parentElement.classList.add('active');
    } else {
      a.parentElement.classList.remove('active');
    }
  });
});
