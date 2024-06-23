import { useEffect, useState } from "react";
import "./App.css";
import io from "socket.io-client";
import Chat from "./commponents/Chat";
import axios from "axios";

const socket = io.connect("http://localhost:3001");
function App() {
  const [messages, setMessages] = useState([]);

  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get("http://localhost:3001/messages");
        setMessages(response.data);
        console.log("fromApi", response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [socket]);

  const fetchMessages = async () => {
    try {
      const response = await axios.get("http://localhost:3001/messages");
      setMessages(response.data);
      console.log("fromApi", response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      console.log(username, room);
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  console.log("first");
  return (
    <div className="App">
      {!showChat ? (
        <>
          <div className="joinChatContainer">
            <h3>Join a chat</h3>
            <input
              type="text"
              placeholder="John..."
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="text"
              placeholder="Room id..."
              onChange={(e) => setRoom(e.target.value)}
            />
            <button onClick={() => joinRoom()}>join chat</button>
          </div>
        </>
      ) : (
        <Chat
          socket={socket}
          username={username}
          room={room}
          messagesFromDB={messages}
          fetchMessages={fetchMessages}
        />
      )}
    </div>
  );
}

export default App;
