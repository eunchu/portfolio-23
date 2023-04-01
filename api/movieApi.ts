import axios from "axios";
import {
  IGetMovie,
  IGetNowMoviesResult,
  IGetSimilarMoviesResult,
} from "./interfaceMovieApi";

const API_KEY = "d00a99ae2b58c552fc3c259e80fe36e2";

interface IApiFactory {
  baseUrl: string;
}

export const moviesFactory = ({ baseUrl }: IApiFactory) => {
  const commonUrl = `api_key=${API_KEY}&language=ko-KR`;

  // NOTE [GET] 현재 상영작 리스트
  const getNowMovies = async () =>
    (await (
      await axios.get(`${baseUrl}/now_playing?${commonUrl}&region=KR`)
    ).data) as IGetNowMoviesResult;

  // NOTE [GET] 관련 영화 리스트
  const getSimilarMovies = async (movieId: number) =>
    (await (
      await axios.get(`${baseUrl}/${movieId}/similar?${commonUrl}`)
    ).data) as IGetSimilarMoviesResult;

  // NOTE [GET] 영화 상세 정보
  const getMovie = async (movieId: number) =>
    (await (
      await axios.get(`${baseUrl}/${movieId}?${commonUrl}`)
    ).data) as IGetMovie;

  return { getNowMovies, getSimilarMovies, getMovie };
};
