import styled from "styled-components";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";

import { IMovie } from "@/api/interface/movieApi";
import { makeMovieImagePath } from "@/utils";
import { commonAtom } from "@/store";
import { ISearchedResult } from "@/api/interface/searchApi";
import { useIsMobile } from "@/hooks";

interface IStyle {
  isMobile: string | any;
  bgphoto: string | null;
  offset: number;
  index: number;
}
const ItemWrap = styled(motion.div)<IStyle>`
  position: relative;

  min-width: ${(props) => `calc(${100 / props.offset}% - 10px)`};

  height: 200px;
  min-height: 100px;
  max-height: 300px;

  padding-top: ${(props) => (props.isMobile ? "50%" : "26%")};

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
  /* &:nth-child(${(props) => props.offset * (props.index + 1) + 1}) {
    background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
      url(${(props) => props.bgphoto});
  } */
`;
const Item = styled.div`
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

interface IBoxProps {
  movie: IMovie | ISearchedResult;
  offset: number; // display될 숫자
  index: number;
}
const Box = ({ movie, offset, index }: IBoxProps) => {
  const isMobileSize = useIsMobile();
  const router = useRouter();

  const setClickedId = useSetRecoilState(commonAtom);

  const BOX_EFFECT_DELAY = 0.7;
  const boxVariants = {
    normal: { scale: 1 },
    hover: {
      scale: 1.05,
      y: -16,
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
        key={movie.id}
        layoutId={movie.id + ""}
        variants={boxVariants}
        initial="normal"
        whileHover="hover"
        transition={{ type: "tween" }}
        isMobile={isMobileSize}
        bgphoto={
          movie.poster_path
            ? makeMovieImagePath(movie.poster_path, "w500")
            : null
        }
        offset={offset}
        index={index}
        onClick={() => onBoxClicked(movie.id)}
      >
        <Item>
          <Info variants={showVariants}>
            <h3>{movie.title || movie.name}</h3>
            <div>{movie.vote_average.toFixed(1)}</div>
          </Info>
        </Item>
      </ItemWrap>
    </>
  );
};

export default Box;
