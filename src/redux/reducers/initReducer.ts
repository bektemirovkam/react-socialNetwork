import { InitAppActionsType } from "../actions/init";

type initStateType = typeof initialState;

const initialState = {
  isInitApp: false,
};

export const initAppReducer = (
  state = initialState,
  action: InitAppActionsType
): initStateType => {
  switch (action.type) {
    case "SET_INIT": {
      return {
        isInitApp: true,
      };
    }

    default: {
      return state;
    }
  }
};
