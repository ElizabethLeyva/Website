import './styles.css';

const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.addEventListener('click', (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      navLinks.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

const bookingForm = document.querySelector('.booking-form');
const submissionModal = document.querySelector('.submission-modal');
const modalClose = document.querySelector('.modal-close');

if (bookingForm && submissionModal && modalClose) {
  bookingForm.addEventListener('submit', () => {
    window.setTimeout(() => {
      submissionModal.hidden = false;
      modalClose.focus();
      bookingForm.reset();
    }, 650);
  });

  modalClose.addEventListener('click', () => {
    submissionModal.hidden = true;
  });

  submissionModal.addEventListener('click', (event) => {
    if (event.target === submissionModal) {
      submissionModal.hidden = true;
    }
  });
}

const galleryImages = [...document.querySelectorAll('.full-gallery img')];

if (galleryImages.length) {
  const lightbox = document.createElement('div');
  lightbox.className = 'gallery-lightbox';
  lightbox.hidden = true;
  lightbox.innerHTML = `
    <div class="gallery-lightbox-inner" role="dialog" aria-modal="true" aria-label="Expanded gallery photo">
      <button type="button">Close</button>
      <img src="" alt="" />
    </div>
  `;

  document.body.append(lightbox);

  const lightboxImage = lightbox.querySelector('img');
  const closeButton = lightbox.querySelector('button');

  function openLightbox(image) {
    lightboxImage.src = image.currentSrc || image.src;
    lightboxImage.alt = image.alt;
    lightbox.hidden = false;
    closeButton.focus();
  }

  function closeLightbox() {
    lightbox.hidden = true;
    lightboxImage.src = '';
  }

  galleryImages.forEach((image) => {
    image.addEventListener('click', () => openLightbox(image));
    image.setAttribute('tabindex', '0');
    image.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openLightbox(image);
      }
    });
  });

  closeButton.addEventListener('click', closeLightbox);

  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !lightbox.hidden) {
      closeLightbox();
    }
  });
}
