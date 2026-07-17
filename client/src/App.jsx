import { useEffect } from "react";
import { socket } from "./socket/socket";

function App() {
    useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    socket.auth = { token };

    const handleConnect = () => {
        console.log("✅ Connected:", socket.id);

        socket.emit("join-chat", "123");
    };

    socket.on("connect", handleConnect);

    socket.connect();

    return () => {
        socket.emit("leave-chat", "123");
        socket.off("connect", handleConnect);
        socket.disconnect();
    };
}, []);
    return <h1>ChatGPT Clone</h1>;
}

export default App;