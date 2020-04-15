const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  port: process.env.PORT,
  dbkey: process.env.DB_KEY,
  dbuser: process.env.DB_USER,
  jwtkey: process.env.JWT_KEY,
};
