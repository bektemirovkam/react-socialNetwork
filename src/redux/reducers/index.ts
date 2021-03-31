import { combineReducers } from "redux";

import authReducer from "./authReducer";
import profileReducer from "./profileReducer";
import friendsReducer from "./friendsReducer";
import { initAppReducer } from "./initReducer";
import chatReducer from "./chatReducer";

const rootReducer = combineReducers({
  init: initAppReducer,
  auth: authReducer,
  profile: profileReducer,
  friends: friendsReducer,
  chat: chatReducer,
});

export type AppStateType = ReturnType<typeof rootReducer>;

export default rootReducer;
