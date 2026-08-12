import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Chat = sequelize.define(
  "Chat",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    model: {
      type: DataTypes.STRING,
      defaultValue: "gemini-2.5-flash",
    },

    isPinned: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    isArchived: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    unreadCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    paranoid: true,
    timestamps: true,
  }
);

export default Chat;