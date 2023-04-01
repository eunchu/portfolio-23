import styled from "styled-components";
import { useRouter } from "next/router";

import Layout from "@/components/movieApp/Layout";
import { useQuery } from "react-query";
import { searchAPIs } from "@/api";
import { ISearchedMovies } from "@/api/interface/searchApi";
import { useEffect } from "react";

const Container = styled.div`
  margin-top: 80px;
  padding: 0 4%;
`;

const Search = () => {
  const { query } = useRouter();

  // NOTE GET 영화 검색 리스트
  const { data: searchedMovies } = useQuery<ISearchedMovies>(
    ["movies", "searched"],
    () => searchAPIs.getSearchedMovies(query.text + ""),
    {
      enabled: !!query.text,
    }
  );

  return (
    <Layout>
      <Container>searching ...</Container>
    </Layout>
  );
};

export default Search;
