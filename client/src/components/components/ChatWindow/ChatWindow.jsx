import { useEffect, useRef, useState } from "react";
import MessageBubble from "../MessageBubble/MessageBubble";
import MessageInput from "../MessageInput/MessageInput";
import {
    sendMessage,
} from "../../services/socket.service";
import {
    getMessages,
} from "../../services/chat.service";

import {
    joinChat,
    leaveChat,
    onReceiveMessage,
    removeReceiveMessage,
    onTyping,
    onStopTyping,
    removeTypingListeners,
} from "../../services/socket.service";

const ChatWindow = ({ selectedChat }) => {

    const [messages, setMessages] = useState([]);
    const [typingUser, setTypingUser] = useState(null);
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

        };

    }, [selectedChat]);

    useEffect(() => {

        bottomRef.current?.scrollIntoView({
            behavior: "smooth",
        });

    }, [messages]);

    const loadMessages = async () => {

        try {

            const messages =
                await getMessages(
                    selectedChat.id
                );

            setMessages(messages);

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