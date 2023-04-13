import axios from "axios";
import {
  IGetPopularSeriesResult,
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

  // NOTE [GET] 현재 상영작 리스트
  const getOnAirSeries = async ({ page }: { page: number }) =>
    await (
      await axios.get(`${baseUrl}/on_the_air?${fixedQuery}&page=${page}`)
    ).data;

  // NOTE [GET] 평점 높은 시리즈 리스트
  const getTopRatedSeries = async () =>
    (await (
      await axios.get(`${baseUrl}/top_rated?${fixedQuery}`)
    ).data) as IGetTopRatedSeriesResult;

  return { getPopularSeries, getOnAirSeries, getTopRatedSeries };
};
