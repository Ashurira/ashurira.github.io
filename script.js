document.addEventListener('DOMContentLoaded', () => {
  // Hamburger Menu
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  const overlay = document.getElementById('overlay');

  hamburger.addEventListener('click', () => {
    const isOpen = navMenu.classList.contains('show');
    navMenu.classList.toggle('show');
    overlay.classList.toggle('hidden');
    hamburger.classList.toggle('active');
    document.body.style.overflow = isOpen ? 'auto' : 'hidden';
  });

  overlay.addEventListener('click', () => {
    navMenu.classList.remove('show');
    overlay.classList.add('hidden');
    hamburger.classList.remove('active');
    document.body.style.overflow = 'auto';
  });

  // Lightbox
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxCounter = document.getElementById('lightbox-counter');
  const triggers = document.querySelectorAll('.lightbox-trigger');
  const nextBtn = document.getElementById('nextBtn');
  const prevBtn = document.getElementById('prevBtn');
  const closeBtn = document.getElementById('lightbox-close');

  let currentIndex = -1;

  // Open Lightbox
  function openLightbox(index) {
    currentIndex = index;
    const imgSrc = triggers[index].getAttribute('href');
    const captionText = triggers[index].getAttribute('data-caption');

    lightboxImg.src = imgSrc;
    lightboxCaption.textContent = captionText;

    if (lightboxCounter) {
      lightboxCounter.textContent = `${index + 1} / ${triggers.length}`;
    }

    lightbox.classList.remove('hidden');
    lightbox.classList.add('show');

    preloadAdjacentImages(index);
  }

  // Close Lightbox
  function closeLightbox() {
    lightbox.classList.add('hidden');
    lightbox.classList.remove('show');
    lightboxImg.src = '';
    lightboxCaption.textContent = '';
    if (lightboxCounter) lightboxCounter.textContent = '';
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

  // Preload adjacent images
  function preloadAdjacentImages(index) {
    [index - 1, index + 1].forEach(i => {
      if (triggers[i]) {
        const preloadSrc = triggers[i].getAttribute('href');
        const img = new Image();
        img.src = preloadSrc;
      }
    });
  }

  // Click triggers
  triggers.forEach((trigger, index) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      openLightbox(index);
    });
  });

  // Close on overlay click or X
  closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Next / Prev buttons
  nextBtn.addEventListener('click', showNext);
  prevBtn.addEventListener('click', showPrev);

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('hidden')) return;

    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
  });

  // Swipe support
  let startX = 0;
  lightbox.addEventListener('touchstart', (e) => {
    startX = e.changedTouches[0].screenX;
  });

  lightbox.addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].screenX;
    const diff = startX - endX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) showNext(); // swipe left
      else showPrev();          // swipe right
    }
  });
});