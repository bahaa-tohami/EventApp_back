import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

export const Comment = sequelize.define('Comment', {
  comment_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  event_id: {
    type: DataTypes.INTEGER,
    allowNull: false
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