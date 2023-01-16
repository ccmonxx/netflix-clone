import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { getMovies, IGetMoviesResult } from "../api";
import { makeImagePath } from "../utils";
import { useState } from "react";

const Wrapper = styled.div`
	background: black;
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
		x: window.outerWidth + 10,
	},
	visible: {
		x: 0,
	},
	exit: {
		x: -window.outerWidth - 10,
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
	const increaseIndex = () => setIndex((prev) => prev + 1);

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
						<AnimatePresence>
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
