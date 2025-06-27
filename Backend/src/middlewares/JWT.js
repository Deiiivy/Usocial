import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET_KEY;

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "No se proporcionó token" });
  }

  const token = authHeader.split(" ")[1];
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token no válido" });
    }
    req.userId = decoded.userId; 
    next();
  });
};
