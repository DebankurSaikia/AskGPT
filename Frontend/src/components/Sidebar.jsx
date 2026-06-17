import "./Sidebar.css";
import { useContext, useEffect } from "react";
import { v1 as uuidv1 } from "uuid";

import { MyContext } from "../context/MyContext.jsx";

import {
  getThreads,
  getThreadMessages,
  deleteThreadById,
} from "../services/chatService.js";

import blacklogo from "../assets/blacklogo.png";

function Sidebar() {
  const {
    allThreads,
    setAllThreads,

    currThreadId,
    setCurrThreadId,

    setNewChat,
    setPrompt,
    setReply,

    setPrevChats,

    sidebarOpen,
    setSidebarOpen,
  } = useContext(MyContext);

  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  // Fetch all threads
  const fetchThreads = async () => {
    try {
      const threads = await getThreads();

      const filteredData = threads.map((thread) => ({
        threadId: thread.threadId,
        title: thread.title,
      }));

      setAllThreads(filteredData);
    } catch (err) {
      console.error("Failed to fetch threads:", err.message);
    }
  };

  useEffect(() => {
    fetchThreads();
  }, [currThreadId]);

  // Create new chat
  const createNewChat = () => {
    setNewChat(true);

    setPrompt("");

    setReply(null);

    setCurrThreadId(uuidv1());

    setPrevChats([]);
  };

  // Open thread
  const changeThread = async (newThreadId) => {
    try {
      setCurrThreadId(newThreadId);

      const messages = await getThreadMessages(newThreadId);

      setPrevChats(messages);

      setNewChat(false);

      setReply(null);
    } catch (err) {
      console.error("Failed to load thread:", err.message);
    }
  };

  // Delete thread
  const deleteThread = async (threadId) => {
    try {
      await deleteThreadById(threadId);

      setAllThreads((prev) =>
        prev.filter((thread) => thread.threadId !== threadId),
      );

      if (threadId === currThreadId) {
        createNewChat();
      }
    } catch (err) {
      console.error("Failed to delete thread:", err.message);
    }
  };

  return (
    <section className={sidebarOpen ? "sidebar" : "sidebar collapsed"}>
      {/* Toggle Sidebar Button */}
      <button className="sidebarBtn" onClick={toggleSidebar}>
        {sidebarOpen && (
          <img src={blacklogo} alt="AskGPT Logo" className="logo" />
        )}

        <span className="iconWrapper">
          {sidebarOpen ? (
            <i className="fa-solid fa-angle-left"></i>
          ) : (
            <i className="fa-solid fa-bars"></i>
          )}

          <span className="sidebarTooltip">
            {sidebarOpen ? "Close sidebar" : "Open sidebar"}
          </span>
        </span>

        <span className="sidebarTooltip">
          {sidebarOpen ? "Close sidebar" : "Open sidebar"}
        </span>
      </button>

      {/* New Chat Button */}
      <button className="newChatBtn" onClick={createNewChat}>
        <span>
          <i className="fa-solid fa-pen-to-square"></i>
        </span>

        {sidebarOpen && <p>New Chat</p>}

        {!sidebarOpen && <span className="sidebarTooltip">New Chat</span>}
      </button>

      {/* Thread History */}
      <ul className="history">
        {allThreads?.map((thread) => (
          <li
            key={thread.threadId}
            onClick={() => changeThread(thread.threadId)}
            className={thread.threadId === currThreadId ? "highlighted" : ""}
          >
            {sidebarOpen && thread.title}

            {sidebarOpen && (
              <i
                className="fa-solid fa-trash"
                onClick={(e) => {
                  e.stopPropagation();

                  deleteThread(thread.threadId);
                }}
              ></i>
            )}
          </li>
        ))}
      </ul>

      {/* Footer */}
      <div className="sign">{sidebarOpen && <p>AskGPT&nbsp; • &nbsp;Made by Debankur</p>}</div>
    </section>
  );
}

export default Sidebar;
