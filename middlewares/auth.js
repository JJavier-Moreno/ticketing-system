import jwt from "jsonwebtoken";

export function auth(req, res, next){
   const token = req.header("Authorization");

   if(!token) return res.status(401).send("Acceso denegado. No existe token");

    const header = token.split("")[0];
    if(!header || header !== "Bearer"){
        res.status(403).json("No puedes acceder");
    }

    try{

    }catch(err){
        res.status(400).send('Token no válido');
    }

    const payload = jwt.verify(token, )


}