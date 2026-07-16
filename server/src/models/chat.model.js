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
  },
  {
    paranoid: true,
    timestamps: true,
  }
);

export default Chat;