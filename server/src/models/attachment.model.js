import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Attachment = sequelize.define(
  "Attachment",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    fileName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    filePath: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    mimeType: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    fileSize: {
      type: DataTypes.BIGINT,
    },
  },
  {
    timestamps: true,
  }
);

export default Attachment;