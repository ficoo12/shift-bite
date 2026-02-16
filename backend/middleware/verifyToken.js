const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const header = req.headers.authorization;

  if (!header) return res.status(401).json({ message: "No token" });
  const token = header.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (!decoded)
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - invalid token" });
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error("Error in verifyToken", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = verifyToken;
