import { useEffect, useMemo } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { AnimatePresence } from "framer-motion";
import { useRecoilValue } from "recoil";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

import { movieAPIs } from "@/api";
import {
  IGetNowMoviesResult,
  IGetPopularMovies,
  IGetTopRatedMovies,
} from "@/api/interface/movieApi";
import { makeMovieImagePath } from "@/utils";
import { useIsMobile } from "@/hooks";
import { commonAtom } from "@/store";

import MovieDetailPopup from "@/components/movieApp/MovieDetailPopup";
import ButtonIcon from "@/components/movieApp/atoms/ButtonIcon";
import Slider from "@/components/movieApp/organism/Slider";

const BANNER_SHOW_IDX = 0;

interface IMediaStyle {
  isMobile: boolean;
}

const Main = styled.main`
  margin-bottom: 100px;
`;
const Banner = styled.div<{ bgphoto: string }>`
  position: relative;

  height: 35vw;
  min-height: 60vh;

  /* linear-gradient로 이미지에 배경색 추가 */
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgphoto});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: top center;
  text-shadow: 2px 2px 4px rgb(0 0 0 / 45%);

  padding: 0 4%;
`;
const BannerContents = styled.div`
  position: absolute;
  bottom: 12%;
  left: 4%;
`;
const Title = styled.h2`
  font-size: 30px;
  font-weight: 500;

  margin-bottom: 10px;
`;
const DetailWrap = styled.div`
  display: flex;
  align-items: center;
`;
const Average = styled.p`
  color: ${(props) => props.theme.color.point};
  font-size: 14px;
  span {
    color: white;
  }
`;
const Release = styled.p`
  font-size: 14px;
  margin-left: 14px;
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

  margin: 10px 0;
`;

const ListBox = styled.div`
  padding: 0 4%;
  margin-bottom: 35px;
  overflow: hidden;
`;

const Loader = styled.div`
  height: 20vh;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function Home() {
  const isMobileSize = useIsMobile();

  // NOTE GET 최근 영화 목록
  const { data, isLoading } = useQuery<IGetNowMoviesResult>(
    ["movies", "nowPlaying"],
    () => movieAPIs.getNowMovies()
  );

  // NOTE GET 인기 영화 목록
  const { data: popularMovies } = useQuery<IGetPopularMovies>(
    ["movies", "popular"],
    () => movieAPIs.getPopularMovies()
  );

  // NOTE GET Top Rated 영화 목록
  const { data: topRatedMovies } = useQuery<IGetTopRatedMovies>(
    ["movies", "topRated"],
    () => movieAPIs.getTopRatedMovies()
  );

  const clickedId = useRecoilValue(commonAtom);
  const allList = useMemo(() => {
    let all = data?.results;
    popularMovies && all?.push(...popularMovies?.results);
    topRatedMovies && all?.push(...topRatedMovies?.results);
    return all;
  }, [data?.results, popularMovies, topRatedMovies]);
  const clickedMovie =
    clickedId && allList?.find((movie) => movie.id === +clickedId);

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
            bgphoto={makeMovieImagePath(
              data?.results[BANNER_SHOW_IDX].backdrop_path || ""
            )}
          >
            <BannerContents>
              <Title>{data?.results[BANNER_SHOW_IDX].original_title}</Title>
              <DetailWrap>
                <Average>
                  {data?.results[BANNER_SHOW_IDX].vote_average.toFixed(1)}{" "}
                  <span>Point</span>
                </Average>
                <Release>
                  {data?.results[BANNER_SHOW_IDX].release_date.slice(0, 4)}
                </Release>
              </DetailWrap>
              <Overview isMobile={isMobileSize}>
                {data?.results[BANNER_SHOW_IDX].overview}
              </Overview>
              <ButtonIcon
                text="재생"
                icon={<FontAwesomeIcon icon={faPlay} color="#000000" />}
              />
            </BannerContents>
          </Banner>
          <ListBox>
            <Slider
              title="최신 영화"
              list={data?.results.slice(1, 19) ?? []}
              offset={isMobileSize ? 3 : 6}
            />
          </ListBox>
          <ListBox>
            <Slider
              type="ranking"
              title="지금 뜨는! 영화"
              list={popularMovies?.results.slice(0, 18) ?? []}
              offset={isMobileSize ? 3 : 6}
            />
          </ListBox>
          <ListBox>
            <Slider
              title="평점 베스트"
              list={topRatedMovies?.results.slice(0, 18) ?? []}
              offset={isMobileSize ? 3 : 6}
            />
          </ListBox>
          <AnimatePresence>
            {clickedMovie ? (
              <MovieDetailPopup
                type="movie"
                movie={clickedMovie}
                path="/movieApp"
              />
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Main>
  );
}
