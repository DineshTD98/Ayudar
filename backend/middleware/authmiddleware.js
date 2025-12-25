const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    // Authorization header
    const authHeader = req.headers.authorization;

    //Check if header exists
    if (!authHeader) {
      return res.status(401).json({
        message: "Authorization header missing",
      });
    }

    //Extract token (Bearer <token>)
    const token = authHeader.split(" ")[1];

    // debug log
    console.log(
      "auth header:",
      authHeader ? "[present]" : "[missing]",
      " token length:",
      token ? token.length : 0,
    );

    //Check if token exists
    if (!token) {
      return res.status(401).json({
        message: "Token missing",
      });
    }

    //Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //Attach user data to request
    req.user = decoded; // { id: userId }

    //Continue to controller
    next();
  } catch (error) {
    console.error("auth error:", error.message);
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

module.exports = auth;
