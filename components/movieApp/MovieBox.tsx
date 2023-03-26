import styled from "styled-components";

import { ISimilarMovie } from "@/api/interfaceMovieApi";
import { makeMovieImagePath } from "@/utils";

const Box = styled.div`
  position: relative;

  height: 200px;
  min-height: 100px;
  max-height: 300px;

  padding-top: 150%;

  background-color: #323232;
`;
const Poster = styled.div<{ bgphoto: string }>`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 40%;

  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
`;

interface IMovieBoxProps {
  data: ISimilarMovie;
}
const MovieBox = ({ data }: IMovieBoxProps) => {
  return (
    <Box>
      <Poster bgphoto={makeMovieImagePath(data.backdrop_path, "w500")} />
    </Box>
  );
};

export default MovieBox;
