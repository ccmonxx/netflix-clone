import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { getMovies, IGetMoviesResult } from "../api";
import { makeImagePath } from "../utils";
import { useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";

const Wrapper = styled.div`
	background: black;
	padding-bottom: 200px;
`;

const Loader = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 20vh;
`;

const Banner = styled.div<{ $bgPhoto: string }>`
	display: flex;
	justify-content: center;
	flex-direction: column;
	height: 100vh;
	padding: 60px;
	background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
		url(${(props) => props.$bgPhoto});
	background-size: cover;
`;

const Title = styled.h2`
	margin-bottom: 20px;
	font-size: 68px;
`;

const Overview = styled.p`
	width: 50%;
	font-size: 30px;
`;

const Slider = styled.div`
	position: relative;
	top: -100px;
`;

const Row = styled(motion.div)`
	display: grid;
	position: absolute;
	grid-template-columns: repeat(6, 1fr);
	width: 100%;
	gap: 5px;
`;

const Box = styled(motion.div)<{ $bgPhoto: string }>`
	height: 200px;
	background-image: url(${(props) => props.$bgPhoto});
	background-position: center center;
	background-size: cover;
	background-color: white;
	font-size: 50px;
	&:first-child {
		transform-origin: center left;
	}
	&:last-child {
		transform-origin: center right;
	}
`;

const Info = styled(motion.div)`
	position: absolute;
	width: 100%;
	bottom: 0;
	padding: 10px;
	background-color: ${(props) => props.theme.black.lighter};
	opacity: 0;
	h4 {
		text-align: center;
		font-size: 18px;
	}
`;

const rowVariants = {
	hidden: {
		x: window.outerWidth - 5,
	},
	visible: {
		x: 0,
	},
	exit: {
		x: -window.outerWidth + 5,
	},
};

const boxVariants = {
	normal: {
		scale: 1,
	},
	hover: {
		y: -80,
		scale: 1.3,
		transition: {
			delay: 0.5,
			duaration: 0.3,
			type: "tween",
		},
	},
};

const infoVariants = {
	hover: {
		opacity: 1,
		transition: {
			delay: 0.5,
			duaration: 0.1,
			type: "tween",
		},
	},
};

/**
 * 🔻 1 Slider - 6 Box Layout & input Data
 *  - offset : 1 Slider당 보여줄 movie의 갯수
 *  - index  : 스크롤 이동 버튼을 클릭할 떄마다 1씩 증가
 *  - overflow-x:hidden : 스크롤바(x축) 비활성화
 *
 *  # custom props Error
 *  - 대문자 혹은 어떠한 이유로 스타일컴포넌트의 props가 DOM으로 전달되지 않아 발생하는 에러
 *  - $ 를 props의 내부값 앞에 표기해준다
 *
 *  1. Box Component
 *  slice 1 → 배너 moive 제외한다
 *  slice 2 → 슬라이드 실행 후 다음 데이터의 순서를 만든다(offset * index + offset)
 *  map     → 컴포넌트로 데이터를 전달한다
 *  bgPhoto → 컴포넌트의 속성으로 이미지를 저장 & 타입스크립트 정의는 styled-components에서 한다
 *
 *  2. 마지막 슬라이드 이후 첫 슬라이드로 이동
 *  - totleMoives : 데이터의 총 갯수
 *  - maxIndex    : 데이터의 총 갯수를 6으로 나누고 내림(정수)
 */
const offset = 6;

function Home() {
	/**
	 *  🔻 Box컴포넌트를 클릭하면 새로운 레이아웃의 컴포넌트를 보여주기
	 *  1. onBoxClicked : 파라미터로 movieId를 갖는 클릭이벤트 함수를 Box에 적용한다
	 *  2. useHistory   : push기능으로 클릭한 컴포넌트에 movieId를 추가한 경로를 만들어준다
	 *  3. useRouteMatch   : 설정한 경로의 데이터 정보를(객체타입) 갖는다
	 *  4. AnimatePresence : 애니메이션 컴포넌트 만들기
	 *  5. layoutId        : Box & AnimatePresence 컴포넌트 연결하기
	 */
	const history = useHistory();
	const bigMovieMatch = useRouteMatch<{ movieId: string }>(
		"/movies/:movieId"
	);
	console.log(bigMovieMatch);
	const onBoxClicked = (movieId: number) => {
		history.push(`/movies/${movieId}`);
	};
	/**
	 * 🔻 react-query를 사용하여 API Data 불러오기
	 *  1. install  : @tanstack/react-query (기존 react-query과 React@18은 충돌)
	 *  2. Provider : QueryClient생성, QueryClientProvider연결한디
	 *  3. 비동기함수  : fetch('Data Address).then(json)
	 *  4. useQuery : 2개의 파라미터 중 첫번째는 unique Key, 두번째는 비동기함수를 넣는다
	 */
	const { data, isLoading } = useQuery<IGetMoviesResult>(
		["moives", "nowPlaying"],
		getMovies
	);
	/**
	 * 🔻 Animation을 적용하여 Slider 만들기
	 *  1. Slide 모션을 적용할 컴포넌트에 index를 할당한다
	 *  2. 클릭 할 때마다 1씩 증가시키는 함수를 만들어 컴포넌트에 연결한다
	 *  3. 애니메이션 효과 설정하고 컴포넌트에 적용한다
	 *
	 *  - AnimatePresence   : 컴포넌트가 render되거나 destory될 때 효과를 주는 기능컴포넌트
	 *  - whidow.outerWidth : 화면의 크기 측정
	 */
	const [index, setIndex] = useState(0);
	/**
	 * 🔻 exit가 종료된 후에만 재실행(애니메이션을 실행 중에 또 실행하는 경우 발생하는 exit효과 중첩에 의한 버그를 방지)
	 *  - [false]: 실행 | [true]: 실행제한 |
	 *  - onExitComplete : 연결된 함수의 exit이 끝나면 실행
	 *
	 *  - [순서 : false → true → false]
	 *  1. false 기본값으로 하는 boolean props를 만든다
	 *  2. 애니메이션을 작동하는 함수가 실행되면 true로 변경
	 *  3. true → false로 변경하는 함수를 onExitComplete에 연결
	 *
	 *  🔻 AnimatePresence Props [true | false]
	 *  -  initial = hidden(왼쪽 방향으로 슬라이딩)
	 *  -  initial로 설정된 모션효과를 첫 렌더링 이후에는 재실행하지 않도록 동작을 차단하기
	 */
	const [leaving, setLeaving] = useState(false);
	const increaseIndex = () => {
		if (data) {
			if (leaving) return;
			toggleLeaving();
			const totalMovies = data.results.length - 1;
			const maxIndex = Math.floor(totalMovies / offset - 1);
			setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
		}
	};
	const toggleLeaving = () => setLeaving((prev) => !prev);

	return (
		<Wrapper>
			{isLoading ? (
				<Loader>Loading...</Loader>
			) : (
				<>
					<Banner
						onClick={increaseIndex}
						$bgPhoto={makeImagePath(
							data?.results[0].backdrop_path || ""
						)}
					>
						<Title>{data?.results[0].title}</Title>
						<Overview>{data?.results[0].overview}</Overview>
					</Banner>
					<Slider>
						<AnimatePresence
							initial={false}
							onExitComplete={toggleLeaving}
						>
							<Row
								key={index}
								variants={rowVariants}
								initial="hidden"
								animate="visible"
								exit="exit"
								transition={{ type: "tween", duration: 1 }}
							>
								{data?.results
									.slice(1)
									.slice(
										offset * index,
										offset * index + offset
									)
									.map((movie) => (
										<Box
											key={movie.id}
											onClick={() =>
												onBoxClicked(movie.id)
											}
											layoutId={movie.id + ""}
											variants={boxVariants}
											initial="normal"
											whileHover="hover"
											transition={{ type: "tween" }}
											$bgPhoto={makeImagePath(
												movie.backdrop_path,
												"w500"
											)}
										>
											<Info variants={infoVariants}>
												<h4>{movie.title}</h4>
											</Info>
										</Box>
									))}
							</Row>
						</AnimatePresence>
					</Slider>
					<AnimatePresence>
						{bigMovieMatch ? (
							<motion.div
								layoutId={bigMovieMatch.params.movieId}
								style={{
									position: "absolute",
									top: 50,
									left: 0,
									right: 0,
									margin: "0 auto",
									width: "40vw",
									height: "80vh",
									backgroundColor: "lightblue",
								}}
							/>
						) : null}
					</AnimatePresence>
				</>
			)}
		</Wrapper>
	);
}

export default Home;
