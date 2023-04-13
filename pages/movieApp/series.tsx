import { useMemo } from "react";
import styled from "styled-components";
import { useQuery } from "react-query";

import { seriesAPIs } from "@/api";
import { IGetPopularSeriesResult } from "@/api/interface/seriesApi";
import { makeMovieImagePath } from "@/utils";
import { useIsMobile } from "@/hooks";
import { makeEncodeSeriesItem } from "@/utils/make-encode-item";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

import Layout from "@/components/movieApp/template/Layout";
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

const Series = () => {
  const isMobileSize = useIsMobile();

  // NOTE GET 인기 시리즈 목록
  const { data: popularSeries } = useQuery<IGetPopularSeriesResult>(
    ["series", "popular"],
    () => seriesAPIs.getPopularSeries()
  );

  // NOTE GET Top Rated 시리즈 목록
  const { data: topRatedSeries } = useQuery(["series", "topRated"], () =>
    seriesAPIs.getTopRatedSeries()
  );

  // NOTE GET 현재 상영작 목록
  const { data: onAirSeries } = useQuery(["series", "onAir"], () =>
    seriesAPIs.getOnAirSeries({ page: 2 })
  );

  // 공통 포맷으로 가공
  const popularList = useMemo(
    () =>
      popularSeries?.results && makeEncodeSeriesItem(popularSeries?.results),
    [popularSeries?.results]
  );
  const topRatedList = useMemo(
    () =>
      topRatedSeries?.results && makeEncodeSeriesItem(topRatedSeries?.results),
    [topRatedSeries?.results]
  );
  const onAirList = useMemo(
    () => onAirSeries?.results && makeEncodeSeriesItem(onAirSeries?.results),
    [onAirSeries?.results]
  );

  return (
    <Layout>
      <Main>
        <Banner
          bgphoto={makeMovieImagePath(
            popularSeries?.results[BANNER_SHOW_IDX].backdrop_path || ""
          )}
        >
          <BannerContents>
            <Title>{popularSeries?.results[BANNER_SHOW_IDX].name}</Title>
            <DetailWrap>
              <Average>
                {popularSeries?.results[BANNER_SHOW_IDX].vote_average.toFixed(
                  1
                )}{" "}
                <span>Point</span>
              </Average>
              <Release>
                {popularSeries?.results[BANNER_SHOW_IDX].first_air_date.slice(
                  0,
                  4
                )}
              </Release>
            </DetailWrap>
            <Overview isMobile={isMobileSize}>
              {popularSeries?.results[BANNER_SHOW_IDX].overview}
            </Overview>
            <ButtonIcon
              text="재생"
              icon={<FontAwesomeIcon icon={faPlay} color="#000000" />}
            />
          </BannerContents>
        </Banner>
        <ListBox>
          <Slider
            title="인기 시리즈"
            list={popularList?.slice(1, 19) ?? []}
            offset={isMobileSize ? 3 : 6}
          />
        </ListBox>
        <ListBox>
          <Slider
            title="방영중 시리즈"
            list={onAirList?.slice(1, 19) ?? []}
            offset={isMobileSize ? 3 : 6}
          />
        </ListBox>
        <ListBox>
          <Slider
            type="ranking"
            title="평점 베스트"
            list={topRatedList?.slice(0, 18) ?? []}
            offset={isMobileSize ? 3 : 6}
          />
        </ListBox>
      </Main>
    </Layout>
  );
};

export default Series;
