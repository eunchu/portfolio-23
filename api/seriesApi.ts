import axios from "axios";
import {
  IGetOnAirResult,
  IGetPopularSeriesResult,
  IGetSeasonesResult,
  IGetSeriesDetail,
  IGetSimilarSeriesResult,
  IGetTopRatedSeriesResult,
} from "./interface/seriesApi";

interface IApiFactory {
  baseUrl: string;
  fixedQuery: string;
}
export const seriesFactory = ({ baseUrl, fixedQuery }: IApiFactory) => {
  // NOTE [GET] 인기 시리즈 리스트
  // : (한글 제공 안됨ㅜㅜ힝)
  const getPopularSeries = async () =>
    (await (
      await axios.get(`${baseUrl}/popular?${fixedQuery}`)
    ).data) as IGetPopularSeriesResult;

  // NOTE [GET] 현재 상영작 목록
  const getOnAirSeries = async ({ page }: { page: number }) =>
    (await (
      await axios.get(`${baseUrl}/on_the_air?${fixedQuery}&page=${page}`)
    ).data) as IGetOnAirResult;

  // NOTE [GET] 평점 높은 시리즈 목록
  const getTopRatedSeries = async () =>
    (await (
      await axios.get(`${baseUrl}/top_rated?${fixedQuery}`)
    ).data) as IGetTopRatedSeriesResult;

  // NOTE [GET] 상세 정보
  const getSeriesDetail = async (id: number) =>
    (await (
      await axios.get(`${baseUrl}/${id}?${fixedQuery}`)
    ).data) as IGetSeriesDetail;

  // NOTE [GET] 관련 시리즈 목록
  const getSimilarSeries = async (id: number) =>
    (await (
      await axios.get(`${baseUrl}/${id}/similar?${fixedQuery}`)
    ).data) as IGetSimilarSeriesResult;

  // NOTE [GET] 시즌 정보
  const getSeasons = async (id: number, seasonNum: number) =>
    (await (
      await axios.get(`${baseUrl}/${id}/season/${seasonNum}?${fixedQuery}`)
    ).data) as IGetSeasonesResult;

  return {
    getPopularSeries,
    getOnAirSeries,
    getTopRatedSeries,
    getSeriesDetail,
    getSimilarSeries,
    getSeasons,
  };
};
