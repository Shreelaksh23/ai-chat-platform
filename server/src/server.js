import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import { connectDB } from "./config/db.js";
import { initializeSocket } from "./config/socket.js";
import "./models/index.js";
import http from "http";
import registerSocketEvents from "./sockets/index.js";
import "./models/index.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();
        const httpServer = http.createServer(app);

        const io = initializeSocket(httpServer);
        registerSocketEvents(io)

        httpServer.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (error) {
        console.error("Failed to start server");
        console.error(error);
        process.exit(1);
    }
}

startServer();
