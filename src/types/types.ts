import { FormApi, SubmissionErrors } from "final-form";

export type AuthUserType = {
  id: number | string;
  login: string;
  email: string;
};

export type FriendType = {
  name: string;
  id: number;
  uniqueUrlName: string | null;
  photos: ProfilePhotosType;
  status: StatusType;
  followed: boolean;
};

export type ProfileContactsType = {
  [key: string]: string | null | undefined;
};

export type ProfilePhotosType = {
  small: string | null;
  large: string | null;
};

export type ProfileType = {
  aboutMe: string | null;
  lookingForAJob: boolean;
  lookingForAJobDescription: string | null;
  fullName: string | null;
  userId: number;
  contacts: ProfileContactsType;
  photos: ProfilePhotosType;
};

export type StatusType = string | number | undefined;

export type CallbackFormType = (errors?: SubmissionErrors) => void;

export type LoginFormDataType = {
  captcha?: string;
  email: string;
  password: string;
  rememberMe: boolean;
};

export type ProfileFormDataType = {};

export type OnSubmitType<T, I = {}> = (
  values: T,
  form: FormApi<T, I>,
  callback?: CallbackFormType
) =>
  | SubmissionErrors
  | Promise<SubmissionErrors | undefined>
  | undefined
  | void;

export enum ResultCodesEnum {
  success = 0,
  error = 1,
}

export enum ResultCodeWithCaptcha {
  needCaptcha = 10,
}

export type GetUsersResponseType = {
  items: Array<FriendType>;
  totalCount: number;
  error: any;
};

export type GetCaptchaUrlType = {
  url: string;
};

export type ResponseDataType<T, RC = ResultCodesEnum> = {
  data: T;
  resultCode: RC;
  messages: Array<string>;
};
