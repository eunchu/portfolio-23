export interface ISeries {
  id: number;
  backdrop_path: string | null;
  poster_path: string | null;
  name: string;
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
