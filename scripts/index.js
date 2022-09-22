import Swiper from '../lib/swiper-bundle.esm.browser.min.js';

// simplebar

new SimpleBar(
  document.querySelector('.country__list', {
    classNames: {
      scrollbar: 'country__scrollbar',
      track: 'country__track',
    },
  }),
);

// slider

new Swiper('.goods__block', {
  slidesPerView: 1,
  spaceBetween: 20,
  loop: true,
  breakpoints: {
    320: {
      slidesPerView: 1,
    },

    768: {
      slidesPerView: 2,
    },

    1024: {
      slidesPerView: 2,
      spaceBetween: 20,
    },

    1200: {
      slidesPerView: 2,
      spaceBetween: 20,
    },

    1440: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
  },

  navigation: {
    nextEl: '.goods__arrow-next',
    prevEl: '.goods__arrow-prev',
  },

  preventClicks: true,
  a11y: false,
});

//  modal

const productMore = document.querySelectorAll('.product__more');
const modal = document.querySelector('.modal');

const closeModal = (event) => {
  if (
    (event.type === 'keyup' && event.key === 'Escape') ||
    (event.type === 'click' && event.target === modal)
  ) {
    modal.classList.remove('modal-open');
    window.removeEventListener('keyup', closeModal);
  }
};

productMore.forEach((btn) => {
  btn.addEventListener('click', () => {
    modal.classList.add('modal-open');
    window.addEventListener('keyup', closeModal);
  });
});

modal.addEventListener('click', closeModal);

const formPlaceHolder = document.querySelectorAll('.form__placeholder');
const formInput = document.querySelectorAll('.form__input');

formInput.forEach((input, i) => {
  input.addEventListener('focus', () => {
    formPlaceHolder[i].classList.add('form__placeholder-active');
  });

  input.addEventListener('blur', () => {
    if (input.value === '') {
      formPlaceHolder[i].classList.remove('form__placeholder-active');
    }
  });
});

// currency

const dataCurrency = {};

const formatCurrency = (value, currency) => {
  return Intl.NumberFormat('EUR', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  }).format(value);
};

const showPrice = (currency = 'USD') => {
  const priceElems = document.querySelectorAll('[data-price]');
  priceElems.forEach((elem) => {
    elem.textContent = formatCurrency(
      elem.dataset.price * dataCurrency[currency],
      currency,
    );
  });
};

const myHeaders = new Headers();
myHeaders.append('apikey', '.vWnI1llXinkQgvtUgLqjVgV0LrWWcd87');

const requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders,
};

fetch('https://api.apilayer.com/fixer/latest?base=USD', requestOptions)
  .then((response) => response.json())
  .then((result) => {
    Object.assign(dataCurrency, result.rates);
    showPrice();
  })
  .catch((error) => console.log('error', error));

//  choises

const countryBtn = document.querySelector('.country__btn');
const countryWrapper = document.querySelector('.country__wrapper');

countryBtn.addEventListener('click', () => {
  countryWrapper.classList.toggle('country__wrapper-open');
});

countryWrapper.addEventListener('click', ({ target }) => {
  if (target.classList.contains('country__choise')) {
    countryBtn.textContent = target.dataset.currency;
    countryWrapper.classList.remove('country__wrapper-open');
  }
  showPrice(target.dataset.currency);
});
