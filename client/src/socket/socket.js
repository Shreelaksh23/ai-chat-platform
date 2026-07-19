import { useEffect, useState } from "react";
import { getChats, createChat } from "../../services/chat.service";

const Sidebar = ({ selectedChat, onSelectChat }) => {
    const [chats, setChats] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchChats();
    }, []);

    const fetchChats = async () => {
        try {
            setLoading(true);

            const response = await getChats();

            setChats(response.data || []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateChat = async () => {
        try {
            const response = await createChat({
                title: "New Chat",
            });

            setChats((prev) => [response.data, ...prev]);

            onSelectChat(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="sidebar">

            <button onClick={handleCreateChat}>
                + New Chat
            </button>

            <hr />

            {loading && <p>Loading...</p>}

            {!loading &&
                chats.map((chat) => (
                    <div
                        key={chat.id}
                        onClick={() => onSelectChat(chat)}
                        style={{
                            padding: "12px",
                            cursor: "pointer",
                            background:
                                selectedChat?.id === chat.id
                                    ? "#ddd"
                                    : "transparent",
                        }}
                    >
                        {chat.title}
                    </div>
                ))}
        </div>
    );
};

export default Sidebar;