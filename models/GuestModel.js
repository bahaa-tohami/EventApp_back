import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";
import { Sequelize } from "sequelize";
import { User } from "./UserModel.js";

export const Participant = sequelize.define('Participant', {
  participant_id: {
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
  invited_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  },
  responded_at: {
    type: DataTypes.DATE
  },
  status: {
    type: DataTypes.ENUM('invited', 'accepted', 'declined', 'canceled'),
    defaultValue: 'invited'
  }
}, {
  tableName: 'Participants',
  timestamps: false
});









