import User from "./user.model.js";
import Chat from "./chat.model.js";
import Message from "./message.model.js";
import Attachment from "./attachment.model.js";

//user->chat
User.hasMany(Chat,{
    foreignKey:"userId",
    as:"chats",
    onDelete:"CASCADE",
});

Chat.belongsTo(User,{
    foreignKey:"userId",
    as:"user",
});

// Chat → Message
Chat.hasMany(Message, {
    foreignKey: "chatId",
    as: "messages",
    onDelete: "CASCADE",
});

Message.belongsTo(Chat, {
    foreignKey: "chatId",
    as: "chat",
});

// Message → Attachment
Message.hasMany(Attachment, {
    foreignKey: "messageId",
    as: "attachments",
    onDelete: "CASCADE",
});

Attachment.belongsTo(Message, {
    foreignKey: "messageId",
    as: "message",
});

export const Models={
    User,
    Chat,
    Message,
    Attachment,
}