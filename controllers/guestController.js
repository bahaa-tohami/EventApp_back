import { Event } from '../models/EventModel.js'; // Chemin corrigé
import { Participant } from '../models/GuestModel.js'; // Chemin corrigé
import { Comment } from '../models/CommentModel.js'; // Chemin corrigé
import { Op } from 'sequelize'; // Importez Op pour les opérations Sequelize
import { User } from '../models/UserModel.js';
import { Notification } from '../models/NotificationModel.js';
import { sendEmail } from '../utils/sendMail.js';
import { getUserIdFromToken } from '../utils/getUserIdFromToken.js';
import { Sequelize } from 'sequelize';

/**
 * Ajouter un commentaire à un événement.
 * @param {Request} req
 * @param {Response} res
 */

/*
export const addComment = async (req, res) => {
    try {
        const { user_id, event_id, content, rating } = req.body;

        // Vérifiez que toutes les données nécessaires sont présentes
        if (!user_id || !event_id || !content || rating === undefined) {
            return res.status(400).json({ message: 'Données manquantes' });
        }

        // Récupérer l'événement à partir de la base de données
        const event = await Event.findByPk(event_id);

        if (!event) {
            return res.status(404).json({ message: 'Événement non trouvé' });
        }
        // Vérifier que l'utilisateur est inscrit à l'événement
        const guest = await Participant.findOne({ where: { user_id, event_id } });

        if (!guest) {
            return res.status(403).json({ message: 'Vous devez être inscrit à l\'événement pour commenter' });
        }
        // Vérifier si la date de l'événement est passée
        const currentDate = new Date();
        if (new Date(event.date) > currentDate) {
            return res.status(400).json({ message: 'Vous ne pouvez commenter que des événements passés' });
        }

        // Ajouter le commentaire à l'événement
        const newComment = await Comment.create({ user_id, event_id, content, rating });

        res.status(201).json({ message: 'Commentaire ajouté avec succès', comment: newComment });
    } catch (error) {
        console.error('Erreur lors de l\'ajout du commentaire:', error);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
};
*/

/**
 * Inviter un utilisateur à un événement.
 * @param {Request} req
 * @param {Response} res
 */

export const inviteUser = async (req, res) => {
    try {
        const { user_id, event_id, participant_id } = req.body;

        console.log('Received user_id:', user_id);
        console.log('Received event_id:', event_id);
        console.log('Received participant_id:', participant_id);

        const tokenUserId = getUserIdFromToken(req);
        if (tokenUserId != user_id) {
            return res.json({ message: "Vous n'êtes pas autorisé à inviter des utilisateurs à cet événement" });
        }

        // Récupérer l'événement à partir de la base de données
        const event = await Event.findByPk(event_id);

        if (!event) {
            return res.status(404).json({ message: 'Événement non trouvé' });
        }

        // Vérifier que l'utilisateur est le créateur de l'événement
        if (event.created_by !== user_id) {
            return res.status(403).json({ message: 'Vous n\'êtes pas autorisé à inviter des utilisateurs à cet événement' });
        }

        // Vérifier si l'utilisateur est déjà invité
        const existingParticipant = await Participant.findOne({ where: { user_id: participant_id, event_id } });
        if (existingParticipant) {
            return res.status(400).json({ message: 'L\'utilisateur est déjà invité à cet événement' });
        }

        // Vérifier si la capacité de l'événement est atteinte
        const currentParticipantsCount = await Participant.count({ where: { event_id } });
        if (currentParticipantsCount >= event.capacity) {
            return res.status(400).json({ message: 'La capacité de l\'événement est atteinte' });
        }

        // Ajouter l'invité à l'événement
        const newParticipant = await Participant.create({ user_id: participant_id, event_id });

        // Récupérer l'entrée créée pour vérifier participant_id
        const participant = await Participant.findOne({
            where: {
                user_id: participant_id,
                event_id: event_id
            }
        });

        console.log('Participant ID:', participant.participant_id);

        // Créer une notification dans la base de données
        const notificationMessage = `Vous avez été invité à l'événement: ${event.title}. Veuillez vérifier les détails et répondre.`;

        await Notification.create({
            user_id: participant_id,
            event_id: event_id,
            message: notificationMessage,
            type: 'invitation'
        });

        res.status(201).json({ message: 'Utilisateur invité avec succès', participant: newParticipant });
    } catch (error) {
        console.error('Erreur lors de l\'invitation de l\'utilisateur:', error);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
};



export const invitationResponse = async (req, res) => {
    try {
        const { user_id, event_id, participant_id, status } = req.body;
        
        if(status != "accepted" && status != "declined"){
            return res.status(400).json({ message: "Le statut doit être 'accepted' ou 'declined'" });
        }
        const currentDate = new Date();
        const tokenUserId = getUserIdFromToken(req);
        if(tokenUserId != user_id) {
            return res.json({ message: "Vous n'êtes pas autorisé à répondre à cette invitation" });
        }
        // Récupérer l'événement à partir de la base de données
        const event = await Event.findByPk(event_id);
        const user = await User.findByPk(user_id);
        const participant = await Participant.findByPk(participant_id);
        if(!participant){
            return res.status(404).json({ message: "L'utilisateur n'est pas invité"});
        }

        if(participant.user_id != user_id || participant.event_id != event_id){
            return res.status(404).json({ message: "L'utilisateur n'est pas invité"});
        }
      
        if (participant.status != "invited") {
            return res.status(404).json({ message: 'L\Utilisateur a déjà répondu à l _invitation' });
        }
       

       participant.status = status;
       participant.responded_at = currentDate;
       await participant.save();   

        res.status(201).json({ message: 'L\Utilisateur a répondu avec succès à l\invitation ', participant});
    } catch (error) {
        console.error('Erreur lors de la réponse à l\'invitation r:', error);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
};

export const getInvitations = async (req, res) => {
    const { id } = req.params;
    const invitations = await Participant.findAll({
        where: {
            [Sequelize.Op.or]: [
                { user_id: id },
                { '$Event.created_by$': id }
            ]
        },
        include: [
            {
                model: Event,
                required: true,
                attributes: ['title', 'date', 'location', 'created_by', 'event_id'],
                include: [
                    {
                        model: User,
                        required: true,
                        attributes: ['username', 'user_id']
                    }
                ]
            },
            {
                model: User,
                required: true,
                attributes: ['username', 'user_id']
            }
        ],
        order: [['invited_at', 'DESC']]
    });
    res.json(invitations);
};

