import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import CustomScrollToBottom from "./CustomScrollToBottom";

function Chat({ socket, username, room, messagesFromDB, fetchMessages }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (username !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
      fetchMessages();
    }
  };
  useEffect(() => {
    socket.on("recieve_message", (data) => {
      console.log(data);
      setMessageList((list) => [...list, data]);
      fetchMessages();
    });
  }, [socket]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        <CustomScrollToBottom className="message-container">
          {messagesFromDB &&
            messagesFromDB.map((messageContent) => {
              return (
                <div
                  className="message"
                  id={username === messageContent.author ? "you" : "other"}
                  key={Math.random(1000)}
                >
                  <div>
                    <div className="message-content">
                      <p>{messageContent.message}</p>
                    </div>
                    <div className="message-meta">
                      <p id="time">{messageContent.time}</p>
                      <p id="author">{messageContent.author}</p>
                    </div>
                  </div>
                </div>
              );
            })}
        </CustomScrollToBottom>
        {/* <ScrollToBottom className="message-container">
          {messagesFromDB &&
            messagesFromDB.map((messageContent) => {
              return (
                <div
                  className="message"
                  id={username === messageContent.author ? "you" : "other"}
                  key={Math.random(1000)}
                >
                  <div>
                    <div className="message-content">
                      <p>{messageContent.message}</p>
                    </div>
                    <div className="message-meta">
                      <p id="time">{messageContent.time}</p>
                      <p id="author">{messageContent.author}</p>
                    </div>
                  </div>
                </div>
              );
            })}
        </ScrollToBottom> */}
        {/* {messageList.map((messageContent) => {
            return (
              <div
                className="message"
                id={username === messageContent.author ? "you" : "other"}
                key={Math.random(1000)}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })} */}
      </div>
      <div className="chat-footer">
        <input
          type="text"
          placeholder="hey..."
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={() => sendMessage()}>&#9658;</button>
      </div>
    </div>
  );
}

export default Chat;
