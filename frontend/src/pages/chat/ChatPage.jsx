import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function ChatPage() {
  const { appointmentId } = useParams();
  const role = localStorage.getItem("role");

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const bottomRef = useRef(null);

  // 🔹 FETCH MESSAGES
  useEffect(() => {
  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `http://localhost:5000/api/messages/${appointmentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessages(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  fetchMessages();
}, [appointmentId]);
  // 🔹 AUTO SCROLL
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 🔹 SEND MESSAGE
 const sendMessage = async () => {
  if (!input.trim()) return;

  try {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    const res = await axios.post(
      "http://localhost:5000/api/messages",
      {
        appointmentId,
        sender: role,
        text: input,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setMessages((prev) => [...prev, res.data]);
    setInput("");
  } catch (err) {
    console.log(err);
  }
};

  return (
    <div style={styles.page}>
      <div style={styles.chatWrapper}>

        {/* HEADER */}
        <div style={styles.header}>
          <div style={styles.headerLeft}>
            <button style={styles.backBtn}>←</button>

            <div style={styles.avatarCircle}>D</div>

            <div>
              <h3 style={styles.name}>Dr. Ahmed</h3>
              <p style={styles.status}>Approved Appointment Chat</p>
            </div>
          </div>

          <div style={styles.headerActions}>
            <button style={styles.iconBtn}>📞</button>
            <button style={styles.iconBtn}>🎥</button>
          </div>
        </div>

        {/* MESSAGES */}
        <div style={styles.messagesArea}>
          {messages.map((msg) => (
            <div
              key={msg._id || msg.id}
              style={{
                ...styles.messageRow,
        justifyContent:
  msg.sender === role ? "flex-end" : "flex-start",
              }}
            >
              <div
                style={{
                  ...styles.messageBubble,
                  ...(msg.sender === role
                    ? styles.userBubble
                    : styles.vetBubble),
                }}
              >
                <p style={styles.messageText}>{msg.text}</p>
                <span style={styles.messageTime}>
                  {new Date(msg.createdAt).toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}

          {/* 🔥 AUTO SCROLL TARGET */}
          <div ref={bottomRef}></div>
        </div>

        {/* INPUT */}
        <div style={styles.inputBar}>
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={styles.input}
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
          />

          <button style={styles.sendBtn} onClick={sendMessage}>
            Send
          </button>
        </div>

      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f3f6fb",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    fontFamily: "Segoe UI, sans-serif",
  },

  chatWrapper: {
    width: "100%",
    maxWidth: "900px",
    height: "88vh",
    background: "white",
    borderRadius: "22px",
    boxShadow: "0 20px 45px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "18px 22px",
    borderBottom: "1px solid #eef1f5",
  },

  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
  },

  backBtn: {
    border: "none",
    background: "#f3f6fb",
    width: "40px",
    height: "40px",
    borderRadius: "10px",
    cursor: "pointer",
  },

  avatarCircle: {
    width: "46px",
    height: "46px",
    borderRadius: "50%",
    background: "#2563eb",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
  },

  name: {
    margin: 0,
    fontSize: "18px",
    fontWeight: "700",
  },

  status: {
    margin: "4px 0 0 0",
    color: "#6b7280",
    fontSize: "13px",
  },

  headerActions: {
    display: "flex",
    gap: "10px",
  },

  iconBtn: {
    border: "none",
    background: "#f3f6fb",
    width: "42px",
    height: "42px",
    borderRadius: "12px",
    cursor: "pointer",
  },

  messagesArea: {
    flex: 1,
    padding: "24px",
    overflowY: "auto",
    background: "#f8fafc",
  },

  messageRow: {
    display: "flex",
    marginBottom: "14px",
  },

  messageBubble: {
    maxWidth: "68%",
    padding: "12px",
    borderRadius: "16px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.05)",
    display: "flex",
    flexDirection: "column",
  },

  userBubble: {
    background: "#2563eb",
    color: "white",
    borderBottomRightRadius: "6px",
  },

  vetBubble: {
    background: "#ffffff",
    color: "#111827",
    borderBottomLeftRadius: "6px",
  },

  messageText: {
    margin: 0,
    fontSize: "14px",
  },

  messageTime: {
    fontSize: "11px",
    opacity: 0.7,
    alignSelf: "flex-end",
  },

  inputBar: {
    display: "flex",
    gap: "12px",
    padding: "16px",
    borderTop: "1px solid #eef1f5",
  },

  input: {
    flex: 1,
    border: "1px solid #dbe2ea",
    borderRadius: "14px",
    padding: "12px",
  },

  sendBtn: {
    border: "none",
    background: "#2563eb",
    color: "white",
    borderRadius: "14px",
    padding: "12px 20px",
    cursor: "pointer",
  },
};