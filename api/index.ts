import { moviesFactory } from "./movieApi";
import { searchFactory } from "./searchApi";
import { seriesFactory } from "./seriesApi";

const API_KEY = "d00a99ae2b58c552fc3c259e80fe36e2";
const COMMON_QUERY = `api_key=${API_KEY}&language=ko-KR&region=KR`;
const BASE_PATH = "https://api.themoviedb.org/3";

const movieAPIs = moviesFactory({
  baseUrl: `${BASE_PATH}/movie`,
  fixedQuery: COMMON_QUERY,
});
const searchAPIs = searchFactory({
  baseUrl: `${BASE_PATH}/search`,
  fixedQuery: COMMON_QUERY,
});
const seriesAPIs = seriesFactory({
  baseUrl: `${BASE_PATH}/tv`,
  fixedQuery: COMMON_QUERY,
});

export { movieAPIs, searchAPIs, seriesAPIs };
