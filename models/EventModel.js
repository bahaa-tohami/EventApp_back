import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";
import { Sequelize } from "sequelize";
import { Comment } from './CommentModel.js'; // Importer le modèle Comment

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
  time: {
    type: DataTypes.TIME
  },
  capacity: {
    type: DataTypes.INTEGER
  },
  is_private: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  tableName: 'Events',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

// Définir les relations après la définition du modèle
Event.hasMany(Comment, { foreignKey: 'event_id' });
Comment.belongsTo(Event, { foreignKey: 'event_id' });