import { Event } from "../models/EventModel.js";
/**
 * Enregistrer un nouvel événement
 * @param {Request} req
 * @param {Response} res
 */
export const saveEvent = async (req, res) => {
    try {
      const userId = req.params.id;
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






