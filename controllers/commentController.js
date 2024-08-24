import { Comment } from "../models/CommentModel.js";
import { Event } from "../models/EventModel.js";


export const createComment = async (req, res) => {
    const { content, user_id, event_id, rating } = req.body;

    
        try {
            // Récupérer l'événement par son ID pour vérifier sa date et heure
            const event = await Event.findOne({
                where: {
                    event_id: event_id
                }
            });
            if (!event) {
                return res.status(404).json({
                    message: "L'événement n'existe pas."
                });
            }
            // Vérifier si l'événement est terminé
            const currentDateTime = new Date();
            const eventDateTime = new Date(`${event.date}T${event.time}`);

            if (currentDateTime < eventDateTime) {
                return res.status(400).json({
                    message: "Vous ne pouvez commenter que lorsque l'événement est terminé."
                });
            }


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
        const eventId = req.params.id;

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
