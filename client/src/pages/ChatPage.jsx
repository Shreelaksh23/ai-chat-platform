import { useEffect, useState } from "react";
import {
    connectSocket,
    disconnectSocket,
    onOnlineUsers,
    removeOnlineUsers,
} from "../services/socket.service";

import Sidebar from "../components/Sidebar/Sidebar.jsx"
import ChatWindow from "../components/ChatWindow/ChatWindow.jsx";
import {
    getChats,
    createChat,
} from "../services/chat.service";

function App() {

    const [chats, setChats] = useState([]);
    const [onlineUsers, setOnlineUsers] = useState([]);

    const [selectedChat, setSelectedChat] =
        useState(null);

    useEffect(() => {
        loadChats();
    }, []);
    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            connectSocket(token);
        }

        return () => {
            disconnectSocket();
        };
    }, []);

    useEffect(() => {
        onOnlineUsers((users) => {
            setOnlineUsers(users);
        });
        return () => {
            removeOnlineUsers();
        };

    }, []);

    const loadChats = async () => {

        try {

            const response = await getChats();

            setChats(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    const handleCreateChat = async () => {

        try {

            const response = await createChat({
                title: "New Chat",
            });

            setChats((prev) => [
                response.data,
                ...prev,
            ]);

            setSelectedChat(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    return (
        <div className="app-container">

            <Sidebar
                chats={chats}
                onlineUsers={onlineUsers}
                selectedChat={selectedChat}
                onSelectChat={setSelectedChat}
                onCreateChat={handleCreateChat}
            />

            <ChatWindow
                selectedChat={selectedChat}
            />

        </div>
    );

}

export default App;