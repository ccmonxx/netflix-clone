import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { getMovies, IGetMoviesResult } from "../api";
import { makeImagePath } from "../utils";
import { useState } from "react";

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

const Banner = styled.div<{ bgPhoto: string }>`
	display: flex;
	justify-content: center;
	flex-direction: column;
	height: 100vh;
	padding: 60px;
	background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
		url(${(props) => props.bgPhoto});
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
	gap: 10px;
`;

const Box = styled(motion.div)`
	height: 200px;
	background-color: white;
	color: lightcoral;
	font-size: 50px;
`;

const rowVariants = {
	hidden: {
		x: window.outerWidth,
	},
	visible: {
		x: 0,
	},
	exit: {
		x: -window.outerWidth,
	},
};

function Home() {
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
		if (leaving) return;
		setLeaving(true);
		setIndex((prev) => prev + 1);
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
						bgPhoto={makeImagePath(
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
								{[1, 2, 3, 4, 5, 6].map((i) => (
									<Box key={i}>{i}</Box>
								))}
							</Row>
						</AnimatePresence>
					</Slider>
				</>
			)}
		</Wrapper>
	);
}

export default Home;
