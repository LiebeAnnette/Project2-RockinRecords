import sequelize from "../config/config.js";
import Record from "./record.js";
import User from "./user.js";

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
