import { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { ISimilarMovie } from "@/api/interface/movieApi";
import { makeMovieImagePath } from "@/utils";

const Box = styled.div`
  position: relative;

  height: 180px;
  min-height: 180px;
  max-height: 300px;

  background-color: #323232;

  padding-top: 140%;
  cursor: pointer;
`;
const Wrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
`;
const Poster = styled.div<{ bgphoto: string | null }>`
  position: relative;

  width: 100%;
  height: 40%;

  background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
    url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
`;
const PlayIcon = styled(motion.div)`
  position: absolute;
  top: calc(50% - 15px);
  left: calc(50% - 15px);

  font-size: 30px;
  opacity: 0;
`;
const Contents = styled.div`
  padding: 4%;
  height: 60%;

  display: flex;
  flex-direction: column;
`;
const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Popularity = styled.p`
  display: flex;
  align-items: center;

  font-size: 14px;
  color: #deb83e;
`;
const PopIcon = styled.div`
  margin-right: 6px;
  color: white;
`;
const Release = styled.p`
  font-size: 14px;
`;
const Title = styled.h2`
  font-size: 16px;
  margin-top: 12px;
  margin-bottom: 10px;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const Overview = styled.p`
  height: 0;
  flex-grow: 1;

  font-size: 12px;
  font-weight: 300;
  line-height: 20px;
  color: #bdbdbd;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;
`;

interface IMovieBoxProps {
  data: ISimilarMovie;
}
const MovieBox = ({ data }: IMovieBoxProps) => {
  const [boxhover, setBoxHover] = useState<boolean>(false);

  // NOTE 박스 hover시 재생버튼 출력
  const boxVariants = {
    initial: {
      opacity: 0,
    },
    hover: {
      opacity: 1,
      transition: { delay: 0.3 },
    },
  };

  return (
    <Box
      onMouseEnter={() => setBoxHover(true)}
      onMouseLeave={() => setBoxHover(false)}
    >
      <Wrap>
        <Poster
          bgphoto={
            data.backdrop_path
              ? makeMovieImagePath(data.backdrop_path, "w500")
              : null
          }
        >
          <PlayIcon
            variants={boxVariants}
            animate={boxhover ? "hover" : "initial"}
          >
            <FontAwesomeIcon icon={faCirclePlay} />
          </PlayIcon>
        </Poster>
        <Contents>
          <Top>
            <Release>{data.release_date.slice(0, 4)}</Release>
            <Popularity>
              <PopIcon>
                <FontAwesomeIcon icon={faThumbsUp} />
              </PopIcon>
              {Math.floor(data.popularity)}
            </Popularity>
          </Top>
          <Title title={data.title}>{data.title}</Title>
          <Overview>{data.overview || "-"}</Overview>
        </Contents>
      </Wrap>
    </Box>
  );
};

export default MovieBox;
