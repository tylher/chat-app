import "./App.css";
import JoinRoom from "./components/JoinRoom";
import ChatRoom from "./components/ChatRoom";
import { useState } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { useMessagesContext } from "./helpers/MessageContext";

function App() {
  const [stompClient, setStompClient] = useState(null);
  const [connected, setConnected] = useState(false);
  const [inputUsername, setInputUsername] = useState("");
  const { messages, updateMessages } = useMessagesContext();
  // var stomp;
  const joinRoom = (username) => {
    const socket = new SockJS("http://localhost:8080/ws");
    const stomp = Stomp.over(socket);

    stomp.connect({}, () => onConnected(stomp, username));
  };

  const onConnected = (stomp, username) => {
    setStompClient(stomp);
    setInputUsername(username);
    setConnected(true);

    stomp.subscribe("/topic/public", (payload) => {
      let message = JSON.parse(payload.body);
      let newMessage;

      if (message.type === "JOIN") {
        if (message.sender == username) {
          message.content = "You joined!";
          newMessage = message.content;
        } else {
          message.content = message.sender + " joined!";
          newMessage = message.content;
        }
      } else if (message.type === "LEAVE") {
        console.log(message);
        message.content = message.sender + " left";
        newMessage = message.content;
      } else {
        let message = JSON.parse(payload.body);
        newMessage = message.sender + ": " + message.content;
      }
      updateMessages(newMessage);
    });

    stomp.send(
      "/app/chat.addUser",
      {},
      JSON.stringify({
        type: "JOIN",
        sender: username,
      })
    );
  };
  return (
    <div className="App">
      {connected ? (
        <ChatRoom username={inputUsername} stompClient={stompClient} />
      ) : (
        <JoinRoom onJoin={joinRoom} />
      )}
    </div>
  );
}

export default App;
