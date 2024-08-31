import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";
import { Sequelize } from "sequelize";
import { Comment } from './CommentModel.js'; // Importer le modèle Comment
import { User } from './UserModel.js';
import { Participant } from './GuestModel.js';
import { Notification } from './NotificationModel.js';
import { sendEmail } from "../utils/sendMail.js";

export const Event = sequelize.define('Event', {
    event_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    description: {
        type: DataTypes.TEXT
    },
    date: {
        type: DataTypes.DATEONLY
    },
    created_by: {
        type: DataTypes.INTEGER
    },
    time: {
        type: DataTypes.TIME
    },
    capacity: {
        type: DataTypes.INTEGER
    },

    created_by: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Users',
            key: 'user_id',
        },
    },
    is_private: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false
    },
    deletedAt: {
        type: DataTypes.DATE,
        allowNull: true
    },
}, {
    tableName: 'Events',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    paranoid: true,
    hooks: {
        afterUpdate: async (event, options) => {
            console.log("hook entry")
            const Participants = await Participant.findAll({ where: { event_id: event.event_id, status: "accepted" } });
            console.log("Pariticipant dans la base");
            Participants.forEach(async (participant) => {
                const user = await User.findByPk(participant.user_id);
                const message = `L'evenement: ${event.title} a été modifié`;
                const notification = new Notification({
                    user_id: participant.user_id,
                    event_id: event.event_id,
                    type: 'update',
                    message: message
                });
                const emailSubject = `Nouvelle notification: ${notification.type}`;
                const emailText = `
                    <html>
                    <body>
                        <h1>Nouvelle notification</h1>
                        <p>Bonjour ${user.username},</p>
                        <p>${notification.message}</p>
                        <p>Merci.</p>
                        <a href="${process.env.FRONTEND_URL}/">Accéder à l'application</a>
                    </body>
                    </html>
                 `;
                if(user && user.email) {
                    await sendEmail(user.email, emailSubject, emailText);
                    await notification.save();
                }
            });
        }
    }
});

// Définir les relations après la définition du modèle
Event.hasMany(Comment, { foreignKey: 'event_id' });
Comment.belongsTo(Event, { foreignKey: 'event_id' });

//relation entre event et user
Event.belongsTo(User, { foreignKey: 'created_by' });
User.hasMany(Event, { foreignKey: 'created_by' });

// Un Event peut avoir plusieurs Participants
Event.hasMany(Participant, { foreignKey: 'event_id' });
Participant.belongsTo(Event, { foreignKey: 'event_id' });


//relation entre event et notification
Event.hasMany(Notification, { foreignKey: 'event_id' });
Notification.belongsTo(Event, { foreignKey: 'event_id' });