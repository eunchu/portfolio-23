import { ISeries, ISimilarSeries } from "@/api/interface/seriesApi";

export const makeEncodeSeriesItem = (originalList: ISeries[]) =>
  originalList.map((item) => ({
    id: item.id,
    backdrop_path: item.backdrop_path,
    poster_path: item.poster_path,
    title: item.name,
    original_title: item.original_name,
    overview: item.overview,
    vote_average: item.vote_average,
    release_date: item.first_air_date,
  }));

export const makeEncodeSimilarItem = (originalList: ISimilarSeries[]) =>
  originalList?.map((item) => ({
    id: item.id,
    title: item.name,
    overview: item.overview,
    poster_path: item.poster_path,
    backdrop_path: item.backdrop_path,
    popularity: item.popularity,
    release_date: item.first_air_date,
  }));
