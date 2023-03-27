import styled from "styled-components";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPlay } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "react-query";

import { makeMovieImagePath } from "@/utils";
import { movieAPIs } from "@/api";
import { IGetSimilarMoviesResult, IMovie } from "@/api/interfaceMovieApi";
import MovieBox from "@/components/movieApp/MovieBox";

const Overlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  z-index: 90;
`;
const MovieDetailBox = styled(motion.div)`
  position: fixed;
  top: 50px;
  left: 0;
  right: 0;
  bottom: 50px;

  width: calc(100% - 8%);
  max-width: 850px;
  height: auto;

  background-color: #181818;
  box-shadow: rgb(0 0 0 / 50%) 0px 3px 10px;
  border-radius: 4px;

  margin: 0 auto;
  z-index: 99;
  overflow: scroll;
`;
const CloseBtn = styled.div`
  position: absolute;
  top: 14px;
  right: 20px;

  font-size: 24px;

  cursor: pointer;
  z-index: 2;
`;
const PreviewPhoto = styled.div<{ bgphoto: string }>`
  position: relative;

  width: 100%;
  height: 360px;

  background-image: linear-gradient(to top, #181818, transparent),
    url(${(props) => props.bgphoto});
  background-position: top center;
  background-size: cover;
  border-radius: 4px 4px 0 0;
`;
const PlayButton = styled.div`
  position: absolute;
  bottom: 8%;
  left: 4%;

  display: flex;
  align-items: center;

  max-height: 42px;
  min-height: 32px;

  background-color: white;
  border-radius: 4px;

  padding: 0 16px;
  cursor: pointer;
  &:hover {
    background-color: #e6e6e6;
  }
  span {
    font-size: 1.2vw;
    color: #000000;
  }
`;
const PlayButtonIcon = styled.div`
  color: #000000;
  font-size: 14px;
  margin-right: 8px;
`;

const InfoWrap = styled.div`
  height: auto;

  padding: 0 4%;
  margin-bottom: 40px;
`;
const InfoTitle = styled.h2`
  font-size: 18px;

  margin-bottom: 12px;
`;
const InfoOverview = styled.p`
  font-size: 14px;
  font-weight: 300;
  line-height: 24px;
  color: #bdbdbd;

  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;
`;

const ListWrap = styled.div``;
const Title = styled.h2`
  font-size: 1.8vw;
  margin: 10px 0 14px 4%;
`;
const Items = styled.ul`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(3, minmax(100px, 1fr));

  padding: 0 4%;
`;

interface IProps {
  movie: IMovie;
}
const MovieDetailPopup = ({ movie }: IProps) => {
  const router = useRouter();

  // NOTE 팝업닫기
  const onClosePopup = () =>
    router.push("/movieApp", undefined, { shallow: true });

  // NOTE GET 관련 영화 리스트
  const { data: similarData } = useQuery<IGetSimilarMoviesResult>(
    ["movies", "similar"],
    () => movieAPIs.getSimilarMovies(movie.id)
  );

  return (
    <>
      <Overlay
        onClick={onClosePopup}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <MovieDetailBox layoutId={movie.id + ""}>
        <CloseBtn onClick={onClosePopup}>
          <FontAwesomeIcon icon={faXmark} />
        </CloseBtn>
        <PreviewPhoto
          className="image"
          bgphoto={makeMovieImagePath(movie.backdrop_path)}
        >
          <PlayButton>
            <PlayButtonIcon>
              <FontAwesomeIcon icon={faPlay} color="#000000" />
            </PlayButtonIcon>
            <span>재생</span>
          </PlayButton>
        </PreviewPhoto>
        <InfoWrap>
          <InfoTitle>{movie.title}</InfoTitle>
          <InfoOverview>{movie.overview}</InfoOverview>
        </InfoWrap>
        <ListWrap>
          <Title>비슷한 콘텐츠</Title>
          <Items>
            {similarData?.results.map((item) => (
              // component type1 : 비슷한 컨텐츠 박스, type2 : 회차 정보
              <MovieBox key={item.id} data={item} />
              // TODO
              // 9개 먼저 show
              // item이 더 있을 경우, 화살표 아이콘 출력
              // 아이콘 클릭 시 나머지 컨텐츠 출력
            ))}
          </Items>
        </ListWrap>
      </MovieDetailBox>
    </>
  );
};

export default MovieDetailPopup;
