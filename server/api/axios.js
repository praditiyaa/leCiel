const axios = require('axios');

const animeList = axios.create({
  baseURL: 'https://api.myanimelist.net/v2',
  headers: {
    'X-MAL-CLIENT-ID': 'eac2cd2430d883c96280f1c6ea7e8172',
  },
});

const mangadex = axios.create({
  baseURL: 'https://api.mangadex.org',
});

module.exports = { animeList, mangadex };
