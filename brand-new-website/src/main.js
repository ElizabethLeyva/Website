import './styles.css';

const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  });

  navLinks.addEventListener('click', (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      navLinks.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open menu');
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

const addressInput = document.querySelector('#service-address');

if (addressInput) {
  const addressSuggestions = document.createElement('div');
  addressSuggestions.id = 'address-suggestions';
  addressSuggestions.className = 'address-suggestions';
  addressSuggestions.hidden = true;
  addressInput.closest('label').after(addressSuggestions);

  const serviceLocations = [
    { city: 'Sanford', region: 'Seminole County', zip: '32773' },
    { city: 'Lake Mary', region: 'Seminole County', zip: '32746' },
    { city: 'Longwood', region: 'Seminole County', zip: '32750' },
    { city: 'Winter Springs', region: 'Seminole County', zip: '32708' },
    { city: 'Oviedo', region: 'Seminole County', zip: '32765' },
    { city: 'Orlando', region: 'Orange County', zip: '32801' },
    { city: 'Apopka', region: 'Orange County', zip: '32703' },
    { city: 'Winter Garden', region: 'Orange County', zip: '34787' },
    { city: 'Groveland', region: 'Lake County', zip: '34736' },
    { city: 'Clermont', region: 'Lake County', zip: '34711' },
    { city: 'Leesburg', region: 'Lake County', zip: '34748' },
    { city: 'Haines City', region: 'Polk County', zip: '33844' },
    { city: 'Davenport', region: 'Polk County', zip: '33837' },
    { city: 'Lakeland', region: 'Polk County', zip: '33801' },
    { city: 'Deltona', region: 'Volusia County', zip: '32725' },
    { city: 'DeLand', region: 'Volusia County', zip: '32720' },
    { city: 'Daytona Beach', region: 'Volusia County', zip: '32114' },
    { city: 'Ocala', region: 'Marion County', zip: '34470' },
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
    const hasStreetStart = /^\d+\s*/.test(value);
    const typedCity = value.includes(',') ? value.split(',').pop().trim().toLowerCase() : lowerValue;
    const matchingLocations = serviceLocations
      .filter((location) => {
        const searchable = `${location.city} ${location.region} ${location.zip}`.toLowerCase();
        return searchable.includes(typedCity) || hasStreetStart;
      })
      .slice(0, 7);

    if (!matchingLocations.length) {
      hideAddressSuggestions();
      return;
    }

    addressSuggestions.innerHTML = '';

    matchingLocations.forEach((location) => {
      const title = hasStreetStart && !value.includes(',')
        ? `${value}, ${location.city}, FL ${location.zip}`
        : `${location.city}, FL ${location.zip}`;
      const detail = `${location.region} service area`;
      const button = document.createElement('button');
      button.type = 'button';
      button.innerHTML = `
        <span aria-hidden="true">+</span>
        <span>
          <span class="suggestion-title"></span>
          <span class="suggestion-detail"></span>
        </span>
      `;
      button.querySelector('.suggestion-title').textContent = title;
      button.querySelector('.suggestion-detail').textContent = detail;
      button.addEventListener('click', () => {
        addressInput.value = title;
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
