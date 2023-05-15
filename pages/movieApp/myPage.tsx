import styled from "styled-components";

import Layout from "@/components/movieApp/template/Layout";

const Container = styled.div`
  margin-top: 110px;
  padding: 0 4%;
`;

const MyPage = () => {
  return (
    <Layout>
      <Container>mypage</Container>
    </Layout>
  );
};

export default MyPage;
