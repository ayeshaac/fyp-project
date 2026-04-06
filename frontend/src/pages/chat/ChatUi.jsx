import React, { useState, useEffect } from "react";
import axios from "axios";

const ChatUi = () => {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // ✅ LOAD CHATS (Appointments)
  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:5000/api/appointments/vet", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setChats(res.data);
        if (res.data.length > 0) {
          setSelectedChat(res.data[0]);
          loadMessages(res.data[0]._id);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  // ✅ LOAD MESSAGES
  const loadMessages = (appointmentId) => {
    const token = localStorage.getItem("token");

    axios
      .get(`http://localhost:5000/api/messages/${appointmentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setMessages(res.data);
      })
      .catch((err) => console.log(err));
  };

  // ✅ SEND MESSAGE
  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const token = localStorage.getItem("token");

    axios
      .post(
        "http://localhost:5000/api/messages",
        {
          appointmentId: selectedChat._id,
          text: newMessage,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        setMessages([...messages, res.data]);
        setNewMessage("");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }

        .app {
          display: flex;
          height: 100vh;
          background: #d1d7db;
          font-family: "Segoe UI", sans-serif;
        }

        .main-box {
          margin: auto;
          width: 90%;
          height: 90%;
          background: white;
          display: flex;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(0,0,0,0.2);
        }

        .left {
          width: 30%;
          background: #f0f2f5;
          display: flex;
          flex-direction: column;
        }

        .left-header {
          padding: 15px;
          background: #ededed;
        }

        .search {
          padding: 10px;
        }

        .search input {
          width: 100%;
          padding: 8px;
          border-radius: 8px;
          border: none;
          background: #f6f6f6;
        }

        .chat-item {
          display: flex;
          align-items: center;
          padding: 12px;
          cursor: pointer;
        }

        .chat-item:hover {
          background: #e9edef;
        }

        .avatar {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          background: #ccc;
          margin-right: 10px;
        }

        .chat-info {
          flex: 1;
        }

        .chat-name {
          font-weight: 600;
        }

        .chat-last {
          font-size: 13px;
          color: #666;
        }

        .chat-time {
          font-size: 12px;
          color: #888;
        }

        .right {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .right-header {
          padding: 15px;
          display: flex;
          justify-content: space-between;
          background: #ededed;
          align-items: center;
        }

        .messages {
          flex: 1;
          padding: 20px;
          overflow-y: auto;
          background: #efeae2;
        }

        .msg {
          margin-bottom: 12px;
          display: flex;
        }

        .msg.left { justify-content: flex-start; }
        .msg.right { justify-content: flex-end; }

        .bubble {
          padding: 10px 14px;
          border-radius: 10px;
          max-width: 60%;
        }

        .left-bubble { background: white; }
        .right-bubble { background: #d9fdd3; }

        .input-box {
          padding: 10px;
          display: flex;
          background: #f0f2f5;
        }

        .input-box input {
          flex: 1;
          padding: 10px;
          border-radius: 20px;
          border: none;
        }

        .input-box button {
          margin-left: 10px;
          background: #00a884;
          color: white;
          border: none;
          padding: 10px 16px;
          border-radius: 50%;
          cursor: pointer;
        }
          .bubble {
  position: relative;
}

.time {
  font-size: 10px;
  color: #666;
  margin-top: 5px;
  text-align: right;
}
      `}</style>

      <div className="app">
        <div className="main-box">

          {/* LEFT */}
          <div className="left">
            <div className="left-header">Chats</div>

            <div className="search">
              <input placeholder="Search..." />
            </div>

            {chats.map((chat) => (
              <div
                key={chat._id}
                className="chat-item"
                onClick={() => {
                  setSelectedChat(chat);
                  loadMessages(chat._id);
                }}
              >
                <div className="avatar"></div>

                <div className="chat-info">
                 <div className="chat-name">
  {chat.userId?.name || "User"}
</div>
                  <div className="chat-last">
                    Start conversation...
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT */}
          <div className="right">
            <div className="right-header">
            <span>
  {selectedChat?.userId?.name || "Chat"}
</span>
              <div>📞 🎥 ⋮</div>
            </div>

            <div className="messages">
     {messages.map((m, i) => {
  // 👉 LAST MESSAGE = YOUR MESSAGE (temporary logic)
  const isMine = i === messages.length - 1;

  return (
    <div
      key={i}
      className={`msg ${isMine ? "right" : "left"}`}
    >
      <div
        className={`bubble ${
          isMine ? "right-bubble" : "left-bubble"
        }`}
      >
        {m.text}

        <div
          style={{
            fontSize: "11px",
            marginTop: "4px",
            textAlign: "right",
            color: "#555",
          }}
        >
          {new Date(m.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </div>
  );
})}

            </div>

            <div className="input-box">
              <input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message"
              />
              <button onClick={sendMessage}>➤</button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default ChatUi;