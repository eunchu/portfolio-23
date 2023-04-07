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
