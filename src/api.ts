export const API_KEY = "e77cc2dddb770f38fb838651d00ec9b1";
export const BASE_PATH = "https://api.themoviedb.org/3";

export function getMovies() {
	return fetch(
		`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`
	).then((response) => response.json());
}
