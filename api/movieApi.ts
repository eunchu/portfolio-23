import axios from "axios";
import { IGetNowMoviesResult } from "./interfaceMovieApi";

const API_KEY = "d00a99ae2b58c552fc3c259e80fe36e2";

interface IApiFactory {
  baseUrl: string;
}

export const moviesFactory = ({ baseUrl }: IApiFactory) => {
  // NOTE [GET] 현재 상영작 리스트
  const getNowMovies = async () =>
    (await (
      await axios.get(
        `${baseUrl}/now_playing?api_key=${API_KEY}&language=ko-KR`
      )
    ).data) as IGetNowMoviesResult;

  // NOTE [GET] 관련 영화 리스트
  const getSimilarMovies = async (movieId: number) =>
    await (
      await axios.get(
        `${baseUrl}/${movieId}/similar?api_key=${API_KEY}&language=ko-KR`
      )
    ).data;

  return { getNowMovies, getSimilarMovies };
};
