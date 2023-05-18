import axios from "axios";
import { ISearchedMovies, ISearchedResults } from "./interface/searchApi";

interface IApiFactory {
  baseUrl: string;
  fixedQuery: string;
}

export const searchFactory = ({ baseUrl, fixedQuery }: IApiFactory) => {
  // NOTE [GET] 영화 검색
  const getSearchedMovies = async (searchWord: string) =>
    (await (
      await axios.get(
        `${baseUrl}/movie?${fixedQuery}&query=${encodeURIComponent(searchWord)}`
      )
    ).data) as ISearchedMovies;

  // NOTE [GET] 영화/시리즈 통합 검색
  const getSearchedResults = async (searchWord: string) =>
    (await (
      await axios.get(
        `${baseUrl}/multi?${fixedQuery}&query=${encodeURIComponent(searchWord)}`
      )
    ).data) as ISearchedResults;

  return { getSearchedMovies, getSearchedResults };
};
