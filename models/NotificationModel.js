import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import { Sequelize } from "sequelize";
import { Event } from "./EventModel.js";
import { User } from "./UserModel.js";
import { sendEmail } from "../utils/sendMail.js";

export const Notification = sequelize.define('Notification', {
  notification_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users',
      key: 'user_id'
    }
  },
  event_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Events',
      key: 'event_id'
    }
  },
  message: {
    type: DataTypes.TEXT
  },
  is_read: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  },
  type: {
    type: DataTypes.ENUM('invitation', 'reminder', 'update')
  }
}, {
  tableName: 'Notifications',
  timestamps: false,
  createdAt: 'created_at',
  updatedAt: false,
  hooks: {
    beforeCreate: async (notification, options) => {
      try {
        const event = await Event.findByPk(notification.event_id);
        const user = await User.findByPk(notification.user_id);
        if (event && user) { 
          const emailSubject = `Nouvelle notification: ${notification.type}`;
          const emailText = `Bonjour ${user.username},\n\n${notification.message}\n\nMerci.`;
          await sendEmail(user.email, emailSubject, emailText);
        } 
      } catch (error) {
        console.error('Erreur lors de la création de la notification:', error);
      }
        
  }
}});


