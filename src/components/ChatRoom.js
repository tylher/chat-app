import React, { useState, useEffect } from "react";
import { useMessagesContext } from "../helpers/MessageContext";

const ChatRoom = ({ username, stompClient }) => {
  const { messages, updateMessages } = useMessagesContext();
  const [chatMessage, setChatMessage] = useState("");
  const colors = [
    "#2196F3",
    "#32c787",
    "#00BCD4",
    "#ff5652",
    "#ffc107",
    "#ff85af",
    "#FF9800",
    "#39bbb0",
  ];

  const handleChange = (e) => {
    setChatMessage(e.target.value);
    e.preventDefault();
  };

  const handleClick = () => {
    stompClient.send(
      "/app/chat.sendMessage",
      {},
      JSON.stringify({
        type: "CHAT",
        content: chatMessage,
        sender: username,
      })
    );
  };

  return (
    <div>
      <div>
        {messages &&
          messages.map((msg) => {
            return <p>{msg}</p>;
          })}
      </div>
      <div>
        <input onChange={handleChange} />
        <button type="submit" onClick={handleClick}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
