import sequelize from "../config/database";
import Record from "./record";
import User from "./user";

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
