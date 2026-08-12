import "./MessageBubble.css";

const MessageBubble = ({ message }) => {
    const isUser = message.role === "user";

    return (
        <div
            className={
                isUser
                    ? "message-row user"
                    : "message-row assistant"
            }
        >
            <div className="message-bubble">
                <p className="message-content">
                    {message.content}
                </p>

                <div className="message-footer">
                    <span className="message-time">
                        {new Date(
                            message.createdAt
                        ).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </span>

                    {isUser && (
                        <span className="message-status">
                            {message.status === "sending" &&
                                "⏳ Sending"}

                            {message.status === "sent" &&
                                "✓ Sent"}

                            {message.status === "failed" &&
                                "❌ Failed"}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MessageBubble;