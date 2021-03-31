import { profileApi } from "../../api/api";
import { FORM_ERROR } from "final-form";
import {
  CallbackFormType,
  ProfilePhotosType,
  ProfileType,
  ResultCodesEnum,
  StatusType,
} from "../../types/types";
import { ThunkAction } from "redux-thunk";
import { AppStateType } from "../reducers";

const profileActions = {
  setProfile: (profile: ProfileType) => {
    return {
      type: "SET_PROFILE",
      payload: { profile },
    } as const;
  },
  setStatus: (status: StatusType) => {
    return {
      type: "SET_STATUS",
      payload: { status },
    } as const;
  },
  setLoading: (isLoading: boolean) => {
    return {
      type: "SET_PROFILE_LOADING",
      payload: { isLoading },
    } as const;
  },
  setNewAvatar: (photos: ProfilePhotosType) => {
    return {
      type: "SET_AVATAR",
      payload: photos,
    } as const;
  },
};

type ActionCreatorsTypes<T> = T extends { [key: string]: infer U } ? U : never;
export type ProfileActionsTypes = ReturnType<
  ActionCreatorsTypes<typeof profileActions>
>;

export type ProfileThunkActionType = ThunkAction<
  Promise<void>,
  AppStateType,
  unknown,
  ProfileActionsTypes
>;

export const editStatus = (newStatus: {
  status: StatusType;
}): ProfileThunkActionType => async (dispatch) => {
  const data = await profileApi.editStatus(newStatus);
  if (data.resultCode === ResultCodesEnum.success) {
    dispatch(profileActions.setStatus(newStatus.status));
  }
};

export const getUserProfile = (
  id: number | null
): ProfileThunkActionType => async (dispatch) => {
  if (id) {
    dispatch(profileActions.setLoading(true));
    const profile = await profileApi.getProfile(id);
    dispatch(profileActions.setProfile(profile));
    dispatch(profileActions.setLoading(false));
  }
};
export const getUserStatus = (
  id: number | null
): ProfileThunkActionType => async (dispatch) => {
  if (id) {
    const status = await profileApi.getStatus(id);
    dispatch(profileActions.setStatus(status));
  }
};

export const changeAvatar = (formData: {}): ProfileThunkActionType => async (
  dispatch
) => {
  const data = await profileApi.editPhoto(formData);
  if (data.resultCode === ResultCodesEnum.success) {
    dispatch(profileActions.setNewAvatar(data.data.photos));
  }
};

export const changeProfile = (
  formData: ProfileType,
  form: any,
  callback: CallbackFormType
): ProfileThunkActionType => async (dispatch, getState) => {
  const data = await profileApi.editProfile(formData);
  if (data.resultCode === ResultCodesEnum.success) {
    const userId = getState().auth.authUser?.id;
    dispatch(getUserProfile(userId as number));
  } else {
    callback({ [FORM_ERROR]: data.messages[0] });
    return Promise.reject();
  }
};
