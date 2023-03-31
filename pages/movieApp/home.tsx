import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import { movieAPIs } from "@/api";
import { IGetNowMoviesResult } from "@/api/interfaceMovieApi";
import { makeMovieImagePath } from "@/utils";
import { useIsMobile } from "@/hooks";
import MovieDetailPopup from "@/components/movieApp/MovieDetailPopup";

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
  font-size: 1.6vw;
  font-weight: 300;

  margin-bottom: 10px;
`;
const Overview = styled.p`
  width: 70%;

  font-size: 1.2vw;
  font-weight: 100;
  line-height: 24px;
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
const BoxWrap = styled(motion.div)<{ bgphoto: string }>`
  position: relative;

  height: 200px;
  min-height: 100px;
  max-height: 300px;

  padding-top: 150%;

  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  border-radius: 4px;

  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;
const Box = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  height: 100%;
  width: 100%;
`;
const Info = styled(motion.div)`
  position: absolute;
  left: 0;
  right: 0;
  bottom: -36px;

  height: 40px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  font-size: 12px;
  background-color: #313131;
  border-radius: 0 0 4px 4px;

  padding: 10px;
  opacity: 0;
  h3 {
    width: 80%;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
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
  font-size: ${(props) => (props.isMobile ? "12px" : "1.4vw")};
  margin-bottom: 8px;
`;
const Loader = styled.div`
  height: 20vh;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function Home() {
  const isMobile = useIsMobile();

  // NOTE GET 배너 영화 정보
  const { data, isLoading } = useQuery<IGetNowMoviesResult>(
    ["movies", "nowPlaying"],
    () => movieAPIs.getNowMovies()
  );

  // NOTE [최신 개봉 영화] Slider
  const offset = isMobile ? 3 : 6;
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
  const boxVariants = {
    normal: { scale: 1 },
    hover: {
      scale: 1.3,
      y: -22,
      zIndex: 99,
      transition: {
        delay: BOX_EFFECT_DELAY,
        duration: 0.2,
        type: "tween",
      },
    },
  };
  const showVariants = {
    hover: {
      opacity: 1,
      transition: { delay: BOX_EFFECT_DELAY, duration: 0.2, type: "tween" },
    },
  };
  // Box click -> more detail popup open
  const router = useRouter();
  const onBoxClicked = (movieId: number) => {
    router.push("/movieApp", `/movieApp/movies/${movieId}`, { shallow: true });
  };
  // Box outside click -> more detail popup close
  const clickedMovieId = router.asPath
    .split("/movieApp/movies/")[1]
    ?.slice(0, -1);
  const clickedMovie =
    clickedMovieId &&
    data?.results.find((movie) => movie.id === +clickedMovieId);
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
              <Overview>{data?.results[BANNER_SHOW_IDX].overview}</Overview>
            </BannerContents>
          </Banner>
          <Slider>
            <SubTitle isMobile={isMobile}>최신 영화</SubTitle>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              <Row
                key={index}
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "tween", duration: 1 }}
                whileHover="hover"
                isMobile={isMobile}
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
                    <BoxWrap
                      key={movie.id}
                      layoutId={movie.id + ""}
                      variants={boxVariants}
                      initial="normal"
                      whileHover="hover"
                      transition={{ type: "tween" }}
                      bgphoto={makeMovieImagePath(movie.poster_path, "w500")}
                      onClick={() => onBoxClicked(movie.id)}
                    >
                      <Box>
                        <Info variants={showVariants}>
                          <h3>{movie.title}</h3>
                          <div>{movie.vote_average}</div>
                        </Info>
                      </Box>
                    </BoxWrap>
                  ))}
              </Row>
            </AnimatePresence>
          </Slider>
          <AnimatePresence>
            {clickedMovie ? <MovieDetailPopup movie={clickedMovie} /> : null}
          </AnimatePresence>
          <div style={{ height: "400px" }}></div>
        </>
      )}
    </Main>
  );
}
