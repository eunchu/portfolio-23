import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import styled from "styled-components";
import { Input, notification } from "antd";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";

import { useIsMobile } from "@/hooks";
import LayoutUnauth from "@/components/movieApp/template/LayoutUnauth";
import { Button } from "@/components/movieApp/atoms/button";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  height: calc(100% - 140px);

  font-family: "Noto Sans KR";
`;
const Title = styled.h2`
  font-size: 40px;
`;
const Desc = styled.p`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  line-height: 20px;

  color: ${(props) => props.theme.color.textDeepSub};

  margin-top: 10px;
  margin-bottom: 40px;
`;
const Info = styled.span`
  color: ${(props) => props.theme.color.textSub};
  text-align: left;

  margin-top: 10px;
  user-select: text;
`;
const Form = styled.form`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 0 4%;
  gap: 10px;
`;
const GoJoin = styled.p`
  font-size: 14px;
  color: ${(props) => props.theme.color.textDeepSub};

  margin-top: 30px;
  padding: 0 4%;
`;
const Join = styled.span`
  color: ${(props) => props.theme.color.textSub};

  margin-left: 20px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const Login = () => {
  const router = useRouter();
  const isMobileSize = useIsMobile();
  const [api, contextHolder] = notification.useNotification();

  const inputWidth = isMobileSize ? "100%" : "400px";
  const inputHeight = "60px";

  interface IUser {
    userId: string;
    password: string;
  }
  const { control, handleSubmit, setFocus, watch } = useForm<IUser>();

  useEffect(() => {
    setFocus("userId", { shouldSelect: true });
  }, [setFocus]);

  // NOTE 로그인 클릭 시
  const onSubmit = async (user: IUser) => {
    if (user.userId && user.password) {
      try {
        const result = await signIn("credentials", {
          // 로그인 실패 시 새로고침 여부
          redirect: false,
          id: "sdf",
          userId: user.userId,
          password: user.password,
        });
        // authorize()에서 날린 throw new Error('')가 result.error로 들어옴
        if (result?.error) {
          return api.error({
            message: result.error,
            placement: "bottomRight",
          });
        }
        router.push("/movieApp");
      } catch (error) {
        console.log("login error", error);
      }
    }
  };

  return (
    <LayoutUnauth>
      <Container>
        <Head>
          <title>로그인</title>
        </Head>
        <Title>ID 로그인</Title>
        <Desc>
          회원가입 또는, 아래 계정 정보를 입력하면
          <br />
          포트폴리오를 둘러보실 수 있습니다 💗
          <Info>
            ID: guest
            <br />
            PASSWORD: 1
          </Info>
        </Desc>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="userId"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="아이디"
                style={{ width: inputWidth, height: inputHeight }}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input.Password
                {...field}
                placeholder="비밀번호"
                style={{ width: inputWidth, height: inputHeight }}
              />
            )}
          />
          <Button
            text="로그인"
            disable={watch("userId") && watch("password") ? false : true}
            width={inputWidth}
            height={inputHeight}
            margin="10px 0 0 0"
          />
        </Form>
        <GoJoin>
          아직 계정이 없으신가요?{" "}
          <Link href={"/movieApp/join"}>
            <Join>회원가입하기</Join>
          </Link>
        </GoJoin>
      </Container>
      {contextHolder}
    </LayoutUnauth>
  );
};

export default Login;
