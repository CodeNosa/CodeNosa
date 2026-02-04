import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization; // on attend "Bearer <token>"
  if (!authHeader) return res.status(401).json({ success: false, message: "Token manquant" });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded; // infos du token
    next(); // passe à la route suivante
  } catch (err) {
    res.status(403).json({ success: false, message: "Token invalide" });
  }
};
