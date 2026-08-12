import { useState } from "react";
import {
    typing,
    stopTyping,
} from "../../services/socket.service";
import "./MessageInput.css";

const MessageInput = ({
    selectedChat,
    onSendMessage,
}) => {

    const [message, setMessage] = useState("");

    const handleSend = () => {

        const value = message.trim();

        if (!value) return;

        onSendMessage(value);

        if (selectedChat) {
            stopTyping(selectedChat.id);
        }

        setMessage("");
    };

    const handleKeyDown = (e) => {

        if (e.key === "Enter" && !e.shiftKey) {

            e.preventDefault();

            handleSend();
        }
    };

    return (

        <div className="message-input">

            <textarea
                placeholder="Type your message..."
                value={message}
                onChange={(e) => {

                    setMessage(e.target.value);

                    if (selectedChat) {
                        typing(selectedChat.id);
                    }

                }}
                onKeyDown={handleKeyDown}
                rows={2}
            />

            <button onClick={handleSend}>
                Send
            </button>

        </div>

    );

};

export default MessageInput;