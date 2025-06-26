import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET_KEY;

export const verifyToken = (req, res, next) => {
   const token = req.headers.authorization.split(" ")[1];
   jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
         return res.status(401).json({ message: "Token no válido" });
      }
      req.user = decoded;
      next();
   });
};
