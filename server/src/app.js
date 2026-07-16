import express from "express";

const app=express();

app.get("/",(req,res)=>{
    res.send("AI chat backend running");
});

export default app;