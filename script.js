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

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const triggers = document.querySelectorAll('.lightbox-trigger');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');

let currentIndex = -1;

// Open lightbox
function openLightbox(index) {
  const trigger = triggers[index];
  const imgSrc = trigger.getAttribute('href');
  const caption = trigger.getAttribute('data-caption') || '';

  currentIndex = index;
  lightboxImg.src = imgSrc;
  lightboxCaption.textContent = caption;
  lightbox.classList.remove('hidden');
  lightbox.classList.add('show');
}

// Close lightbox
function closeLightbox() {
  lightbox.classList.add('hidden');
  lightbox.classList.remove('show');
  lightboxImg.src = '';
  lightboxCaption.textContent = '';
  currentIndex = -1;
}

// Navigation
function showNext() {
  if (currentIndex < triggers.length - 1) {
    openLightbox(currentIndex + 1);
  }
}
function showPrev() {
  if (currentIndex > 0) {
    openLightbox(currentIndex - 1);
  }
}

// Click triggers
triggers.forEach((trigger, index) => {
  trigger.addEventListener('click', (e) => {
    e.preventDefault();
    openLightbox(index);
  });
});

document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
document.getElementById('overlay').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

// Navigation buttons
nextBtn.addEventListener('click', showNext);
prevBtn.addEventListener('click', showPrev);

// Keyboard support
document.addEventListener('keydown', (e) => {
  if (lightbox.classList.contains('hidden')) return;

  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') showNext();
  if (e.key === 'ArrowLeft') showPrev();
});