import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import { Sequelize } from "sequelize";

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
  updatedAt: false
});


