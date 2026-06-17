import "./Chat.css";

import {
    useContext,
    useEffect,
    useState
} from "react";

import { MyContext } from "../context/MyContext.jsx";

import ReactMarkdown from "react-markdown";

import rehypeHighlight from "rehype-highlight";

import "highlight.js/styles/github-dark.css";

function Chat() {
    const {
        newChat,
        prevChats,
        reply
    } = useContext(MyContext);

    const [latestReply, setLatestReply] =
        useState(null);

    useEffect(() => {
        /* Thread switched from sidebar */
        if (reply === null) {
            setLatestReply(null);
            return;
        }

        if (!prevChats?.length) {
            return;
        }

        const words = reply.split(" ");

        let idx = 0;

        const interval = setInterval(() => {
            setLatestReply(
                words
                    .slice(0, idx + 1)
                    .join(" ")
            );

            idx++;

            if (idx >= words.length) {
                clearInterval(interval);
            }
        }, 40);

        return () => clearInterval(interval);

    }, [reply]);

    return (
        <>
            {newChat && (
                <h2>What’s on your mind today?</h2>
            )}

            <div className="chats">

                {prevChats
                    ?.slice(0, -1)
                    .map((chat, idx) => (
                        <div
                            key={idx}
                            className={
                                chat.role === "user"
                                    ? "userDiv"
                                    : "gptDiv"
                            }
                        >
                            {chat.role === "user" ? (
                                <p className="userMessage">
                                    {chat.content}
                                </p>
                            ) : (
                                <ReactMarkdown
                                    rehypePlugins={[
                                        rehypeHighlight
                                    ]}
                                >
                                    {chat.content}
                                </ReactMarkdown>
                            )}
                        </div>
                    ))}

                {prevChats.length > 0 && (
                    <>
                        {latestReply === null ? (
                            <div
                                className="gptDiv"
                                key="non-typing"
                            >
                                <ReactMarkdown
                                    rehypePlugins={[
                                        rehypeHighlight
                                    ]}
                                >
                                    {
                                        prevChats[
                                            prevChats.length - 1
                                        ].content
                                    }
                                </ReactMarkdown>
                            </div>
                        ) : (
                            <div
                                className="gptDiv"
                                key="typing"
                            >
                                <ReactMarkdown
                                    rehypePlugins={[
                                        rehypeHighlight
                                    ]}
                                >
                                    {latestReply}
                                </ReactMarkdown>
                            </div>
                        )}
                    </>
                )}

            </div>
        </>
    );
}

export default Chat;