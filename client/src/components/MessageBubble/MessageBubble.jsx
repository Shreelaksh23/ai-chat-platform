import ReactMarkdown from "react-markdown";
import "./MessageBubble.css";

const MessageBubble = ({ message }) => {

    const isUser = message.role === "user";

    return (
        <div
            className={`message-row ${
                isUser ? "user-row" : "assistant-row"
            }`}
        >

            <div
                className={`message-bubble ${
                    isUser
                        ? "user-message"
                        : "assistant-message"
                }`}
            >

                <ReactMarkdown>
                    {message.content || ""}
                </ReactMarkdown>

            </div>
        </div>
    );
};

export default MessageBubble;