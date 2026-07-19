import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";

import ChatPage from "./pages/ChatPage";

function App() {
    useEffect(() => {
    localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImM3MWNhMjJmLTMwOWUtNGRmNS1hYTU3LWEyZjQwYWVlZDllOSIsImVtYWlsIjoic2hyZWVAZ21haWwuY29tIiwiaWF0IjoxNzg0NDUxMjQ2LCJleHAiOjE3ODQ0NTIxNDZ9.rYVg_dhygeBTizozBYLqThYcM-3w5U0IFYgBs-7TwG0");
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