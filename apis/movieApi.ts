import axios from "axios";
import {
  IGetMovie,
  IGetNowMoviesResult,
  IGetPopularMovies,
  IGetSimilarMoviesResult,
  IGetTopRatedMovies,
} from "./interface/movieApi";

interface IApiFactory {
  baseUrl: string;
  fixedQuery: string;
}

export const moviesFactory = ({ baseUrl, fixedQuery }: IApiFactory) => {
  // NOTE [GET] 현재 상영작 리스트
  const getNowMovies = async () =>
    (await (
      await axios.get(`${baseUrl}/now_playing?${fixedQuery}`)
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

  // NOTE [GET] 인기 영화 목록
  const getPopularMovies = async () =>
    (await (
      await axios.get(`${baseUrl}/popular?${fixedQuery}`)
    ).data) as IGetPopularMovies;

  // NOTE [GET] 최고 등급 영화 목록
  const getTopRatedMovies = async () =>
    (await (
      await axios.get(`${baseUrl}/top_rated?${fixedQuery}`)
    ).data) as IGetTopRatedMovies;

  // NOTE [GET] 영상 정보
  const getMovieVideos = async (movieId: number) =>
    await (
      await axios.get(`${baseUrl}/${movieId}/videos?${fixedQuery}`)
    ).data;

  return {
    getNowMovies,
    getSimilarMovies,
    getMovie,
    getPopularMovies,
    getTopRatedMovies,
    getMovieVideos,
  };
};
