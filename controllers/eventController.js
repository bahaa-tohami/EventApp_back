import { Event } from "../models/EventModel.js";
import { Participant } from "../models/GuestModel.js";
import  { User } from "../models/UserModel.js"
import { getUserIdFromToken } from "../utils/getUserIdFromToken.js";
import { Sequelize } from "sequelize";
/**
 * Enregistrer un nouvel événement
 * @param {Request} req
 * @param {Response} res
 */
export const saveEvent = async (req, res) => {
    const userId = req.params.id;
    const tokenUserId = getUserIdFromToken(req);
    if(tokenUserId != userId) {
        return res.json({ message: "Vous n'êtes pas autorisé à créer un événement" });
    }
    try {
      const { description, date, time, capacity, is_private, title, location } = req.body;
      
      const currentDate = new Date();
      const eventDate = new Date(date);

      if (eventDate < currentDate) {
        return res.status(400).json({ error: "La date de l'événement est passée. Veuillez choisir une date future." });
      }
      if (capacity <=1) {
        return res.status(400).json({ error: "La capacité de l'événement doit être supérieure à 1." });
      }
      const newEvent = await Event.create({
        description,
        date,
        time,
        capacity,
        is_private,
        created_by: userId,
        title,
        location
      });

      res.status(201).json({ message: 'Evenement creé avec succès', newEvent });
    } catch (error) {
      console.error('Erreur lors de la creation de l\'evenement:', error);
      res.status(500).json({ message: 'Erreur interne du serveur' });
    }
  };

    /**
   * Supprimer un événement
   * @param {Request} req
   * @param {Response} res
   */
    export const deleteEvent = async (req, res) => {
        const eventId  = req.params.id;
        const tokenUserId = getUserIdFromToken(req);
      
    
        try {
            const event = await Event.findByPk(eventId);
            if (!event) {
                return res.status(404).json({ error: "Événement non trouvé." });
            }
            if (event.created_by != tokenUserId) {
                return res.status(403).json({ error: "Vous n'êtes pas autorisé à supprimer cet événement." });
            }
            const result = await Event.destroy({where: {event_id: eventId}});
            
            return res.status(200).json({
                message: `L'événement avec l'ID ${eventId} a été supprimé avec succès.`,
            });
            
            
        } catch (error) {
            return res.status(500).json({
            message: 'Erreur lors de la suppression de l\'événement.',
            error: error.message,
            });
        }
      }

      export const updateEvent = async (req, res) => {
        const tokenUserId = getUserIdFromToken(req);
        const eventId  = req.params.id;
        try {
            const { description, date, time, capacity, is_private, title, location } = req.body;
            const currentDate = new Date();
            const eventDate = new Date(date);
    
            if (eventDate < currentDate) {
                return res.status(400).json({ error: "La date de l'événement est passée. Veuillez choisir une date future." });
            }
            if (capacity <= 1) {
                return res.status(400).json({ error: "La capacité de l'événement doit être supérieure à 1." });
            }
    
            const event = await Event.findByPk(eventId);
            if (!event) {
                return res.status(404).json({ error: "Événement non trouvé." });
            }
            if (event.created_by != tokenUserId) {
                return res.status(403).json({ error: "Vous n'êtes pas autorisé à modifier cet événement." });
            }

    
            event.description = description;
            event.date = date;
            event.time = time;
            event.capacity = capacity;
            event.is_private = is_private;
            event.title = title;
            event.location = location;
    
            await event.save();
    
            res.status(200).json({ message: "Événement mis à jour avec succès", event });
        } catch (error) {
            console.error("Erreur lors de la mise à jour de l'événement:", error);
            res.status(500).json({ message: "Erreur interne du serveur" });
        }
    };

      export async function myInvitations(req, res) {
        const userId  = req.params.id;
        const tokenUserId = getUserIdFromToken(req);
        if(tokenUserId != userId) {
            return res.json({ message: "Vous n'êtes pas autorisé à voir les invitations de cet utilisateur" });
        }
        const user = await User.findByPk(userId);   

        if (!user) {
          return res.status(400).json({ message: 'User ID invalide' });
        }
      
        try {
          const events = await Event.findAll({
            include: [
              {
                model: Participant,
                where: {
                  user_id: userId
                },
                attributes: ['participant_id', 'invited_at', 'responded_at', 'status']
              }
            ]
          });
      
          if (events.length === 0) {
            return res.status(404).json({ message: 'Aucun évènement n\est disponible pour l\ utilisateur' });
          }
      
          res.json(events);
        } catch (error) {
          console.error('Erreur lors de la recherche des événements avec les participants pour l’utilisateur :', error);
          res.status(500).json({ message: 'Erreur interne du serveur' });
        }
      };

      export const getEvents = async (req, res) => {
        try {
          const events = await Event.findAll({
            include: [
              {
                model: User,
                attributes: ['username']
              }
            ]
          });
          res.json(events);
        } catch (error) {
          console.error('Erreur lors de la recherche des événements :', error);
          res.status(500).json({ message: 'Erreur interne du serveur' });
        }
      };
      export const getEventsByUser = async (req, res) => {
        const userId = req.params.id;
        try {
          const events = await Event.findAll({
            where: {
              [Sequelize.Op.or]: [
                { created_by: userId },
                { '$Participants.user_id$': userId }
              ]
            },
            include: [
              {
                model: Participant,
                required: false,
                where: {
                  user_id: userId,
                  status: "accepted"
                },
                attributes: ['user_id', 'invited_at', 'responded_at', 'status']
              }
            ]
          });
          res.status(200).json(events);
        } catch (error) {
          console.error('Erreur lors de la recherche des événements par utilisateur :', error);
          res.status(500).json({ message: 'Erreur interne du serveur' });
        }
      };
  








