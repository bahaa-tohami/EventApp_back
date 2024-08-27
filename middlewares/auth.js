import jwt from "jsonwebtoken";
import { User } from '../models/UserModel.js';
 
export const isLogged = (req, res, next) => {

 
   
  let authToken = req.headers.authorization;
  let token = authToken && authToken.split(" ")[1];
 
  console.log("Token extrait: " + token);
 
  if (!token) {
    return res.status(400).json({ message: "Vous n'êtes pas authentifié" });
  }
 
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(400).json({ message: "Vous n'êtes pas autorisé à accéder à cette page" });
    }
   
    console.log("Decoded token: ", decoded);
    req.userId = decoded.userId; 
    console.log("User ID décodé: " + req.userId);
    next();
  });
};
 
export const isAdmin = async (req, res, next) => {
  console.log("User ID dans isAdmin: " + req.userId);
 
  const user = await User.findByPk(req.userId);
 
  if (!user) {
    console.log("Aucun utilisateur trouvé avec cet ID");
    return res.status(400).json({ message: "Aucun utilisateur trouvé avec cet ID" });
  }
 
  console.log("Utilisateur trouvé: ", user);
 
  if (user.role !== "admin") {
    return res.status(400).json({ message: "Vous devez être administrateur pour accéder à cette ressource" });
  }
 
  next();
};