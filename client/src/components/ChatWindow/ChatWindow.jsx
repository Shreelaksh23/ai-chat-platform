import { useEffect, useRef, useState } from "react";
import MessageBubble from "../MessageBubble/MessageBubble";
import MessageInput from "../MessageInput/MessageInput";
import {
    sendMessage,
} from "../../services/socket.service";
import {
    getMessages,
    resetUnread
} from "../../services/chat.service";

import {
    joinChat,
    leaveChat,
    onReceiveMessage,
    removeReceiveMessage,
    onTyping,
    onStopTyping,
    removeTypingListeners,
    onAIThinking,
    removeAIThinking,
    onAIError,
    removeAIError,
} from "../../services/socket.service";

const ChatWindow = ({ selectedChat }) => {

    const [messages, setMessages] = useState([]);
    const [typingUser, setTypingUser] = useState(null);
    const [aiThinking, setAiThinking] = useState(false);
    const [aiError, setAiError] = useState(null);

    const bottomRef = useRef(null);
    const handleSendMessage = (content) => {
        sendMessage(
            selectedChat.id,
            content
        );
    };

    useEffect(() => {

        if (!selectedChat) return;
        resetUnread(selectedChat.id);

        loadMessages();

        joinChat(selectedChat.id);

        onReceiveMessage((message) => {

            setMessages((prev) => [
                ...prev,
                message,
            ]);

        });
        onAIThinking((data) => {
            if (data.chatId !== selectedChat.id) {
                return;
            }
            setAiThinking(data.thinking);
        });
        onAIError((data) => {

            console.error("AI Error:", data);

            setAiThinking(false);

            setAiError(
                data?.message ||
                "Unable to generate AI response. Please try again."
            );

        });

        onTyping((user) => {

            setTypingUser(user.username);

        });

        onStopTyping(() => {

            setTypingUser(null);

        });

        return () => {

            leaveChat(selectedChat.id);

            removeReceiveMessage();
            removeTypingListeners();
            removeAIThinking();
            removeAIError();
        };

    }, [selectedChat]);

    useEffect(() => {

        bottomRef.current?.scrollIntoView({
            behavior: "smooth",
        });

    }, [messages]);

    const loadMessages = async () => {
        try {
            const response = await getMessages(selectedChat.id);

            console.log(response);

            setMessages(response.data);

        } catch (error) {
            console.log(error);
        }
    };

    if (!selectedChat) {

        return (

            <div
                style={{
                    flex: 1,
                    display: "grid",
                    placeItems: "center",
                }}
            >
                Select Chat
            </div>
        );
    }
    return (

        <div
            style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
            }}
        >

            <div
                style={{
                    padding: "20px",
                    borderBottom: "1px solid #ddd",
                }}
            >

                <h3>
                    {selectedChat.title}
                </h3>

            </div>

            <div
                style={{
                    flex: 1,
                    overflowY: "auto",
                    padding: "20px",
                }}
            >

                {messages.map((message) => (
                    <MessageBubble
                        key={message.id}
                        message={message}
                    />
                ))}
                {aiThinking && (
                    <div
                        style={{
                            padding: "10px 20px",
                            color: "#666",
                            fontStyle: "italic",
                        }}
                    >
                        AI is thinking...
                    </div>
                )}
                {aiError && (
                    <div
                        style={{
                            margin: "10px 20px",
                            padding: "10px 15px",
                            borderRadius: "8px",
                            background: "#ffe5e5",
                            color: "#c00",
                        }}
                    >
                        {aiError}

                        <button
                            onClick={() => setAiError(null)}
                            style={{
                                marginLeft: "10px",
                                cursor: "pointer",
                            }}
                        >
                            ×
                        </button>
                    </div>
                )}

                {typingUser && (
                    <div
                        style={{
                            padding: "10px 20px",
                            color: "#666",
                            fontStyle: "italic",
                        }}
                    >
                        {typingUser} is typing...
                    </div>
                )}

                <div ref={bottomRef}></div>

            </div>

            <MessageInput
                selectedChat={selectedChat}
                onSendMessage={handleSendMessage}
            />

        </div>

    );

};

export default ChatWindow;