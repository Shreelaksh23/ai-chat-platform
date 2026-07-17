import express from "express";
import cors from "cors";
import errorHandler from "./middlewares/ErrorMiddleware.js";
import AuthRoutes from "./routes/AuthRoutes.js";
import ChatRoutes from "./routes/ChatRoutes.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    })
);
app.use("/api/auth", AuthRoutes);
app.use("/api/chats", ChatRoutes);

app.get("/", (req, res) => {
    res.send("AI chat backend running");
});

app.use(errorHandler)

export default app;