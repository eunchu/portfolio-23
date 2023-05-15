import Link from "next/link";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  height: calc(100% - 60px);
`;
const ErrorTitle = styled.h1`
  font-size: 40px;
  font-weight: 500;
`;
const Desc = styled.p`
  text-align: center;
  margin: 20px 0 30px 0;
`;
const HomeLink = styled.p`
  font-weight: 500;
  text-decoration: underline;
`;

const NotFoundPage = () => {
  return (
    <Container>
      <ErrorTitle>Page not found</ErrorTitle>
      <Desc>
        존재하지 않는 주소를 입력하셨거나,
        <br />
        요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.
      </Desc>
      <Link href={"/"}>
        <HomeLink>메인으로 가기</HomeLink>
      </Link>
    </Container>
  );
};

export default NotFoundPage;
