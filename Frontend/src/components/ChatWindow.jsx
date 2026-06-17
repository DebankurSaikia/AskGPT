import "./ChatWindow.css";

import Chat from "./Chat.jsx";

import { useContext, useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { ScaleLoader } from "react-spinners";

import { MyContext } from "../context/MyContext.jsx";

import { useAuth } from "../context/AuthContext.jsx";

import { sendMessage } from "../services/chatService.js";

function ChatWindow() {
  const {
    prompt,
    setPrompt,

    reply,
    setReply,

    currThreadId,

    setPrevChats,

    setNewChat,
  } = useContext(MyContext);

  const { user, logout } = useAuth();

  const userInitials = user?.name
    ? user.name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase()
    : "U";

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const getReply = async () => {
    const trimmedPrompt = prompt.trim();

    if (!trimmedPrompt || loading) {
      return;
    }

    setLoading(true);

    setNewChat(false);

    try {
      const res = await sendMessage(currThreadId, trimmedPrompt);

      setReply(res.reply);
    } catch (err) {
      console.error("Failed to send message:", err.message);
    } finally {
      setLoading(false);
    }
  };

  /* Append latest exchange */
  useEffect(() => {
    if (prompt && reply) {
      setPrevChats((prevChats) => [
        ...prevChats,

        {
          role: "user",
          content: prompt,
        },

        {
          role: "assistant",
          content: reply,
        },
      ]);
    }

    if (reply) {
      setPrompt("");
    }
  }, [reply]);

  /* Profile dropdown */
  const handleProfileClick = () => {
    setIsOpen((prev) => !prev);
  };

  /* Logout */
  const handleLogout = () => {
    logout();

    navigate("/login", {
      replace: true,
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      getReply();
    }
  };

  return (
    <div className="chatWindow">
      {/* Navbar */}
      <div className="navbar">
        <span>
          <b>AskGPT </b>
          <i className="fa-solid fa-chevron-down"></i>
        </span>

        <div className="userIconDiv" onClick={handleProfileClick}>
          <span className="userIcon">{userInitials}</span>
        </div>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="dropDown">
          <div className="dropDownItem">
            <i className="fa-solid fa-gear"></i> Settings
          </div>

          <div className="dropDownItem">
            <i className="fa-solid fa-cloud-arrow-up"></i> Upgrade Plan
          </div>

          <div className="dropDownItem" onClick={handleLogout}>
            <i className="fa-solid fa-arrow-right-from-bracket"></i> Log out
          </div>
        </div>
      )}

      {/* Chat Messages */}
      <Chat />

      {/* Loader */}
      <ScaleLoader color="#fff" loading={loading} />

      {/* Input */}
      <div className="chatInput">
        <div className="inputBox">
          <div className="attachBtn">
            <i className="fa-solid fa-plus"></i>
            <span className="tooltip">Add files and more</span>
          </div>

          <textarea
            placeholder="Ask anything..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
          />

          <div className="micBtn">
            <i className="fa-solid fa-microphone"></i>
            <span className="tooltip">Dictate</span>
          </div>

          <div id="submit" onClick={getReply}>
            <i className="fa-solid fa-arrow-up"></i>
            <span className="tooltip">Send prompt</span>
          </div>
        </div>

        <p className="info">
          AskGPT can make mistakes. Check important information.
        </p>
      </div>
    </div>
  );
}

export default ChatWindow;
