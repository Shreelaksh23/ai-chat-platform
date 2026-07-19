import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar/Sidebar.jsx"

import {
    getChats,
    createChat,
} from "../services/chat.service";

function App() {

    const [chats, setChats] = useState([]);

    const [selectedChat, setSelectedChat] =
        useState(null);

    useEffect(() => {
        loadChats();
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

        <div
            style={{
                display: "flex",
                height: "100vh",
            }}
        >

            <Sidebar

                chats={chats}

                selectedChat={selectedChat}

                onSelectChat={setSelectedChat}

                onCreateChat={handleCreateChat}

            />

            <div
                style={{
                    flex: 1,
                    padding: "20px",
                }}
            >

                <h2>Chat Window</h2>

                {selectedChat ? (

                    <h3>
                        {selectedChat.title}
                    </h3>

                ) : (

                    <p>Select a chat</p>

                )}

            </div>

        </div>

    );

}

export default App;