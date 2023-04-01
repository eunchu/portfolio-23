import axios from "axios";
import { ISearchedMovies } from "./interface/searchApi";

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

  return { getSearchedMovies };
};
