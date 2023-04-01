import axios from "axios";
import {
  IGetMovie,
  IGetNowMoviesResult,
  IGetSimilarMoviesResult,
} from "./interface/movieApi";

interface IApiFactory {
  baseUrl: string;
  fixedQuery: string;
}

export const moviesFactory = ({ baseUrl, fixedQuery }: IApiFactory) => {
  // NOTE [GET] 현재 상영작 리스트
  const getNowMovies = async () =>
    (await (
      await axios.get(`${baseUrl}/now_playing?${fixedQuery}&region=KR`)
    ).data) as IGetNowMoviesResult;

  // NOTE [GET] 관련 영화 리스트
  const getSimilarMovies = async (movieId: number) =>
    (await (
      await axios.get(`${baseUrl}/${movieId}/similar?${fixedQuery}`)
    ).data) as IGetSimilarMoviesResult;

  // NOTE [GET] 영화 상세 정보
  const getMovie = async (movieId: number) =>
    (await (
      await axios.get(`${baseUrl}/${movieId}?${fixedQuery}`)
    ).data) as IGetMovie;

  return { getNowMovies, getSimilarMovies, getMovie };
};
