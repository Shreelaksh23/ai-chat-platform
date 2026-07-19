import "./Sidebar.css";

const Sidebar = ({
    chats,
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
                        <h4>{chat.title}</h4>
                    </div>

                ))}

            </div>

        </div>
    );
};

export default Sidebar;