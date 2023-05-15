import { ChangeEvent, useEffect, useState } from "react";
import { Input } from "antd";
import styled from "styled-components";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "react-query";
import Head from "next/head";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { usersAPIs } from "@/api";
import { useIsMobile } from "@/hooks";
import { Button } from "@/components/movieApp/atoms/button";
import LayoutUnauth from "@/components/movieApp/template/LayoutUnauth";

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
  margin-bottom: 40px;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;

  gap: 10px;
`;
const DescMessage = styled.p<{ isError: boolean }>`
  color: ${(props) =>
    props.isError ? props.theme.color.error : props.theme.color.textDeepSub};
  margin: 4px 0;
`;

const Join = () => {
  const isMobileSize = useIsMobile();

  const inputWidth = isMobileSize ? "100%" : "400px";
  const inputHeight = "60px";

  // NOTE Form valid
  const yupSchema = yup.object({
    userId: yup
      .string()
      .required("아이디를 입력해주세요")
      .min(4, "아이디는 4~12자리로 입력해주세요")
      .max(12, "아이디는 4~12자리로 입력해주세요"),
    password: yup.string().required("비밀번호를 입력해주세요"),
    passwordCheck: yup
      .string()
      .oneOf([yup.ref("password")], "비밀번호가 일치하지 않습니다")
      .required("비밀번호를 한번 더 입력해주세요"),
  });
  interface IUser {
    userId: string;
    password: string;
    passwordCheck?: string;
  }
  const {
    control,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm<IUser>({ resolver: yupResolver(yupSchema) });

  // Join페이지 진입 시 '아이디'input 자동 focus
  useEffect(() => {
    setFocus("userId", { shouldSelect: true });
  }, [setFocus]);

  // NOTE POST] 유저 생성
  const createUser = async (user: IUser) => usersAPIs.createUser(user);
  const { mutate: userMutate } = useMutation(createUser, {
    onMutate: (variables) => console.log("onMutate", variables),
    onError: (error) => console.log("err", error),
    onSuccess: (data, variables, context) => {
      // 성공 alert
      // 로그인페이지로 이동
      console.log("onSuccess", data, variables, context), alert("success");
    },
  });

  // NOTE 회원가입 클릭 시
  const onSubmit = (user: IUser) => {
    const makeUser = {
      userId: user.userId,
      password: user.password,
    };
    userMutate(makeUser);
  };

  return (
    <LayoutUnauth>
      <Container>
        <Head>
          <title>회원가입</title>
        </Head>
        <Title>회원가입</Title>
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
          <DescMessage isError={errors.userId ? true : false}>
            {errors.userId?.message
              ? errors.userId.message
              : "아이디는 4~12자리로 입력해주세요 ✓"}
          </DescMessage>
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
          {errors.password ? (
            <DescMessage isError={errors.password ? true : false}>
              {errors.password.message}
            </DescMessage>
          ) : null}
          <Controller
            name="passwordCheck"
            control={control}
            render={({ field }) => (
              <Input.Password
                {...field}
                placeholder="비밀번호 확인"
                style={{ width: inputWidth, height: inputHeight }}
              />
            )}
          />
          {errors.passwordCheck ? (
            <DescMessage isError={errors.passwordCheck ? true : false}>
              {errors.passwordCheck.message}
            </DescMessage>
          ) : null}
          <Button
            text="회원가입"
            width={inputWidth}
            height={inputHeight}
            margin="10px 0 0 0"
            disable={!Object.keys(errors).length ? false : true}
          />
        </Form>
      </Container>
    </LayoutUnauth>
  );
};

export default Join;
