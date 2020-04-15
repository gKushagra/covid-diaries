const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  port: process.env.PORT,
  dbkey: process.env.DB_KEY,
};
