/**
 * 🔻 Query Data의 이미지를 Banner에 적용하기
 *  Banner : Data배열의 1번째 항목을 보여주는 컴포넌트
 *  1. utils.ts - 이미지를 받아오는 함수를 만든다
 *     이미지는 본래의 경로가 아닌 규칙대로 만들어진 경로여야 한다(makeImagePath)
 *     경로규칙은 image시작하는 URL + backdrop_path
 *  2. custom props를 전달 & 타입 정의한다(bgPhoto 이전 하기위함)
 *  3. css - 같은태그에 다른배경을 갖도록 명시힌다
 *  4. 이미지를 받아오는 함수가 전달받은 props가 없는 경우를 대비한다
 *
 *  theMovie Image DB : https://developers.themoviedb.org/3/getting-started/images
 */
const BASE_URL = "https://image.tmdb.org/t/p";

export function makeImagePath(id: string, format?: string) {
	return `${BASE_URL}/${format ? format : "original"}${id}`;
}
