const baseUrl = 'https://restcountries.eu/rest/v2/name/';
export default {
  fetchCountries(searchQuery) {
    const requestParams = `${searchQuery}`;
    return fetch(baseUrl + requestParams)
      .then(res => res.json())
  },
};
