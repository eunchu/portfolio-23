import { useState, useRef } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

import { IMovie } from "@/api/interface/movieApi";
import { ISearchedResult } from "@/api/interface/searchApi";
import { useIsMobile } from "@/hooks";

import Box from "./Box";
import BoxRanking from "./BoxRanking";

const Container = styled.div`
  position: relative;
`;
const Title = styled.h2`
  font-size: 16px;
  margin-bottom: 10px;
`;
const Row = styled(motion.div)<{ isMobile: boolean }>`
  display: flex;
  flex-direction: row;
  gap: 10px;

  padding-bottom: 32px;
`;
const Left = styled.div`
  position: absolute;
  top: calc(50% - 11px);
  left: -15px;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 30px;
  height: 30px;

  background-color: #85858597;
  border-radius: 4px;
  font-size: 20px;

  z-index: 20;
  cursor: pointer;
`;
const Right = styled.div`
  position: absolute;
  top: calc(50% - 11px);
  right: -15px;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 30px;
  height: 30px;

  background-color: #85858597;
  border-radius: 4px;
  font-size: 20px;

  z-index: 20;
  cursor: pointer;
`;
const LeftArrowBox = styled.div`
  width: 4%;
  height: calc(100% - 54px);

  position: absolute;
  top: 32px;
  left: calc(-4% - 10px);

  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));
  z-index: 10;
`;
const RightArrowBox = styled.div`
  width: calc(4% + 10px);
  height: calc(100% - 54px);

  position: absolute;
  top: 32px;
  right: calc(-4% - 10px);

  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));
  z-index: 10;
`;

interface ISliderProps {
  type?: string;
  title: string;
  list: IMovie[] | ISearchedResult[];
  offset: number; // display될 숫자
}
const Slider = ({ type, title, list, offset }: ISliderProps) => {
  const isMobileSize = useIsMobile();

  const [index, setIndex] = useState<number>(0);
  const [click, setClick] = useState<boolean>(false);
  const [clickLeft, setClickLeft] = useState<boolean>(false);
  const rowRef = useRef<any>();

  let variants = {
    initial: {
      x: 0,
    },
    nextMove: (click: string) => ({
      x: -rowRef.current?.offsetWidth * index,
    }),
    prevMove: (clickLeft: string) => ({
      x: -rowRef.current?.offsetWidth * index - rowRef.current?.offsetWidth,
    }),
  };
  const increaseIndex = () => {
    setClick(true);
    setIndex((prev) => prev + 1);
  };
  const decreaseIndex = () => {
    if (index > 0) {
      setClickLeft(true);
      setIndex((prev) => prev - 1);
    }
  };

  return (
    <Container>
      <Title>{title}</Title>
      {index !== 0 && (
        <>
          <Left onClick={decreaseIndex}>
            <FontAwesomeIcon icon={faAngleLeft} />
          </Left>
          <LeftArrowBox />
        </>
      )}
      <Row
        ref={rowRef}
        isMobile={isMobileSize}
        variants={variants}
        initial="initial"
        animate={click ? "nextMove" : clickLeft && "prevMove"}
        transition={{ type: "tween", duration: 1 }}
      >
        {list.map((item, idx) => {
          return type === "ranking" ? (
            <BoxRanking
              rank={idx + 1}
              key={item.id}
              movie={item}
              offset={offset}
            />
          ) : (
            <Box key={item.id} movie={item} offset={offset} />
          );
        })}
      </Row>
      {list.length / offset !== index + 1 && (
        <>
          <Right onClick={increaseIndex}>
            <FontAwesomeIcon icon={faAngleRight} />
          </Right>
          <RightArrowBox />
        </>
      )}
    </Container>
  );
};
``;
export default Slider;
