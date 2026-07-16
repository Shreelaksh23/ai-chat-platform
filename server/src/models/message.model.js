import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Message = sequelize.define(
  "Message",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    role: {
      type: DataTypes.ENUM("user", "assistant", "system"),
      allowNull: false,
    },

    content: {
      type: DataTypes.TEXT("long"),
      allowNull: false,
    },

    tokens: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    status: {
      type: DataTypes.ENUM("sending", "sent", "failed"),
      defaultValue: "sent",
    },
  },
  {
    timestamps: true,
  }
);

export default Message;