import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  const token = req.headers.token;
  if (!token) {
    return res.json({ success: false, message: "Not Authorized, Login Again" });
  }
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = decodedToken.id;
    next();
  } catch (error) {
    console.log("Error in Auth Middleware", error);
    res.json({ success: false, message: "Error in authorization" });
  }
};

export default authMiddleware;
