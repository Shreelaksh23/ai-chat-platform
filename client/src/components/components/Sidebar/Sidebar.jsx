import "./Sidebar.css";

const Sidebar = ({
    chats,
    onlineUsers,
    selectedChat,
    onSelectChat,
    onCreateChat,
}) => {
    return (
        <div className="sidebar">

            <div className="sidebar-header">
                <button onClick={onCreateChat}>
                    + New Chat
                </button>
            </div>

            <div className="sidebar-body">

                {chats.length === 0 && (
                    <p>No Chats Found</p>
                )}

                {chats.map((chat) => (

                    <div
                        key={chat.id}
                        className={
                            selectedChat?.id === chat.id
                                ? "chat-item active"
                                : "chat-item"
                        }
                        onClick={() => onSelectChat(chat)}
                    >
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >

                            <h4>{chat.title}</h4>

                            {chat.unreadCount > 0 && (

                                <span
                                    style={{
                                        background: "#10a37f",
                                        color: "#fff",
                                        borderRadius: "50%",
                                        width: "22px",
                                        height: "22px",
                                        display: "grid",
                                        placeItems: "center",
                                        fontSize: "12px",
                                    }}
                                >
                                    {chat.unreadCount}
                                </span>
                            )}
                        </div>
                        <small>
                            {chat.messages?.length
                                ? chat.messages[0].content
                                : "No messages yet"}
                        </small>

                        <br />

                        <small>
                            {onlineUsers.includes(chat.userId)
                                ? "🟢 Online"
                                : "⚫ Offline"}
                        </small>

                    </div>
                ))}
            </div>

        </div>
    );
};

export default Sidebar;