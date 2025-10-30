const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  console.log(req.cookies);
  console.log(token);

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    if (!decoded)
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - invalid token" });
    req.userId = decoded.userId;
    //next will call next function in the chain
    next();
  } catch (error) {
    console.error("Error in verifyToken", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = verifyToken;
