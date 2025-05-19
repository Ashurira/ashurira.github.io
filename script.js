const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const overlay = document.getElementById('overlay');

// Open/close toggle
hamburger.addEventListener('click', () => {
  const isOpen = navMenu.classList.contains('show');

  navMenu.classList.toggle('show');
  overlay.classList.toggle('hidden');
  hamburger.classList.toggle('active');

  // Optional: Prevent scroll when menu open
  document.body.style.overflow = isOpen ? 'auto' : 'hidden';
});

// Also close when overlay is clicked
overlay.addEventListener('click', () => {
  navMenu.classList.remove('show');
  overlay.classList.add('hidden');
  hamburger.classList.remove('active');
  document.body.style.overflow = 'auto';
});