import React from "react";
import { Form, Input, Button } from "antd";
import { useLoginMutation } from "../store/api/authApi";
import { LoginModel } from "../types/authType";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function LoginForm() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [login, { isLoading }] = useLoginMutation();

  const handleFinish = async (input: LoginModel) => {
    try {
      await login(input).unwrap();
      navigate(`/topic`);
    } catch (error) {
      console.error(error);
    }
  };

  const LoginFormContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 100px;
  `;

  return (
    <LoginFormContainer>
      <img
        src="../logo.png"
        alt=""
        width={300}
        style={{ objectFit: "cover" }}
      />
      <Form form={form} onFinish={handleFinish}>
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

export default LoginForm;
