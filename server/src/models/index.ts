import sequelize from "../config/config.ts";
import Record from "./record.ts";
import User from "./user.ts";

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    await sequelize.sync();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export { sequelize, Record, User, connectToDatabase };
