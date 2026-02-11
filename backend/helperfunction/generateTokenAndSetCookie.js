const jwt = require("jsonwebtoken");

const generateTokenAndSetCookie = (userId) => {
  return jwt.sign({ userId }, process.env.SECRET_KEY, {
    expiresIn: "7d",
  });
};

module.exports = generateTokenAndSetCookie;
