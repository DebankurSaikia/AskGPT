import { createContext, useState } from "react";
import { v1 as uuidv1 } from "uuid";

export const MyContext = createContext();

export const MyProvider = ({ children }) => {
    const [prompt, setPrompt] = useState("");
    const [reply, setReply] = useState(null);

    // Current active thread
    const [currThreadId, setCurrThreadId] = useState(uuidv1());

    // Messages of the currently opened thread
    const [prevChats, setPrevChats] = useState([]);

    // Indicates whether a new chat has started
    const [newChat, setNewChat] = useState(true);

    // Stores all threads shown in the sidebar
    const [allThreads, setAllThreads] = useState([]);

    const providerValues = {
        prompt,
        setPrompt,

        reply,
        setReply,

        currThreadId,
        setCurrThreadId,

        prevChats,
        setPrevChats,

        newChat,
        setNewChat,

        allThreads,
        setAllThreads
    };

    return (
        <MyContext.Provider value={providerValues}>
            {children}
        </MyContext.Provider>
    );
};