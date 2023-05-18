import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import { motion, useAnimation, useScroll } from "framer-motion";
import { useForm } from "react-hook-form";
import { useSession, signOut } from "next-auth/react";
import { Popover, notification } from "antd";
import { useQuery } from "react-query";
import { usersAPIs } from "@/apis";

notification.config({
  maxCount: 1,
});

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
  font-size: 14px;

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
const Search = styled.form<{ session: boolean }>`
  position: relative;

  display: flex;
  align-items: center;

  color: white;
  svg {
    height: 25px;
  }
  margin-right: ${(props) => (props.session ? "10px" : "0")};
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
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  color: white;

  padding: 8px 4px 8px 34px;
  z-index: -1;

  ::placeholder {
    color: #ababab;
  }
`;
const ProfileImage = styled.div`
  width: 26px;
  height: 26px;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: #dddddd;
  color: #111111;
  font-size: 16px;
  font-weight: bold;
  border-radius: 4px;

  cursor: pointer;
`;
const UserMenuContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 160px;

  color: #ffffff;
  padding: 12px 0;
`;
const UserInfo = styled.div`
  display: flex;
  align-items: center;

  border-bottom: 1px solid #6b6b6b;

  padding: 0 12px 10px 12px;
  margin-bottom: 10px;
`;
const UserName = styled.div`
  margin-left: 10px;
`;
const UserMenuBox = styled.ul``;
const UserMenu = styled.li`
  text-indent: 12px;
  margin: 4px 0;
  padding: 4px 0;

  cursor: pointer;
  &:hover {
    background-color: #525252;
    color: #ffffff;
  }
`;
// commons
const Col = styled.div`
  display: flex;
  align-items: center;
`;

const Header = () => {
  const { data: session } = useSession();
  const [api, contextHolder] = notification.useNotification();
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
  const { register, handleSubmit, setFocus } = useForm<IForm>();
  setFocus("keyword", { shouldSelect: true });
  const onValid = (data: IForm) => {
    router.push({
      pathname: `/movieApp/search/${data.keyword}`,
      query: { keyword: data.keyword },
    });
  };

  // NOTE 유저 메뉴
  const userNameFirst = session?.user.userId.slice(0, 1);
  const userMenu = useMemo(() => {
    const handleNotification = () => {
      api.info({
        message: "준비중입니다 🔨",
        placement: "bottomRight",
      });
    };
    return (
      <UserMenuContainer>
        <UserInfo>
          <ProfileImage>{userNameFirst}</ProfileImage>
          <UserName>{session?.user.userId}</UserName>
        </UserInfo>
        <UserMenuBox>
          {/* <Link href={"/movieApp/myPage"}> */}
          <UserMenu onClick={handleNotification}>MY</UserMenu>
          {/* </Link> */}
          <UserMenu onClick={handleNotification}>고객센터</UserMenu>
          <UserMenu onClick={() => signOut({ callbackUrl: "/movieApp/login" })}>
            로그아웃
          </UserMenu>
        </UserMenuBox>
      </UserMenuContainer>
    );
  }, [api, session?.user.userId, userNameFirst]);

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
            <Link href="/">Home</Link>
            {router?.pathname === "/" && <Line layoutId="line" />}
          </Item>
          <Item>
            <Link href="/movieApp">Movie</Link>
            {router?.pathname === "/movieApp" && <Line layoutId="line" />}
          </Item>
          <Item>
            <Link href="/movieApp/series">Tv Series</Link>
            {router?.pathname === "/movieApp/series" && (
              <Line layoutId="line" />
            )}
          </Item>
        </Items>
      </Col>
      <Col>
        <Search
          onSubmit={handleSubmit(onValid)}
          session={session ? true : false}
        >
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
        {session ? (
          <Popover placement="bottomRight" content={userMenu} arrow={false}>
            <ProfileImage>{userNameFirst}</ProfileImage>
          </Popover>
        ) : null}
      </Col>
      {contextHolder}
    </Nav>
  );
};

export default Header;
