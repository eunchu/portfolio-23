import { moviesFactory } from "./movieApi";

const BASE_PATH = "https://api.themoviedb.org/3";

const movieAPIs = moviesFactory({ baseUrl: `${BASE_PATH}/movie` });

export { movieAPIs };
