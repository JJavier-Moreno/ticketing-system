import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export function auth(req, res, next) {
  const authHeader = req.header("Authorization");

  if (!authHeader) return res.status(401).send("Acceso denegado. No existe token");

  const [scheme, token] = token.split(" ");
  if (!token || scheme !== "Bearer") {
    res.status(401).send("Formato de token no válido");
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();


  } catch (err) {
    res.status(401).send("Token no válido");
  }
}
