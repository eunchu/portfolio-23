export interface ISeries {
  id: number;
  backdrop_path: string | null;
  poster_path: string | null;
  name: string;
  title?: string;
  original_name: string;
  overview: string;
  vote_average: number;
  first_air_date: string;
}
export interface IGetPopularSeriesResult {
  results: ISeries[];
}
export interface IGetTopRatedSeriesResult {
  results: ISeries[];
}
export interface IGetOnAirResult {
  results: ISeries[];
}
export interface ISeason {
  id: number;
  name: string;
  episode_count: number;
  season_number: number;
}
export interface IGetSeriesDetail {
  id: number;
  genres: { id: number; name: string }[];
  number_of_seasons: number;
  seasons: ISeason[];
}
export interface ISimilarSeries {
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  popularity: number;
  first_air_date: string;
}
export interface IGetSimilarSeriesResult {
  results: [];
}
export interface IEpisode {
  id: number;
  name: string;
  overview: string;
  runtime: number;
  season_number: number;
  episode_number: number;
  still_path: string;
}
export interface IGetSeasonesResult {
  id: number;
  overview: string;
  air_date: string;
  episodes: IEpisode[];
  name: string;
  poster_path: string;
  season_number: number;
}
