export type ChatMessageAPIType = {
  message: string;
  photo: string;
  userId: number;
  userName: string;
};
export type ChatMessageType = ChatMessageAPIType & { id: string };

export type MessagesSubscriberType = (message: ChatMessageAPIType[]) => void;
export type StatusSubscriberType = (status: ChatStatusType) => void;

export type ChatStatusType = "pending" | "ready" | "error";
export type EventChatType = "messages-recived" | "status-changed";

let ws: WebSocket | null = null;
let subscribers = {
  "messages-recived": [] as MessagesSubscriberType[],
  "status-changed": [] as StatusSubscriberType[],
};

const wsCloseHandler = () => {
  console.log("WS CLOSE");
  setTimeout(() => {
    createChannel();
  }, 3000);
};

const newMessageHandler = (e: MessageEvent) => {
  const newMessages = JSON.parse(e.data);
  subscribers["messages-recived"].forEach((s) => s(newMessages));
};

const notifyStatus = (status: ChatStatusType) => {
  subscribers["status-changed"].forEach((s) => s(status));
};

const wsOpenHandler = () => {
  notifyStatus("ready");
};

const wsErrorHandler = () => {
  notifyStatus("error");
};

const cleanUp = () => {
  notifyStatus("pending");
  ws?.removeEventListener("close", wsCloseHandler);
  ws?.removeEventListener("message", newMessageHandler);
  ws?.removeEventListener("open", wsOpenHandler);
  ws?.removeEventListener("error", wsErrorHandler);
};

const createChannel = () => {
  cleanUp();
  ws?.close();
  ws = new WebSocket(
    "wss://social-network.samuraijs.com/handlers/ChatHandler.ashx"
  );
  ws.addEventListener("close", wsCloseHandler);
  ws.addEventListener("message", newMessageHandler);
  ws.addEventListener("open", wsOpenHandler);
  ws.addEventListener("error", wsErrorHandler);
};

export const chatApi = {
  subscribe(
    eventName: EventChatType,
    callback: MessagesSubscriberType | StatusSubscriberType
  ) {
    //@ts-ignore
    subscribers[eventName].push(callback);
  },
  unsubscribe(
    eventName: EventChatType,
    callback: MessagesSubscriberType | StatusSubscriberType
  ) {
    //@ts-ignore
    subscribers[eventName] = subscribers[eventName].filter(
      //@ts-ignore
      (s) => s !== callback
    );
  },
  start() {
    createChannel();
  },
  stop() {
    cleanUp();
    ws?.close();
  },
  sendMessage(message: string) {
    ws?.send(message);
  },
};
