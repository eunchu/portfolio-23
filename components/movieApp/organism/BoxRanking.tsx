import styled from "styled-components";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";

import { IMovie } from "@/apis/interface/movieApi";
import { makeMovieImagePath } from "@/utils";
import { commonAtom } from "@/store";
import { ISearchedResult } from "@/apis/interface/searchApi";
import { useIsMobile } from "@/hooks";

interface IStyle {
  isMobile: string | any;
  bgphoto: string | null;
  offset: number;
}
const ItemWrap = styled(motion.div)<IStyle>`
  position: relative;

  min-width: ${(props) => `calc(${100 / props.offset}% - 10px)`};

  height: 180px;
  min-height: 80px;
  max-height: 300px;

  padding-top: ${(props) => (props.isMobile ? "8%" : "8%")};

  background-image: url(${(props) => props.bgphoto});
  background-color: ${(props) => !props.bgphoto && "#353535"};
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
const Item = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  height: 100%;
  width: 100%;
`;
const Info = styled.div`
  width: 100%;

  display: flex;
  align-items: baseline;

  position: absolute;
  bottom: -26px;
  left: 0;

  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.9);
`;
const Title = styled.h3`
  font-size: 16px;
  line-height: 16px;

  flex-grow: 1;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const RankNumber = styled.div`
  font-size: 70px;
  line-height: 60px;
  font-weight: bold;
  font-style: italic;

  margin-right: 10px;
`;

interface IBoxProps {
  rank: number;
  movie: IMovie | ISearchedResult;
  offset: number; // display될 숫자
}
const Box = ({ rank, movie, offset }: IBoxProps) => {
  const isMobileSize = useIsMobile();
  const router = useRouter();

  const setClickedId = useSetRecoilState(commonAtom);

  const boxVariants = {
    normal: { y: 0 },
    hover: {
      y: -16,
      transition: {
        delay: 0.5,
        duration: 0.2,
        type: "tween",
      },
    },
  };

  // NOTE 박스 클릭 시 팝업 오픈
  const onBoxClicked = (movieId: number) => {
    setClickedId(movieId);
    router.push(router.asPath, `${router.asPath}?movies/${movieId}`, {
      shallow: true,
    });
  };

  return (
    <>
      <ItemWrap
        variants={boxVariants}
        initial="normal"
        whileHover="hover"
        transition={{ type: "tween" }}
        isMobile={isMobileSize}
        bgphoto={
          movie.backdrop_path
            ? makeMovieImagePath(movie.backdrop_path, "w500")
            : null
        }
        offset={offset}
        onClick={() => onBoxClicked(movie.id)}
      >
        <Item>
          <Info>
            <RankNumber>{rank}</RankNumber>
            <Title title={movie.title || movie.name}>
              {movie.title || movie.name}
            </Title>
          </Info>
        </Item>
      </ItemWrap>
    </>
  );
};

export default Box;
