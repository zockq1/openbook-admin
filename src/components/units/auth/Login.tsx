import React from "react";

import { useLoginMutation } from "../../../store/api/authApi";
import { LoginModel } from "../../../types/authType";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  login as loginAction,
  setAccessToken,
  setRefreshToken,
} from "../../../store/slices/authSlice";
import { mutationErrorNotification } from "../../../services/errorNotification";
import LoginUI from "./LoginUI.container";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (input: LoginModel) => {
    try {
      const response = await login(input).unwrap();
      dispatch(setAccessToken(response.accessToken));
      dispatch(setRefreshToken(response.refreshToken));
      dispatch(loginAction());
      navigate(`/topic`);
    } catch (error: any) {
      mutationErrorNotification(error);
    }
  };

  return <LoginUI isLoading={isLoading} onSubmit={handleSubmit} />;
}

export default Login;
