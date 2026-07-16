import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: "mysql",
        logging: false,
        define: {
            freezeTableName: true,
            timestamps: true,
            underscored: false,
        },

        pool: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
        timezone: "+05:30",
    }
);

export const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("MySql databse connected successfullu")
    } catch (error) {
        console.error("MySql databse connection failed");
        console.error(error.message);
        process.exit(1);
    }
};