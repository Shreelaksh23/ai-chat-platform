import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { toDefaultValue } from "sequelize/lib/utils";

const User = sequelize.define("User", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    avatar: {
        type: DataTypes.STRING,
        defaultValue: false,
    },
    isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    lastLogin: {
        type: DataTypes.DATE
    },
}, {
    paranoid: true,
    timestamps: true,
});

export default User;