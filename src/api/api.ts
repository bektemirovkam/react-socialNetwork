import axios from "axios";
import {
  AuthUserType,
  GetCaptchaUrlType,
  GetUsersResponseType,
  LoginFormDataType,
  ProfilePhotosType,
  ProfileType,
  ResponseDataType,
  ResultCodesEnum,
  ResultCodeWithCaptcha,
  StatusType,
} from "../types/types";

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.0",
  withCredentials: true,
  headers: {
    "API-KEY": "d523b7cb-c64a-4ba9-be46-aedea47a9708",
  },
});

export const authApi = {
  setAuthUser: (formData: LoginFormDataType) => {
    return instance
      .post<ResponseDataType<{}, ResultCodesEnum | ResultCodeWithCaptcha>>(
        "/auth/login",
        formData
      )
      .then(({ data }) => data);
  },
  getIsAuth: () => {
    return instance
      .get<ResponseDataType<AuthUserType>>("/auth/me")
      .then(({ data }) => data);
  },
  logout: () => {
    return instance
      .delete<ResponseDataType<{}>>("/auth/login")
      .then(({ data }) => data);
  },
};

export const profileApi = {
  getProfile: (userId: number) => {
    return instance
      .get<ProfileType>(`/profile/${userId}`)
      .then(({ data }) => data);
  },
  getStatus: (userId: number) => {
    return instance
      .get<string>(`/profile/status/${userId}`)
      .then(({ data }) => data);
  },
  editStatus: (newStatus: { status: StatusType }) => {
    return instance
      .put<ResponseDataType<{}>>(`/profile/status`, newStatus)
      .then(({ data }) => data);
  },
  editPhoto: (formData: object) => {
    return instance
      .put<ResponseDataType<{ photos: ProfilePhotosType }>>(
        `/profile/photo`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then(({ data }) => data);
  },
  editProfile: (formData: ProfileType) => {
    return instance
      .put<ResponseDataType<{}>>("/profile", formData)
      .then(({ data }) => data);
  },
};

export const friendsApi = {
  getFriends: (count = 50, page = 1, term = "", friend = "all") => {
    return instance
      .get<GetUsersResponseType>(
        `/users?count=${count}&page=${page}` +
          `${term.length > 0 ? `&term=${term}` : ""}` +
          `${friend !== "all" ? `&friend=${friend}` : ""}`
      )
      .then(({ data }) => data);
  },
  setFollow: (id: number) => {
    return instance
      .post<ResponseDataType<{}>>(`/follow/${id}`)
      .then(({ data }) => data);
  },
  setUnfollow: (id: number) => {
    return instance
      .delete<ResponseDataType<{}>>(`/follow/${id}`)
      .then(({ data }) => data);
  },
};

export const securityApi = {
  getCaptchaUrl: () => {
    return instance
      .get<GetCaptchaUrlType>("/security/get-captcha-url")
      .then(({ data }) => data);
  },
};
