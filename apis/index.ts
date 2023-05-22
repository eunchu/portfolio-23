import axios from "axios";
import { moviesFactory } from "./movieApi";
import { searchFactory } from "./searchApi";
import { seriesFactory } from "./seriesApi";
import { usersFactory } from "./usersApi";

const API_KEY = "d00a99ae2b58c552fc3c259e80fe36e2";
const COMMON_QUERY = `api_key=${API_KEY}&language=ko-KR&region=KR`;
const MOVIE_BASE_PATH = "https://api.themoviedb.org/3";
const BASE_PATH =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://eunju-movie-app.netlify.app";

export const userClient = axios.create({ baseURL: `${BASE_PATH}/api/users` });

const movieAPIs = moviesFactory({
  baseUrl: `${MOVIE_BASE_PATH}/movie`,
  fixedQuery: COMMON_QUERY,
});
const searchAPIs = searchFactory({
  baseUrl: `${MOVIE_BASE_PATH}/search`,
  fixedQuery: COMMON_QUERY,
});
const seriesAPIs = seriesFactory({
  baseUrl: `${MOVIE_BASE_PATH}/tv`,
  fixedQuery: COMMON_QUERY,
});
const usersAPIs = usersFactory();

export { movieAPIs, searchAPIs, seriesAPIs, usersAPIs };
