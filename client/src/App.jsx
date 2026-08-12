import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import ChatPage from "./pages/ChatPage";
import "./App.css";
function App() {
    useEffect(() => {
        localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImM3MWNhMjJmLTMwOWUtNGRmNS1hYTU3LWEyZjQwYWVlZDllOSIsImVtYWlsIjoic2hyZWVAZ21haWwuY29tIiwiaWF0IjoxNzg2NTQyMjc4LCJleHAiOjE3ODY1NDMxNzh9.rdyoI1HSkhsjKPwsL2gpsyF3g-T4U6yzarkW8G-UXlI");
    }, []);
    return (
        <Routes>

            <Route
                path="/"
                element={<Navigate to="/chat" />}
            />

            <Route
                path="/chat"
                element={<ChatPage />}
            />

        </Routes>
    );
}

export default App;