import styled from "styled-components";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { AnimatePresence } from "framer-motion";
import { useRecoilState } from "recoil";

import { searchAPIs } from "@/api";
import { ISearchedMovies } from "@/api/interface/searchApi";
import Layout from "@/components/movieApp/Layout";
import Box from "@/components/movieApp/Box";
import { commonAtom } from "@/store";
import MovieDetailPopup from "@/components/movieApp/MovieDetailPopup";

const Container = styled.div`
  margin-top: 110px;
  padding: 0 4%;
`;
const Title = styled.h2`
  font-size: 16px;
  margin-bottom: 12px;
  span {
    font-weight: bold;
  }
`;
const Items = styled.ul`
  display: grid;
  grid-template-columns: repeat(6, minmax(100px, 1fr));
  gap: 10px;
`;

const Search = () => {
  const { query } = useRouter();

  const clickedId = useRecoilState(commonAtom);

  // NOTE GET 영화 검색 리스트
  const { data: searchedMovies } = useQuery<ISearchedMovies>(
    ["movies", "searched"],
    () => searchAPIs.getSearchedMovies(query.text + ""),
    {
      enabled: !!query.text,
    }
  );

  const clickedMovie =
    clickedId &&
    searchedMovies?.results.find((movie) => movie.id === +clickedId);

  return (
    <Layout>
      <Container>
        <Title>
          <span>{'"' + query.text + '"'}</span> 검색 결과가{" "}
          {searchedMovies?.total_results}개 있습니다
        </Title>
        <Items>
          {searchedMovies?.results.map((item) => (
            <Box key={item.id} movie={item} />
          ))}
        </Items>
      </Container>
      <AnimatePresence>
        {clickedMovie ? <MovieDetailPopup movie={clickedMovie} /> : null}
      </AnimatePresence>
    </Layout>
  );
};

export default Search;
