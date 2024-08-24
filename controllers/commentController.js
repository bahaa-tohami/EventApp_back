import { Comment } from "../models/CommentModel.js";


export const createComment = async (req, res) => {
    const { content, user_id, event_id, rating } = req.body;
  
    try {
      // Vérifier si l'utilisateur a déjà commenté cet événement
      const existingComment = await Comment.findOne({
        where: {
          user_id: user_id,
          event_id: event_id
        }
      });
  
      if (existingComment) {
        // Si un commentaire existe déjà, retourner une erreur
        return res.status(400).json({
          message: "Vous avez déjà commenté cet événement."
        });
      }
  
      // Créer un nouveau commentaire
      const newComment = await Comment.create({
        content,
        user_id,
        event_id,
        rating
      });
  
      return res.status(201).json(newComment);
    } catch (error) {
      // Gérer les erreurs
      console.error(error);
      return res.status(500).json({
        message: "Erreur serveur. Veuillez réessayer plus tard."
      });
    }
  };

  export const getCommentsByEvent = async (req, res) => {
    const eventId  = req.params.id;
  
    try {
      const comments = await Comment.findAll({
        where: { event_id: eventId }
      });
      return res.status(200).json(comments);

    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Erreur serveur. Veuillez réessayer plus tard."
      });
    }
};
