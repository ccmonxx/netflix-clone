export const API_KEY = "e77cc2dddb770f38fb838651d00ec9b1";
export const BASE_PATH = "https://api.themoviedb.org/3";

export interface IGetMoviesResult {
	dates: {
		maximum: string;
		minimum: string;
	};
	page: number;
	results: IMovie[];
	total_pages: number;
	total_results: number;
}
interface IMovie {
	id: number;
	title: string;
	overview: string;
	poster_path: string;
	backdrop_path: string;
}
/**
 * ๐ป Query(getMovies)๋ก ์๋ต(์ ๋ฌ)๋ฐ์ Data์ ํ์์ ์ ์ํ๊ธฐ
 *  1. ์น๋ธ๋ผ์ฐ์  ์ฃผ์์ฐฝ์ ์ฟผ๋ฆฌ๋ฅผ ์๋ ฅํ์ฌ Data๋ฅผ ํ์ธํ๋ค
 *  2. ์ฌ์ฉํ  ๋ฐ์ดํฐ์ ํ์์ ๋ง๊ฒ ํ์์ ์ ์ํ๋ค(๊ฐ์ฒด ๋ด๋ถ์ ๋ฐฐ์ด,๊ฐ์ฒด ํ์ธ)
 *  3. ์ฌ์ฉ๋  ์ปดํฌ๋ํธ์ useQuery์ ์ ์ฉํ๋ค
 *
 *  Movie DB API : https://developers.themoviedb.org/3
 */
export function getMovies() {
	return fetch(
		`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`
	).then((response) => response.json());
}
