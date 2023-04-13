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
export interface IGetSeriesDetail {
  id: number;
  genres: { id: number; name: string }[];
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
