// middleware/auth.js
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    // Check for token in Authorization header or cookies
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : req.cookies?.token;

    if (!token) {
      return res.status(401).json({ message: "Authentication required. Token not provided." });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded user info to the request object
    next();
  } catch (error) {
    console.error("Auth error:", error);
    res.status(401).json({ message: "Invalid or expired token." });
  }
};

module.exports = authMiddleware;
