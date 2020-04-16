var debounce = require('lodash.debounce');

import { alert, notice, info, success, error } from '@pnotify/core';
import '@pnotify/core/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';

import fetchCountriesApi from './fetchCountries';
import countryListItemsTemplate from '../templates/markup-country.hbs';
import countryList from '../templates/list-country.hbs';

const refs = {
  inputCountryName: document.querySelector('#country-name'),
  indicatedCountry: document.querySelector('.indicated-country'),
};

refs.inputCountryName.addEventListener('input', getСountries);

const getСountries = debounce(e => {
  fetchCountriesApi.fetchCountries(e.target.value).then(respounse => {
    createMarkupCountry(respounse);
  });
  clearListItems();
}, 500);

function createMarkupCountry(items) {
  if (items.length > 1 && items.length < 10) {
    clearListItems();
    const markupCountryList = countryList(items);
    refs.indicatedCountry.insertAdjacentHTML('beforeend', markupCountryList);
    return;
  }
  if (items.length === 1) {
    const markup = countryListItemsTemplate(items);
    refs.indicatedCountry.insertAdjacentHTML('beforeend', markup);
    return;
  }
  error({
    text: 'Too many matches found. Please enter a more specific query!',
  });
}

function clearListItems() {
  refs.indicatedCountry.innerHTML = '';
}
