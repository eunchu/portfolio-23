import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useRecoilValue } from "recoil";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import { movieAPIs } from "@/api";
import { IGetNowMoviesResult } from "@/api/interface/movieApi";
import { makeMovieImagePath } from "@/utils";
import { useIsMobile } from "@/hooks";
import MovieDetailPopup from "@/components/movieApp/MovieDetailPopup";
import Box from "@/components/movieApp/Box";
import { commonAtom } from "@/store";

const BANNER_SHOW_IDX = 0;

interface IMediaStyle {
  isMobile: boolean;
}

const Main = styled.main``;

const Banner = styled.div<{ bgphoto: string }>`
  position: relative;

  height: 52vw;
  min-height: 60vh;

  /* linear-gradient로 이미지에 배경색 추가 */
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgphoto});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  text-shadow: 2px 2px 4px rgb(0 0 0 / 45%);

  padding: 0 4%;
`;
const BannerContents = styled.div`
  position: absolute;
  bottom: 35%;
  left: 4%;
`;
const Title = styled.h2`
  font-size: 20px;
  font-weight: 500;

  margin-bottom: 10px;
`;
const Overview = styled.p<IMediaStyle>`
  width: 70%;

  font-size: ${(props) => (props.isMobile ? "12px" : "16px")};
  font-weight: 300;
  color: ${(props) => props.theme.color.textSub};
  line-height: ${(props) => (props.isMobile ? "20px" : "24px")};
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;
`;

const Slider = styled.div`
  position: relative;
  top: -140px;

  margin: 0 4%;
`;
const Row = styled(motion.div)<IMediaStyle>`
  position: absolute;

  width: 100%;

  display: grid;
  gap: 10px;
  grid-template-columns: ${(props) =>
    props.isMobile
      ? "repeat(3, minmax(100px, 1fr))"
      : "repeat(6, minmax(100px, 1fr))"};
`;
const Left = styled(motion.div)`
  position: absolute;
  top: calc(50% - 12px);
  left: -23px;

  font-size: 24px;
  transform: rotate(180deg);

  color: white;
  z-index: 10;
  opacity: 0;
`;
const Right = styled.div``;

const SubTitle = styled.div<IMediaStyle>`
  font-size: 16px;
  margin-bottom: 8px;
`;
const Loader = styled.div`
  height: 20vh;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function Home() {
  const isMobileSize = useIsMobile();

  // NOTE GET 배너 영화 정보
  const { data, isLoading } = useQuery<IGetNowMoviesResult>(
    ["movies", "nowPlaying"],
    () => movieAPIs.getNowMovies()
  );

  // NOTE [최신 개봉 영화] Slider
  const offset = isMobileSize ? 3 : 6;
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const increaseIndex = () => {
    if (data) {
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;

      if (leaving) return;
      toggleLeaving();
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const decreaseIndex = () => setIndex((prev) => (prev !== 0 ? prev - 1 : 0));
  const toggleLeaving = () => setLeaving((prev) => !prev);
  // Animation
  const BOX_EFFECT_DELAY = 0.7;
  const rowVariants = {
    hidden: { x: typeof window !== "undefined" ? window.outerWidth : 0 },
    visible: { x: 0 },
    exit: { x: typeof window !== "undefined" ? -window.outerWidth + 10 : 0 },
  };
  const showVariants = {
    hover: {
      opacity: 1,
      transition: { delay: BOX_EFFECT_DELAY, duration: 0.2, type: "tween" },
    },
  };

  const clickedId = useRecoilValue(commonAtom);
  const clickedMovie =
    clickedId && data?.results.find((movie) => movie.id === +clickedId);
  // 디테일팝업 오픈 시 바디스크롤 막기
  useEffect(() => {
    if (clickedMovie) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [clickedMovie]);

  return (
    <Main>
      {isLoading ? (
        <Loader>isLoading ...</Loader>
      ) : (
        <>
          <Banner
            onClick={increaseIndex}
            bgphoto={makeMovieImagePath(
              data?.results[BANNER_SHOW_IDX].backdrop_path || ""
            )}
          >
            <BannerContents>
              <Title>{data?.results[BANNER_SHOW_IDX].title}</Title>
              <Overview isMobile={isMobileSize}>
                {data?.results[BANNER_SHOW_IDX].overview}
              </Overview>
            </BannerContents>
          </Banner>

          <Slider>
            <SubTitle isMobile={isMobileSize}>최신 영화</SubTitle>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              <Row
                key={index}
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "tween", duration: 1 }}
                whileHover="hover"
                isMobile={isMobileSize}
              >
                {index !== 0 && (
                  <Left variants={showVariants} onClick={decreaseIndex}>
                    <FontAwesomeIcon icon={faArrowRight} />
                  </Left>
                )}
                {data?.results
                  .slice(1)
                  .slice(offset * index, offset * index + offset)
                  .map((movie) => (
                    <Box key={movie.id} movie={movie} />
                  ))}
              </Row>
            </AnimatePresence>
          </Slider>

          <AnimatePresence>
            {clickedMovie ? (
              <MovieDetailPopup movie={clickedMovie} path="/movieApp" />
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Main>
  );
}
