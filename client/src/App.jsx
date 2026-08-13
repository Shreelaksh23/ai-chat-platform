import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import ChatPage from "./pages/ChatPage";
import "./App.css";
function App() {
    useEffect(() => {
        localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImM3MWNhMjJmLTMwOWUtNGRmNS1hYTU3LWEyZjQwYWVlZDllOSIsImVtYWlsIjoic2hyZWVAZ21haWwuY29tIiwiaWF0IjoxNzg2NTg3NjYwLCJleHAiOjE3ODY1ODg1NjB9.t7BQ8A8g55vY0r_-osw-oRCC_VWJ95L-JUmjQRgYQ1E");
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