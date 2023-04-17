import { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { useQuery } from "react-query";
import { useSetRecoilState } from "recoil";
import { Select } from "antd";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faPlay,
  faCircleChevronDown,
} from "@fortawesome/free-solid-svg-icons";

import { makeHourFormat, makeMovieImagePath } from "@/utils";
import { movieAPIs, seriesAPIs } from "@/api";
import {
  IGetMovie,
  IGetSimilarMoviesResult,
  IMovie,
} from "@/api/interface/movieApi";
import { useIsMobile } from "@/hooks";
import { commonAtom } from "@/store";
import { ISearchedResult } from "@/api/interface/searchApi";
import ButtonIcon from "./atoms/ButtonIcon";
import {
  IGetSeasonesResult,
  IGetSeriesDetail,
  IGetSimilarSeriesResult,
  ISeries,
} from "@/api/interface/seriesApi";
import { makeEncodeSimilarItem } from "@/utils/make-encode-item";

import MovieBox from "@/components/movieApp/MovieBox";
import SeriesBox from "@/components/movieApp/SeriesBox";

interface IMediaStyle {
  isMobile: boolean;
}

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

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
  overflow: auto;
`;
const CloseBtn = styled.div`
  position: absolute;
  top: 14px;
  right: 20px;

  font-size: 24px;

  cursor: pointer;
  z-index: 2;
`;
const PreviewPhoto = styled.div<{ bgphoto: string | null }>`
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
  color: ${(props) => props.theme.color.textSub};

  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;
`;
const Details = styled.div`
  display: flex;
  align-items: center;

  font-size: 14px;

  margin-top: 20px;
`;
const Release = styled.p``;
const RunTime = styled.p`
  margin-left: 10px;
`;
const Keywords = styled.ul`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;

  margin-top: 8px;
`;
const Keyword = styled.li`
  word-break: break-all;
`;

const ListWrap = styled.div``;
const SeriesWrap = styled.div`
  padding: 0 4%;
  margin-bottom: 50px;
`;
const Title = styled.h2`
  font-size: 18px;
  margin: 10px 0 14px 4%;
`;
const Items = styled.ul<IMediaStyle>`
  display: grid;
  gap: 10px;
  grid-template-columns: ${(props) =>
    props.isMobile
      ? "repeat(2, minmax(100px, 1fr))"
      : "repeat(3, minmax(100px, 1fr))"};

  padding: 0 4%;
`;

const TopWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 20px;
`;
const SubTitle = styled.div`
  font-size: 16px;
`;
const SelectBox = styled.div``;

const MoreBox = styled.div`
  position: relative;

  width: 92%;
  height: 24px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-bottom: 1px solid #404040;
  background-image: linear-gradient(
    0deg,
    #181818 0,
    hsla(0, 0%, 9%, 0.7) 20%,
    hsla(0, 0%, 9%, 0.4) 30%,
    transparent 50%
  );

  margin-top: -24px;
  margin-left: 4%;
`;
const MoreIcon = styled.div<{ activeMore: boolean }>`
  position: absolute;
  top: 5px;

  font-size: 30px;
  color: #a8a8a8;

  transform: ${(props) => (props.activeMore ? "rotate(180deg)" : "rotate(0)")};
  cursor: pointer;
`;

interface IProps {
  type: string;
  item: IMovie | ISearchedResult | ISeries;
  path: string;
}
const MovieDetailPopup = ({ type, item, path }: IProps) => {
  const router = useRouter();
  const isMobileSize = useIsMobile();

  const setClickedId = useSetRecoilState(commonAtom);
  const [activeSeasonName, setActiveSeasonName] = useState<string>("");
  const [activeSeason, setActiveSeason] = useState<number | null>(null);

  // NOTE 팝업닫기
  const onClosePopup = () => {
    router.push(path, undefined, { shallow: true });
    setClickedId(null);
  };

  // NOTE GET 상세 정보
  const { data: detailMovieData } = useQuery<IGetMovie>(
    ["movie", "detail"],
    () => movieAPIs.getMovie(item.id),
    {
      enabled: type === "movie",
    }
  );
  const { data: detailSeriesData } = useQuery<IGetSeriesDetail>(
    ["series", "detail"],
    () => seriesAPIs.getSeriesDetail(item.id),
    {
      enabled: type === "tv",
    }
  );
  const detailData = useMemo(
    () =>
      type === "movie"
        ? { ...detailMovieData, seasons: [] }
        : { ...detailSeriesData, release_date: "", runtime: 0 },
    [detailMovieData, detailSeriesData, type]
  );

  // NOTE GET 관련 영화 리스트
  const { data: similarMovieData } = useQuery<IGetSimilarMoviesResult>(
    ["movies", "similar"],
    () => movieAPIs.getSimilarMovies(item.id),
    {
      enabled: type === "movie",
    }
  );
  const { data: similarSeriesData } = useQuery<IGetSimilarSeriesResult>(
    ["series", "similar"],
    () => seriesAPIs.getSimilarSeries(item.id),
    {
      enabled: type === "tv",
    }
  );
  const similarDataList = useMemo(
    () =>
      type === "movie"
        ? similarMovieData?.results
        : makeEncodeSimilarItem(similarSeriesData?.results || []),
    [similarMovieData, similarSeriesData, type]
  );

  // NOTE GET 시리즈 회차 리스트
  const { data: seasonsData } = useQuery<IGetSeasonesResult>(
    ["series", "seasons"],
    () => seriesAPIs.getSeasons(item.id, activeSeason as number),
    {
      enabled: type === "tv" && !!activeSeason,
    }
  );

  const displayNum = isMobileSize ? 6 : 9;
  const [visibleData, setVisibleData] = useState(
    similarDataList?.slice(0, displayNum)
  );
  const [activeMore, setActiveMore] = useState(false);

  useEffect(() => {
    setVisibleData(similarDataList?.slice(0, displayNum));
  }, [displayNum, similarDataList]);

  // NOTE More버튼 클릭 시 모든 관련 영화 출력
  const onClickMore = () => {
    if (activeMore) setVisibleData(similarDataList?.slice(0, displayNum));
    else {
      setVisibleData(similarDataList);
    }
    setActiveMore((prev) => !prev);
  };

  // [TV] 시즌 선택 select
  useEffect(() => {
    if (detailData.seasons?.length) {
      setActiveSeasonName(detailData.seasons[0].name);
      setActiveSeason(detailData.seasons[0].season_number);
    }
  }, [detailData.seasons]);
  const onChangeSeason = useCallback((val: string) => {
    setActiveSeasonName(val);
  }, []);

  return (
    <>
      <Overlay
        onClick={onClosePopup}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <MovieDetailBox layoutId={item.id + ""}>
        <CloseBtn onClick={onClosePopup}>
          <FontAwesomeIcon icon={faXmark} />
        </CloseBtn>
        <PreviewPhoto
          className="image"
          bgphoto={
            item.backdrop_path ? makeMovieImagePath(item.backdrop_path) : null
          }
        >
          <PlayButton>
            <ButtonIcon
              text="재생"
              icon={<FontAwesomeIcon icon={faPlay} color="#000000" />}
            />
          </PlayButton>
        </PreviewPhoto>
        <InfoWrap>
          <InfoTitle>{item.title}</InfoTitle>
          <InfoOverview>{item.overview}</InfoOverview>
          {type === "movie" ? (
            <Details>
              <Release>{detailData?.release_date?.slice(0, 4) || ""}</Release>
              <RunTime>{makeHourFormat(detailData?.runtime || 0)}</RunTime>
            </Details>
          ) : null}
          <Keywords>
            {detailData?.genres?.map((item) => (
              <Keyword key={item.id}>#{item.name}</Keyword>
            ))}
          </Keywords>
        </InfoWrap>
        {type === "tv" ? (
          <SeriesWrap>
            <TopWrap>
              <SubTitle>회차</SubTitle>
              <SelectBox>
                <Select
                  value={activeSeasonName}
                  style={{ width: 100 }}
                  onChange={onChangeSeason}
                  options={detailData.seasons?.map((season) => ({
                    value: season.name,
                    label: season.name,
                  }))}
                />
              </SelectBox>
            </TopWrap>
            {seasonsData?.episodes.map((item) => (
              <SeriesBox key={item.id} item={item} />
            ))}
          </SeriesWrap>
        ) : null}
        {type === "movie" && similarDataList?.length ? (
          <ListWrap>
            <Title>비슷한 콘텐츠</Title>
            <Items isMobile={isMobileSize}>
              {visibleData?.map((item) => (
                <MovieBox key={item.id} data={item} />
              ))}
            </Items>
          </ListWrap>
        ) : null}
        {type === "movie" && similarDataList && similarDataList.length > 8 ? (
          <MoreBox>
            <MoreIcon onClick={onClickMore} activeMore={activeMore}>
              <FontAwesomeIcon icon={faCircleChevronDown} />
            </MoreIcon>
          </MoreBox>
        ) : null}
      </MovieDetailBox>
    </>
  );
};

export default MovieDetailPopup;
