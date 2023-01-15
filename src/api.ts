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
 * 🔻 Query(getMovies)로 응답(전달)받은 Data의 타입을 정의하기
 *  1. 웹브라우저 주소창에 쿼리를 입력하여 Data를 확인한다
 *  2. 사용할 데이터의 형식에 맞게 타입을 정의한다(객체 내부의 배열,객체 확인)
 *  3. 사용될 컴포넌트의 useQuery에 적용한다
 *
 *  Movie DB API : https://developers.themoviedb.org/3
 */
export function getMovies() {
	return fetch(
		`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`
	).then((response) => response.json());
}
