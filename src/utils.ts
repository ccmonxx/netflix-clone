/**
 * ๐ป Query Data์ ์ด๋ฏธ์ง๋ฅผ Banner์ ์ ์ฉํ๊ธฐ
 *  Banner : Data๋ฐฐ์ด์ 1๋ฒ์งธ ํญ๋ชฉ์ ๋ณด์ฌ์ฃผ๋ ์ปดํฌ๋ํธ
 *  1. utils.ts - ์ด๋ฏธ์ง๋ฅผ ๋ฐ์์ค๋ ํจ์๋ฅผ ๋ง๋ ๋ค
 *     ์ด๋ฏธ์ง๋ ๋ณธ๋์ ๊ฒฝ๋ก๊ฐ ์๋ ๊ท์น๋๋ก ๋ง๋ค์ด์ง ๊ฒฝ๋ก์ฌ์ผ ํ๋ค(makeImagePath)
 *     ๊ฒฝ๋ก๊ท์น์ image์์ํ๋ URL + backdrop_path
 *  2. custom props๋ฅผ ์ ๋ฌ & ํ์ ์ ์ํ๋ค(bgPhoto ์ด์  ํ๊ธฐ์ํจ)
 *  3. css - ๊ฐ์ํ๊ทธ์ ๋ค๋ฅธ๋ฐฐ๊ฒฝ์ ๊ฐ๋๋ก ๋ช์ํ๋ค
 *  4. ์ด๋ฏธ์ง๋ฅผ ๋ฐ์์ค๋ ํจ์๊ฐ ์ ๋ฌ๋ฐ์ props๊ฐ ์๋ ๊ฒฝ์ฐ๋ฅผ ๋๋นํ๋ค
 *
 *  theMovie Image DB : https://developers.themoviedb.org/3/getting-started/images
 */
const BASE_URL = "https://image.tmdb.org/t/p";

export function makeImagePath(id: string, format?: string) {
	return `${BASE_URL}/${format ? format : "original"}${id}`;
}
