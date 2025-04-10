console.log("✅ .sequelizerc.js is working!");
const path = require("path");

module.exports = {
  config: path.resolve(__dirname, "sequelize-config.js"),
  "models-path": path.resolve(__dirname, "server", "src", "models"),
  "seeders-path": path.resolve(__dirname, "server", "src", "seeders"),
  "migrations-path": path.resolve(__dirname, "server", "src", "migrations"),
  require: "ts-node/register"
};
