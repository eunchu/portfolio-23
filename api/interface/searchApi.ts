export interface ISearchedMovies {
  results: {
    id: number;
    poster_path: string | null;
    backdrop_path: string | null;
    overview: string;
    title: string;
    vote_average: number;
  }[];
  total_results: number;
}

export interface ISearchedResult {
  id: number;
  media_type: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  name: string;
  title?: string;
  vote_average: number;
}
export interface ISearchedResults {
  results: ISearchedResult[];
  total_results: number;
}
