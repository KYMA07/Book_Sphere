import { DataTypes } from 'sequelize';
import sequelize from '../database/database.js';

const Student = sequelize.define('Student', {
  student_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  student_number: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  full_name: {
    type: DataTypes.STRING(150),
    allowNull: false
  },
  course: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  year_level: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  email: {
    type: DataTypes.STRING(150),
    allowNull: true
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'students',
  timestamps: false
});

export default Student;
