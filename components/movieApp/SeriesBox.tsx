import { IEpisode } from "@/api/interface/seriesApi";
import { makeMovieImagePath } from "@/utils";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;

  background-color: #2d2d2d;

  padding: 20px;
  margin-bottom: 10px;
`;
const EpiNumber = styled.div`
  width: 40px;
  font-size: 20px;
`;
const Thumbnail = styled.div<{ img: string }>`
  width: 120px;
  height: 80px;

  background-image: url(${(props) => props.img});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;

  margin-right: 20px;
`;
const EmptThumbnail = styled.div`
  width: 120px;
  height: 80px;

  background-color: #3e3e3e;
  margin-right: 20px;
`;
const TextWrap = styled.div`
  width: 0;
  flex-grow: 1;
`;
const TitleWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 10px;
`;
const Title = styled.h3`
  width: 80%;

  font-size: 14px;
  font-weight: bold;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const RunTime = styled.p`
  color: ${(props) => props.theme.color.textSub};
`;
const Overview = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;
  color: ${(props) => props.theme.color.textSub};
`;

interface ISeriesProps {
  item: IEpisode;
}
const SeriesBox = ({ item }: ISeriesProps) => {
  return (
    <Container>
      <EpiNumber>{item.episode_number}</EpiNumber>
      {item.still_path ? (
        <Thumbnail img={makeMovieImagePath(item.still_path)} />
      ) : (
        <EmptThumbnail />
      )}
      <TextWrap>
        <TitleWrap>
          <Title>{item.name}</Title>
          {item.runtime ? <RunTime>{item.runtime}분</RunTime> : null}
        </TitleWrap>
        {item.overview ? (
          <Overview>{item.overview}</Overview>
        ) : (
          <Overview>-</Overview>
        )}
      </TextWrap>
    </Container>
  );
};

export default SeriesBox;
