import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

export const getUserIdFromToken = (req) => {
    try {
      // Récupérer le token du header Authorization
      const authHeader = req.headers.authorization;
  
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new Error('No token provided.');
      }
  
      // Extraire le token du header
      const token = authHeader.split(' ')[1];
  
      // Vérifier et décoder le token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
      req.userId = decoded.userId; 
      
      // Retourner le user_id du token décodé
      return  req.userId;
    } catch (error) {
      // Gérer les erreurs, comme un token invalide ou expiré
      console.error('Error extracting user_id from token:', error.message);
      throw new Error('Invalid or expired token.');
    }
  };
 