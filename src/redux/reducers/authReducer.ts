import { AuthActionTypes } from "../actions/auth";

type AuthUser = {
  id: string | number;
  login: string;
  email: string;
};

const initialState = {
  isAuth: false,
  authUser: null as AuthUser | null,
  isSubmiting: false,
  captchaUrl: null as string | null,
};

type initStateType = typeof initialState;

const authReducer = (
  state = initialState,
  action: AuthActionTypes
): initStateType => {
  switch (action.type) {
    case "SET_CAPTCHA_SUCSESS":
    case "SET_AUTH_USER":
    case "SET_SUBMITTING": {
      return {
        ...state,
        ...action.payload,
      };
    }
    case "SET_IS_AUTH": {
      return {
        ...state,
        isAuth: true,
      };
    }
    case "SET_LOGOUT": {
      return {
        ...state,
        isAuth: false,
      };
    }
    default:
      return state;
  }
};

export default authReducer;
