import { Button } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { ChatMessageType } from "../../api/chat";
import { useDispatch, useSelector } from "react-redux";
import { AppStateType } from "../../redux/reducers";
import {
  sendNewMessage,
  startChatListening,
  stopChatListening,
} from "../../redux/actions/chat";

const ChatPage: React.FC = () => {
  return (
    <div>
      <Chat />
    </div>
  );
};

const Chat: React.FC = () => {
  const dispatch = useDispatch();
  const status = useSelector((state: AppStateType) => state.chat.status);

  useEffect(() => {
    dispatch(startChatListening());
    return () => {
      dispatch(stopChatListening());
    };
  }, []);

  return (
    <div>
      {status === "error" && <span>Произошла ошибка</span>}
      {status === "pending" ? <span>Идет загрузка....</span> : <Messages />}
      <AddMessageForm />
    </div>
  );
};

const Messages: React.FC = () => {
  const messages = useSelector((state: AppStateType) => state.chat.messages);
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(false);
  const messagesBottom = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (autoScrollEnabled) {
      messagesBottom.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [messages]);

  const scrollHandler = (e: React.UIEvent<HTMLElement>) => {
    const target = e.currentTarget;
    if (
      Math.abs(target.scrollHeight - target.scrollTop - target.clientHeight) <
      800
    ) {
      !autoScrollEnabled && setAutoScrollEnabled(true);
    } else {
      autoScrollEnabled && setAutoScrollEnabled(false);
    }
  };

  return (
    <div
      style={{ height: "400px", overflowY: "auto" }}
      onScroll={scrollHandler}
    >
      {messages.map((m, index) => (
        <Message message={m} key={m.id} />
      ))}
      <div ref={messagesBottom}></div>
    </div>
  );
};

const Message: React.FC<{ message: ChatMessageType }> = React.memo(
  ({ message }) => {
    console.log(">>>>MEssage");
    return (
      <div>
        <a href={`profile/${message.userId}`}>
          <img src={message.photo} alt="" style={{ width: "30px" }} />
        </a>
        <span>{message.userName}</span>
        <br />
        {message.message}
        <hr />
      </div>
    );
  }
);

const AddMessageForm: React.FC = () => {
  const [message, setMessage] = useState("");
  const status = useSelector((state: AppStateType) => state.chat.status);
  const dispatch = useDispatch();

  const sendMessageHandler = () => {
    if (!message) {
      return;
    }
    dispatch(sendNewMessage(message));
    setMessage("");
  };
  return (
    <form>
      <textarea
        name="message"
        id=""
        cols={60}
        rows={5}
        onChange={(e) => {
          setMessage(e.currentTarget.value);
        }}
        value={message}
      ></textarea>
      <Button
        type="primary"
        onClick={sendMessageHandler}
        disabled={status !== "ready"}
      >
        Send
      </Button>
    </form>
  );
};

export default ChatPage;
