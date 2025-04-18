const key = "9bd1fca078c46b654329af4ca6eef6b3";

const requests = {
  requestPopular: `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=vi-VN&page=1&append_to_response=imagess,videos`,
  requestTopRated: `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=vi-VN&page=1&append_to_response=imagess,videos`,
  requestTrending: `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=vi-VN&page=2&append_to_response=imagess,videos`,
  requestHorror: `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=vi-VN&query=horror&page=1&include_adult=false&append_to_response=imagess,videos`,
  requestUpcoming: `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=vi-VN&page=1&append_to_response=imagess,videos`,
  detailMovie: `https://api.themoviedb.org/3/movie/343611?api_key=${key}&append_to_response=videos&append_to_response=imagess,videos`,
  getGenres: `https://api.themoviedb.org/3/genre/movie/list?api_key=${key}&language=vi-VN`
};
export default requests;

