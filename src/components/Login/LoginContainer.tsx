import React from "react";
import Login from "./Login";

import { useDispatch, useSelector } from "react-redux";
import { authorization } from "../../redux/actions/auth";
import { AppStateType } from "../../redux/reducers";
import { LoginFormDataType, OnSubmitType } from "../../types/types";

const LoginContainer = () => {
  const dispatch = useDispatch();
  const { isAuth, isSubmiting, captchaUrl, authUser } = useSelector(
    (state: AppStateType) => state.auth
  );

  const onSubmit: OnSubmitType<LoginFormDataType> = (
    formData,
    form,
    callback
  ) => {
    dispatch(authorization(formData, form, callback));
  };
  return (
    <Login
      onSubmit={onSubmit}
      isAuth={isAuth}
      authUserId={authUser && authUser.id}
      isSubmiting={isSubmiting}
      captchaUrl={captchaUrl}
    />
  );
};

export default LoginContainer;
