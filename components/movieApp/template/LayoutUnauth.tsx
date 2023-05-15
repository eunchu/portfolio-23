import styled from "styled-components";
import { useRouter } from "next/router";

import Footer from "@/components/movieApp/organism/Footer";

const Header = styled.header`
  height: 80px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 4%;
`;
const Logo = styled.h1`
  font-family: "Orbitron";
  font-size: 18px;
  font-weight: 900;

  margin-right: 20px;
  cursor: pointer;
  div {
    display: block;
    letter-spacing: 11px;
    margin-top: -4px;
  }
`;

const LayoutUnauth = (props: { children: React.ReactNode }) => {
  const router = useRouter();

  return (
    <>
      <Header>
        <Logo onClick={() => router.push("/")}>
          MOVIE
          <br />
          <div>APP</div>
        </Logo>
      </Header>
      {props.children}
      <Footer />
    </>
  );
};

export default LayoutUnauth;
