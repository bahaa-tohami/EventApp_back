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

  export const deleteEvent = async (req, res) => {
    const eventId  = req.params.id;

    try {
        const result = await Event.destroy({
        where: { event_id: eventId }
        });

        if (result > 0) {
        return res.status(200).json({
            message: `L'événement avec l'ID ${eventId} a été supprimé avec succès.`,
        });
        } else {
        return res.status(404).json({
            message: `Aucun événement trouvé avec l'ID ${eventId}.`,
        });
        }
    } catch (error) {
        return res.status(500).json({
        message: 'Erreur lors de la suppression de l\'événement.',
        error: error.message,
        });
    }
  }

