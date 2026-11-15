/* ========== Попап фильтров (catalog) ========== */
const popup = document.querySelector('.popup');
const openPopupBtn = document.querySelector('.catalog__popup');
const closePopupBtn = document.querySelector('.close-popup');
const popupOverlay = document.querySelector('.popup__overlay');

function openPopup() {
  popup.setAttribute('aria-hidden', 'false');
  document.body.classList.add('scroll-lock');
}

function closePopup() {
  popup.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('scroll-lock');
}

if (popup && openPopupBtn) {
  openPopupBtn.addEventListener('click', openPopup);
  if (closePopupBtn) closePopupBtn.addEventListener('click', closePopup);
  if (popupOverlay) popupOverlay.addEventListener('click', closePopup);
}

/* ========== Модальное окно заказа (checkout) ========== */
const modal = document.querySelector('.modal');
const openModalBtn = document.querySelector('.open-modal:not(.catalog__popup)');
const closeModalBtn = document.querySelector('.close-modal');
const modalOverlay = document.querySelector('.modal__overlay');

function openModal() {
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('scroll-lock');
}

function closeModal() {
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('scroll-lock');
}

if (modal) {
  if (openModalBtn) openModalBtn.addEventListener('click', openModal);
  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
  if (modalOverlay) modalOverlay.addEventListener('click', closeModal);
}

/* Escape закрывает то, что открыто */
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  if (popup && popup.getAttribute('aria-hidden') === 'false') closePopup();
  if (modal && modal.getAttribute('aria-hidden') === 'false') closeModal();
});

/* ========== Слайдер на странице товара (только мобильная версия) ========== */
const breakpoint = window.matchMedia('(min-width: 600px)');
let sliderMobile = null;

function initSwiper() {
  sliderMobile = new Swiper('.slider-mobile', {
    loop: true,
    slidesPerView: 1,
    navigation: {
      nextEl: '.product__arrow--next',
      prevEl: '.product__arrow--prev',
    },
  });
}

function destroySwiper() {
  if (sliderMobile) {
    sliderMobile.destroy(true, true);
    sliderMobile = null;
  }
}

function handleBreakpointChange(e) {
  if (e.matches) {
    destroySwiper();
  } else if (!sliderMobile) {
    initSwiper();
  }
}

if (document.querySelector('.slider-mobile')) {
  handleBreakpointChange(breakpoint);
  breakpoint.addEventListener('change', handleBreakpointChange);
}

/* ========== Бургер-меню ========== */
const headerBtn = document.querySelector('.header__btn');
const menu = document.querySelector('.menu');

if (headerBtn && menu) {
  headerBtn.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('menu--active');
    headerBtn.setAttribute('aria-expanded', isOpen);
    document.body.classList.toggle('scroll-lock', isOpen);
  });
}

/* ========== Слайдер отзывов ========== */
if (document.querySelector('.reviews__slider')) {
  new Swiper('.reviews__slider', {
    loop: true,
    slidesPerView: 8,
    spaceBetween: 16,
    navigation: {
      nextEl: '.reviews__arrow--next',
      prevEl: '.reviews__arrow--prev',
    },
    pagination: {
      el: '.reviews__pagination',
      type: 'fraction',
    },
    breakpoints: {
      0: { slidesPerView: 6, spaceBetween: 16 },
      768: { slidesPerView: 8, spaceBetween: 16 },
      1024: { slidesPerView: 12, spaceBetween: 16 },
    },
  });
}

/* ========== Слайдер аксессуаров ========== */
if (document.querySelector('.accessories__slider')) {
  new Swiper('.accessories__slider', {
    loop: true,
    slidesPerView: 3,
    spaceBetween: 40,
    navigation: {
      nextEl: '.accessories__arrow--next',
      prevEl: '.accessories__arrow--prev',
    },
    breakpoints: {
      0: { slidesPerView: 1, spaceBetween: 40 },
      600: { slidesPerView: 2, spaceBetween: 40 },
      930: { slidesPerView: 3, spaceBetween: 40 },
    },
  });
}

/* ========== Переключение вида: сетка / список ========== */
const modeContainer = document.querySelector('.view-mode__container');
const modeBtnGrid = document.querySelector('.view-mode__btn-grid');
const modeBtnLine = document.querySelector('.view-mode__btn-line');

if (modeContainer && modeBtnGrid && modeBtnLine) {
  modeBtnGrid.addEventListener('click', () => {
    modeContainer.classList.add('view-mode__container--grid');
    modeContainer.classList.remove('view-mode__container--line');
  });

  modeBtnLine.addEventListener('click', () => {
    modeContainer.classList.add('view-mode__container--line');
    modeContainer.classList.remove('view-mode__container--grid');
  });
}

/* ========== Ползунок цены ========== */
const rangeSlider = document.querySelector('.range__slider');
const rangeMin = document.querySelector('.range__min');
const rangeMax = document.querySelector('.range__max');

if (rangeSlider && rangeMin && rangeMax) {
  noUiSlider.create(rangeSlider, {
    start: [300, 3000],
    step: 100,
    range: { min: 300, max: 3000 },
    format: {
      to: (value) => Math.round(value),
      from: (value) => Number(value),
    },
  });

  rangeSlider.noUiSlider.on('update', (values) => {
    rangeMin.value = values[0];
    rangeMax.value = values[1];
  });

  rangeMin.addEventListener('change', () => {
    rangeSlider.noUiSlider.set([rangeMin.value, null]);
  });

  rangeMax.addEventListener('change', () => {
    rangeSlider.noUiSlider.set([null, rangeMax.value]);
  });
}