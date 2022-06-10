const API_KEY = 'dfdf0b6612d100978455295b22cc7edc';
const API_URL = 'https://api.themoviedb.org/3';
const CONFIGURATION_URL = 'https://api.themoviedb.org/3/configuration?api_key=';
const IMAGES_PATH = 'https://image.tmdb.org/t/p/';

const MOVIES_PATH = [
  {name: 'Popular', url: '/movie/popular'},
  {name: 'Top Rated', url: '/movie/top_rated'},
  {name: 'Upcoming', url: '/movie/upcoming'},
  {name: 'Now Playing', url: '/movie/npw_playing'},
];

export {API_KEY, API_URL, CONFIGURATION_URL, MOVIES_PATH, IMAGES_PATH};
