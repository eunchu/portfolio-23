import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import { motion, useAnimation, useScroll } from "framer-motion";
import { useForm } from "react-hook-form";

const Nav = styled(motion.nav)`
  position: fixed;
  top: 0;

  width: 100%;
  height: 80px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 4%;
  z-index: 80;
`;
const Logo = styled.h1`
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
const Items = styled.ul`
  display: flex;
  align-items: center;
`;
const Item = styled.li`
  position: relative;

  display: flex;
  align-items: end;
  justify-content: center;

  color: #e5e5e5;
  font-size: 12px;

  transition: color 0.3s ease-in-out;

  margin-right: 20px;
  cursor: pointer;
  &:hover {
    color: white;
  }
`;
const Line = styled(motion.span)`
  position: absolute;
  bottom: -4px;

  width: 20px;
  height: 1px;

  background-color: white;
`;
const Search = styled.form`
  position: relative;

  display: flex;
  align-items: center;

  color: white;
  svg {
    height: 25px;
  }
  cursor: pointer;
`;
const Input = styled(motion.input)`
  position: absolute;
  left: -188px;

  width: 214px;

  /* 변형 시작점 설정 */
  transform-origin: right center;

  background-color: #1a1a1ad9;
  border: 1px solid white;
  font-size: 12px;
  font-weight: 500;
  color: white;

  padding: 8px 4px 8px 34px;
  z-index: -1;

  ::placeholder {
    color: #ababab;
  }
`;
// commons
const Col = styled.div`
  display: flex;
  align-items: center;
`;

const Header = () => {
  const [searchOpen, setSearchOpen] = useState<boolean>(false);

  const router = useRouter();

  // NOTE 검색창 클릭
  // useAnimation : 함수안에서 animation을 실행하고 싶을 때 사용, 여러개 동시에 실행시킬때 유용
  const searchAnimation = useAnimation();
  const onToggleSearch = () => {
    if (searchOpen) {
      searchAnimation.start({ scaleX: 0 });
    } else {
      searchAnimation.start({ scaleX: 1 });
    }
    setSearchOpen((prev) => !prev);
  };

  // NOTE 스크롤 이동 시 Nav바 배경색 변경
  const navVariants = {
    top: { backgroundColor: "rgba(0,0,0,0)" },
    scroll: { backgroundColor: "rgba(0,0,0,1)" },
  };

  const { scrollY } = useScroll();
  const navAnimation = useAnimation();
  useEffect(() => {
    scrollY.on("change", () => {
      if (scrollY.get() > 80) {
        navAnimation.start("scroll");
      } else {
        navAnimation.start("top");
      }
    });
  }, [navAnimation, scrollY]);

  // 검색창 Validation
  interface IForm {
    keyword: string;
  }
  const { register, handleSubmit } = useForm<IForm>();
  const onValid = (data: IForm) => {
    router.push({
      pathname: `/movieApp/search/[keyword]`,
      // pathname: `/movieApp/search/${data.keyword}`,
      query: { keyword: data.keyword },
    });
  };

  console.log(router);

  return (
    <Nav variants={navVariants} initial={"top"} animate={navAnimation}>
      <Col>
        <Logo onClick={() => router.push("/movieApp")}>
          MOVIE
          <br />
          <div>APP</div>
        </Logo>
        <Items>
          <Item>
            <Link href="/movieApp">Home</Link>
            {router?.pathname === "/" && <Line layoutId="line" />}
          </Item>
          <Item>
            <Link href="/series">Tv Series</Link>
            {router?.pathname === "/series" && <Line layoutId="line" />}
          </Item>
        </Items>
      </Col>
      <Col>
        <Search onSubmit={handleSubmit(onValid)}>
          <motion.svg
            onClick={onToggleSearch}
            animate={{ x: searchOpen ? -180 : 0 }}
            transition={{ type: "linear" }}
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            />
          </motion.svg>
          <Input
            {...register("keyword", { required: true, minLength: 2 })}
            animate={searchAnimation}
            initial={{ scaleX: 0 }}
            transition={{ type: "linear" }}
            placeholder="Search for movie or tv series"
          />
        </Search>
      </Col>
    </Nav>
  );
};

export default Header;
