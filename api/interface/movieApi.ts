// 현재상영작
export interface IMovie {
  id: number;
  backdrop_path: string | null;
  poster_path: string | null;
  title: string;
  name?: string;
  overview: string;
  vote_average: number;
}
export interface IGetNowMoviesResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}
// 관련영화
export interface ISimilarMovie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  popularity: number;
  release_date: string;
}
export interface IGetSimilarMoviesResult {
  page: number;
  results: ISimilarMovie[];
  total_pages: number;
  total_results: number;
}
// 영화 상세
export interface IGetMovie {
  id: number;
  genres: { id: number; name: string }[];
  release_date: string;
  runtime: number;
}
