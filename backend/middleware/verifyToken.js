const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.SECRET_KEY;

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token not provided." });
  }
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid credientials" });
    }
    req.user = user;
    next();
  });
};

module.exports = verifyToken;
