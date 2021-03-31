import { authApi, securityApi } from "../../api/api";
import { FormApi, FORM_ERROR } from "final-form";
import { setInitApp } from "./init";
import {
  AuthUserType,
  CallbackFormType,
  LoginFormDataType,
  ProfileType,
  ResultCodesEnum,
  ResultCodeWithCaptcha,
} from "../../types/types";
import { ThunkAction } from "redux-thunk";
import { AppStateType } from "../reducers";

export const authActions = {
  setAuth: () => {
    return {
      type: "SET_IS_AUTH",
    } as const;
  },
  setAuthtUser: (authUser: AuthUserType) => {
    return {
      type: "SET_AUTH_USER",
      payload: { authUser },
    } as const;
  },
  setLogout: () => {
    return {
      type: "SET_LOGOUT",
    } as const;
  },
  setSubmitting: (isSubmiting: boolean) => {
    return {
      type: "SET_SUBMITTING",
      payload: { isSubmiting },
    } as const;
  },
  setCaptchaSucsess: (captchaUrl: string) => {
    return {
      type: "SET_CAPTCHA_SUCSESS",
      payload: { captchaUrl },
    } as const;
  },
  setInitApp,
};

type ActionsCreatorsTypes<T> = T extends { [key: string]: infer U } ? U : never;
export type AuthActionTypes = ReturnType<
  ActionsCreatorsTypes<typeof authActions>
>;

type ThunkAcionType = ThunkAction<
  Promise<void>,
  AppStateType,
  unknown,
  AuthActionTypes
>;

export const setUser = (): ThunkAcionType => async (dispatch) => {
  const data = await authApi.getIsAuth();
  if (data.resultCode === ResultCodesEnum.success) {
    dispatch(authActions.setAuthtUser(data.data));
    dispatch(authActions.setAuth());
  }
  dispatch(setInitApp());
};

export const takeCaptchaUrl = (): ThunkAcionType => async (dispatch) => {
  const data = await securityApi.getCaptchaUrl();
  dispatch(authActions.setCaptchaSucsess(data.url));
};

export const authorization = (
  formData: LoginFormDataType,
  form: FormApi<LoginFormDataType>,
  callback?: CallbackFormType
): ThunkAcionType => async (dispatch) => {
  dispatch(authActions.setSubmitting(true));
  const data = await authApi.setAuthUser(formData);
  if (data.resultCode !== ResultCodesEnum.success) {
    if (data.resultCode === ResultCodeWithCaptcha.needCaptcha) {
      dispatch(takeCaptchaUrl());
    }
    if (callback) {
      callback({ [FORM_ERROR]: data.messages[0] });
    }
    dispatch(authActions.setSubmitting(false));
  } else {
    dispatch(authActions.setAuth());
    dispatch(authActions.setSubmitting(false));
  }
};

export const logout = (): ThunkAcionType => async (dispatch) => {
  const data = await authApi.logout();
  if (data.resultCode === ResultCodesEnum.success) {
    dispatch(authActions.setLogout());
  }
};
