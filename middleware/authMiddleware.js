const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) return res.status(401).json({ error: "Invalid token" });
  const authType = authHeader.split(" ")[0];
  const authToken = authHeader.split(" ")[1];
  if (!authToken || !authType || authType !== "Bearer")
    return res.status(401).json({ error: "Access denied" });
  try {
    const decoded = jwt.verify(authToken, "A28jhYp9Mzj0");
    // console.log(decoded);
    req.username = decoded.username;
    req.uid = decoded.uid;
    next();
  } catch (error) {
    // console.log(error);
    res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = verifyToken;
