import { ChatMessageType, ChatStatusType } from "../../api/chat";
import { chatActionTypes } from "../actions/chat";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  messages: [] as ChatMessageType[],
  status: "pending" as ChatStatusType,
};

type InitStateType = typeof initialState;

const chatReducer = (
  state = initialState,
  action: chatActionTypes
): InitStateType => {
  switch (action.type) {
    case "SET_NEW_MESSAGES": {
      return {
        ...state,
        messages: [
          ...state.messages,
          ...action.payload.map((m) => ({ ...m, id: uuidv4() })),
        ].filter(
          (m, index, array) => index >= array.length - 100 // сохраняем последние 100 сообщений
        ),
      };
    }
    case "STATUS_CHANGED": {
      return {
        ...state,
        status: action.payload,
      };
    }
    default:
      return state;
  }
};

export default chatReducer;
