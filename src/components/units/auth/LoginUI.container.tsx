import React from "react";
import { Form, Input, Button } from "antd";
import { LoginModel } from "../../../types/authType";
import styled from "styled-components";
import Logo from "../../commons/Logo";

const LoginFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
`;

interface LoginUIProps {
  onSubmit: (input: LoginModel) => Promise<void>;
  isLoading: boolean;
}

function LoginUI({ onSubmit, isLoading }: LoginUIProps) {
  return (
    <LoginFormContainer>
      <Logo />
      <Form onFinish={onSubmit}>
        <Form.Item
          name="loginId"
          rules={[{ required: true, message: "아이디를 입력해주세요" }]}
        >
          <Input placeholder="Id" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "비밀번호를 입력해주세요" }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item style={{ float: "right" }}>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            로그인
          </Button>
        </Form.Item>
      </Form>
    </LoginFormContainer>
  );
}

export default LoginUI;
