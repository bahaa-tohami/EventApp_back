import { Op } from 'sequelize';
import { Event } from '../models/EventModel.js';
import { Participant } from '../models/GuestModel.js';
import { Notification } from '../models/NotificationModel.js';


const inComingEvents = async () => {
     // Les événements qui se déroulent dans les prochaines 24 heures
    const now = new Date();
    const in24Hours = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    const events = await Event.findAll({
        where: {
            [Op.and]: [
                {
                    date: {
                        [Op.eq]: in24Hours.toISOString().split('T')[0]
                    }
                }
            ]
        },
        include: [
            {
                model: Participant,
                attributes: ['participant_id', 'invited_at', 'responded_at', 'status', 'event_id', 'user_id'],
                where: {
                    status: 'accepted'
                }
            }
        ]
    });
    return events;
}

export const sendRemindersNotifications = async () => {
    console.log("cron job");
    // parcourir les événements et pour chaque evenement voir les participants
    const events = await inComingEvents();
    events.forEach(async (event) => {
        event.Participants.forEach(async participant => {  
            const message = `L'evenement: ${event.title} va se dérouler dans les prochaines 24 heures`;
            //Trouver si l'utilisateur a déjà une notification de ce type pour cet événement

            const notification = await Notification.findOne({
                where: {
                    user_id: participant.user_id,
                    type: 'reminder',
                    event_id: event.event_id
                }
            });
            if (!notification) {
                const newNotification = new Notification({
                    user_id: participant.user_id,
                    event_id: event.event_id,
                    type: 'reminder',
                    message: message
                });
                await newNotification.save();
                console.log("notification envoyée");
            }
        });
    });

};

