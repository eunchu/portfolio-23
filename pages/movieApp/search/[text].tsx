import { useMemo, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { AnimatePresence } from "framer-motion";
import { useRecoilValue } from "recoil";

import { searchAPIs } from "@/api";
import { ISearchedResult, ISearchedResults } from "@/api/interface/searchApi";
import { commonAtom } from "@/store";
import { useIsMobile } from "@/hooks";

import Layout from "@/components/movieApp/template/Layout";
import Box from "@/components/movieApp/organism/Box";
import MovieDetailPopup from "@/components/movieApp/MovieDetailPopup";

const Container = styled.div`
  margin-top: 110px;
  padding: 0 4%;
`;
const Title = styled.h2`
  font-size: 16px;
  margin-bottom: 20px;
  span {
    font-weight: bold;
  }
`;
const TypeTitleWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 12px;
`;
const TypeTitle = styled.h3`
  font-size: 20px;
  font-weight: 500;
`;
const Total = styled.span`
  font-size: 14px;
  color: ${(props) => props.theme.color.textSub};

  margin-left: 8px;
`;
const TotalLink = styled.span`
  color: ${(props) => props.theme.color.textSub};
  cursor: pointer;
`;
const Items = styled.ul<{ isMobile: boolean }>`
  display: grid;
  grid-template-columns: ${(props) =>
    props.isMobile
      ? "repeat(3, minmax(100px, 1fr))"
      : "repeat(6, minmax(100px, 1fr))"};
  gap: 10px;

  margin-bottom: 40px;
`;

const Search = () => {
  const { query } = useRouter();
  const isMobileSize = useIsMobile();

  const [movieListHover, setMovieListHover] = useState<boolean>(false);
  const [seriesListHover, setSeriesistHover] = useState<boolean>(false);
  const clickedId = useRecoilValue(commonAtom);

  // NOTE GET 검색 리스트
  const { data: seachedResults } = useQuery<ISearchedResults>(
    ["seach", "multi"],
    () => searchAPIs.getSearchedResults(query.text + ""),
    {
      enabled: !!query.text,
    }
  );

  const { movies, series } = useMemo(() => {
    let movies = [] as any;
    let series = [] as any;

    seachedResults?.results.filter((result: ISearchedResult) =>
      result.media_type === "tv" ? series.push(result) : movies.push(result)
    );

    return { movies, series };
  }, [seachedResults?.results]);

  const clickedMovie =
    clickedId &&
    seachedResults?.results.find((movie) => movie.id === +clickedId);

  const displayNum = isMobileSize ? 3 : 6;

  return (
    <Layout>
      <Container>
        <Title>
          <span>{'"' + query.text + '"'}</span> 검색 결과가 총{" "}
          {seachedResults?.total_results}개 있습니다
        </Title>
        {movies.length ? (
          <div
            onMouseEnter={() => setMovieListHover(true)}
            onMouseLeave={() => setMovieListHover(false)}
          >
            <TypeTitleWrap>
              <TypeTitle>
                영화<Total>{movies.length}개</Total>
              </TypeTitle>
              {movieListHover && <TotalLink>전체보기</TotalLink>}
            </TypeTitleWrap>
            <Items isMobile={isMobileSize}>
              {movies.slice(0, displayNum).map((item: ISearchedResult) => (
                <Box
                  key={item.id}
                  height={"280px"}
                  movie={item}
                  offset={isMobileSize ? 3 : 6}
                />
              ))}
            </Items>
          </div>
        ) : null}
        {series.length ? (
          <div
            onMouseEnter={() => setSeriesistHover(true)}
            onMouseLeave={() => setSeriesistHover(false)}
          >
            <TypeTitleWrap>
              <TypeTitle>
                TV프로그램<Total>{series.length}개</Total>
              </TypeTitle>
              {seriesListHover && <TotalLink>전체보기</TotalLink>}
            </TypeTitleWrap>
            <Items isMobile={isMobileSize}>
              {series.slice(0, displayNum).map((item: ISearchedResult) => (
                <Box
                  key={item.id}
                  height={"280px"}
                  movie={item}
                  offset={isMobileSize ? 3 : 6}
                />
              ))}
            </Items>
          </div>
        ) : null}
      </Container>
      <AnimatePresence>
        {clickedMovie ? (
          <MovieDetailPopup
            type={clickedMovie.media_type}
            item={clickedMovie}
            path={query.text + ""}
          />
        ) : null}
      </AnimatePresence>
    </Layout>
  );
};

export default Search;
