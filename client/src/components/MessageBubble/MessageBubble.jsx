import "./MessageBubble.css";

const MessageBubble = ({ message }) => {

    const isUser = message.role === "user";

    return (
        <div
            className={`message-container ${
                isUser ? "user" : "assistant"
            }`}
        >
            <div className="message-bubble">

                <div className="message-content">
                    {message.content}
                </div>

                <div className="message-time">
                    {new Date(
                        message.createdAt
                    ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </div>

            </div>
        </div>
    );
};

export default MessageBubble;