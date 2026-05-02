import './styles.css';

const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

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

const dealCarousel = document.querySelector('.offer');

if (dealCarousel) {
  const track = dealCarousel.querySelector('.deal-track');
  const slides = [...dealCarousel.querySelectorAll('.deal-slide')];
  const previousButton = dealCarousel.querySelector('.deal-control.prev');
  const nextButton = dealCarousel.querySelector('.deal-control.next');
  const dots = dealCarousel.querySelector('.deal-dots');
  let activeIndex = 0;
  let autoAdvance;

  slides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', `Show deal ${index + 1}`);
    dot.addEventListener('click', () => {
      setActiveDeal(index);
      restartDealAutoAdvance();
    });
    dots.append(dot);
  });

  const dotButtons = [...dots.querySelectorAll('button')];

  function setActiveDeal(index) {
    activeIndex = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${activeIndex * 100}%)`;

    dotButtons.forEach((dot, dotIndex) => {
      dot.classList.toggle('is-active', dotIndex === activeIndex);
      dot.setAttribute('aria-current', dotIndex === activeIndex ? 'true' : 'false');
    });
  }

  function showNextDeal() {
    setActiveDeal(activeIndex + 1);
  }

  function showPreviousDeal() {
    setActiveDeal(activeIndex - 1);
  }

  function restartDealAutoAdvance() {
    window.clearInterval(autoAdvance);
    autoAdvance = window.setInterval(showNextDeal, 5200);
  }

  previousButton.addEventListener('click', () => {
    showPreviousDeal();
    restartDealAutoAdvance();
  });

  nextButton.addEventListener('click', () => {
    showNextDeal();
    restartDealAutoAdvance();
  });

  dealCarousel.addEventListener('mouseenter', () => window.clearInterval(autoAdvance));
  dealCarousel.addEventListener('mouseleave', restartDealAutoAdvance);

  setActiveDeal(0);
  restartDealAutoAdvance();
}

const carousel = document.querySelector('.review-carousel');

if (carousel) {
  const track = carousel.querySelector('.review-track');
  const cards = [...carousel.querySelectorAll('.review-card')];
  const previousButton = carousel.querySelector('.review-control.prev');
  const nextButton = carousel.querySelector('.review-control.next');
  const dots = carousel.querySelector('.review-dots');
  let activeIndex = 0;
  let autoAdvance;

  const getCardsPerView = () => (window.matchMedia('(max-width: 900px)').matches ? 1 : 3);
  const getMaxIndex = () => Math.max(0, cards.length - getCardsPerView());

  cards.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', `Show review ${index + 1}`);
    dot.addEventListener('click', () => {
      setActiveReview(index);
      restartAutoAdvance();
    });
    dots.append(dot);
  });

  const dotButtons = [...dots.querySelectorAll('button')];

  function setActiveReview(index) {
    activeIndex = Math.min(Math.max(index, 0), getMaxIndex());
    const offset = cards[activeIndex].offsetLeft;
    track.style.transform = `translateX(-${offset}px)`;

    dotButtons.forEach((dot, dotIndex) => {
      dot.classList.toggle('is-active', dotIndex === activeIndex);
      dot.setAttribute('aria-current', dotIndex === activeIndex ? 'true' : 'false');
    });
  }

  function showNextReview() {
    const nextIndex = activeIndex >= getMaxIndex() ? 0 : activeIndex + 1;
    setActiveReview(nextIndex);
  }

  function showPreviousReview() {
    const previousIndex = activeIndex <= 0 ? getMaxIndex() : activeIndex - 1;
    setActiveReview(previousIndex);
  }

  function restartAutoAdvance() {
    window.clearInterval(autoAdvance);
    autoAdvance = window.setInterval(showNextReview, 5200);
  }

  previousButton.addEventListener('click', () => {
    showPreviousReview();
    restartAutoAdvance();
  });

  nextButton.addEventListener('click', () => {
    showNextReview();
    restartAutoAdvance();
  });

  carousel.addEventListener('mouseenter', () => window.clearInterval(autoAdvance));
  carousel.addEventListener('mouseleave', restartAutoAdvance);
  window.addEventListener('resize', () => setActiveReview(activeIndex));

  setActiveReview(0);
  restartAutoAdvance();
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

const addressInput = document.querySelector('#service-address');

if (addressInput) {
  const addressSuggestions = document.createElement('div');
  addressSuggestions.id = 'address-suggestions';
  addressSuggestions.className = 'address-suggestions';
  addressSuggestions.hidden = true;
  addressInput.after(addressSuggestions);

  const serviceCities = [
    'Sanford, FL 32773',
    'Lake Mary, FL',
    'Longwood, FL',
    'Winter Springs, FL',
    'Oviedo, FL',
    'Orlando, FL',
    'Apopka, FL',
    'Winter Garden, FL',
    'Groveland, FL',
    'Clermont, FL',
    'Leesburg, FL',
    'Haines City, FL',
    'Davenport, FL',
    'Lakeland, FL',
    'Deltona, FL',
    'DeLand, FL',
    'Daytona Beach, FL',
    'Ocala, FL',
  ];

  function hideAddressSuggestions() {
    addressSuggestions.hidden = true;
    addressInput.setAttribute('aria-expanded', 'false');
  }

  function showAddressSuggestions() {
    const value = addressInput.value.trim();

    if (value.length < 2) {
      hideAddressSuggestions();
      return;
    }

    const lowerValue = value.toLowerCase();
    const hasStreetNumber = /^\d/.test(value);
    const suggestions = serviceCities
      .filter((city) => city.toLowerCase().includes(lowerValue) || hasStreetNumber)
      .slice(0, 7)
      .map((city) => (hasStreetNumber && !value.includes(',') ? `${value}, ${city}` : city));

    if (!suggestions.length) {
      hideAddressSuggestions();
      return;
    }

    addressSuggestions.innerHTML = '';

    suggestions.forEach((suggestion) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = suggestion;
      button.addEventListener('click', () => {
        addressInput.value = suggestion;
        hideAddressSuggestions();
        addressInput.focus();
      });
      addressSuggestions.append(button);
    });

    addressSuggestions.hidden = false;
    addressInput.setAttribute('aria-expanded', 'true');
  }

  addressInput.addEventListener('input', showAddressSuggestions);
  addressInput.addEventListener('focus', showAddressSuggestions);
  addressInput.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      hideAddressSuggestions();
    }
  });

  document.addEventListener('click', (event) => {
    if (!addressInput.contains(event.target) && !addressSuggestions.contains(event.target)) {
      hideAddressSuggestions();
    }
  });
}
