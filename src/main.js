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

if (bookingForm) {
  bookingForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const note = bookingForm.querySelector('.form-note');
    note.textContent = 'Thanks. This preview form is ready to connect to your booking/email system.';
  });
}
