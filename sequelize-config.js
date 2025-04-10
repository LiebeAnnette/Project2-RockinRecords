require("ts-node/register");

const config = require("./server/src/config/sequelize-config.ts").default;

module.exports = {
  development: config.development,
  test: config.test || config.development,
  production: config.production || config.development,
};
