import { useState } from "react";

import "./MessageInput.css";

const MessageInput = ({
    onSendMessage,
}) => {

    const [message, setMessage] =
        useState("");

    const handleSend = () => {

        const value = message.trim();

        if (!value) return;

        onSendMessage(value);

        setMessage("");

    };

    const handleKeyDown = (e) => {

        if (
            e.key === "Enter" &&
            !e.shiftKey
        ) {

            e.preventDefault();

            handleSend();

        }

    };

    return (

        <div className="message-input">

            <textarea

                placeholder="Type your message..."

                value={message}

                onChange={(e)=>
                    setMessage(
                        e.target.value
                    )
                }

                onKeyDown={handleKeyDown}

                rows={2}

            />

            <button
                onClick={handleSend}
            >
                Send
            </button>

        </div>

    );

};

export default MessageInput;