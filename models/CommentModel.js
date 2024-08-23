import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import { Sequelize } from "sequelize";

export const Comment = sequelize.define('Comment', {
  comment_id: {
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
  content: {
    type: DataTypes.TEXT
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  },
  rating: {
    type: DataTypes.INTEGER,
    validate: {
      min: 1,
      max: 5
    }
  }
}, {
  tableName: 'Comments',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});


