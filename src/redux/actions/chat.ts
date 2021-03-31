import {
  chatApi,
  ChatMessageAPIType,
  ChatStatusType,
  MessagesSubscriberType,
  StatusSubscriberType,
} from "../../api/chat";
import { ThunkAction } from "redux-thunk";
import { AppStateType } from "../reducers";
import { Dispatch } from "redux";

type ActionsCreatorsTypes<T> = T extends { [key: string]: infer U } ? U : never;
export type chatActionTypes = ReturnType<
  ActionsCreatorsTypes<typeof chatActions>
>;
type ThunkAcionType = ThunkAction<
  Promise<void>,
  AppStateType,
  unknown,
  chatActionTypes
>;

export const chatActions = {
  setMessages(messages: ChatMessageAPIType[]) {
    return {
      type: "SET_NEW_MESSAGES",
      payload: messages,
    } as const;
  },
  statusChanged(status: ChatStatusType) {
    return {
      type: "STATUS_CHANGED",
      payload: status,
    } as const;
  },
};

let _newMessagesHandler: MessagesSubscriberType | null = null;

const newMessagesHandlerCreator = (dispatch: Dispatch) => {
  if (!_newMessagesHandler) {
    _newMessagesHandler = (messages: ChatMessageAPIType[]) => {
      dispatch(chatActions.setMessages(messages));
    };
  }
  return _newMessagesHandler;
};

let _statusChangedHander: StatusSubscriberType | null = null;

const newStatusChangedHandler = (dispatch: Dispatch) => {
  if (!_statusChangedHander) {
    _statusChangedHander = (status: ChatStatusType) => {
      dispatch(chatActions.statusChanged(status));
    };
  }
  return _statusChangedHander;
};

export const startChatListening = (): ThunkAcionType => async (dispatch) => {
  chatApi.start();
  chatApi.subscribe("messages-recived", newMessagesHandlerCreator(dispatch));
  chatApi.subscribe("status-changed", newStatusChangedHandler(dispatch));
};

export const stopChatListening = (): ThunkAcionType => async (dispatch) => {
  chatApi.stop();
  chatApi.unsubscribe("messages-recived", newMessagesHandlerCreator(dispatch));
  chatApi.unsubscribe("status-changed", newStatusChangedHandler(dispatch));
};

export const sendNewMessage = (message: string): ThunkAcionType => async (
  dispatch
) => {
  chatApi.sendMessage(message);
};
