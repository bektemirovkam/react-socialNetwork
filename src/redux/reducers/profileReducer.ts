import { ProfileType, StatusType } from "../../types/types";
import { ProfileActionsTypes } from "../actions/profile";

type InitialStateType = typeof initalState;

const initalState = {
  profile: null as ProfileType | null,
  status: "" as StatusType,
  isLoading: false,
};

const profileReducer = (
  state = initalState,
  action: ProfileActionsTypes
): InitialStateType => {
  switch (action.type) {
    case "SET_PROFILE":
    case "SET_STATUS":
    case "SET_PROFILE_LOADING": {
      return {
        ...state,
        ...action.payload,
      };
    }
    case "SET_AVATAR": {
      return {
        ...state,
        profile: {
          ...state.profile,
          photos: { ...action.payload },
        } as ProfileType,
      };
    }
    default: {
      return state;
    }
  }
};

export default profileReducer;
