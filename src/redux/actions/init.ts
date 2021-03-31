export type SetInitAppActionType = {
  type: "SET_INIT";
};

export const setInitApp = (): SetInitAppActionType => {
  return {
    type: "SET_INIT",
  };
};

export type InitAppActionsType = SetInitAppActionType;
