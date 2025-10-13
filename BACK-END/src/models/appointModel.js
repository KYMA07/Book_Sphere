import { DataTypes } from 'sequelize';
import sequelize from '../database/database.js';
import Student from './studentModel.js';
import Book from './bookModel.js';
import User from './userModel.js';

const Appointment = sequelize.define('Appointment', {
  appointment_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  student_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Student,
      key: 'student_id'
    }
  },
  book_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Book,
      key: 'book_id'
    }
  },
  staff_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: User,
      key: 'user_id'
    }
  },
  type: {
    type: DataTypes.ENUM('borrow', 'return'),
    allowNull: false
  },
  scheduled_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM(
      'pending',
      'approved',
      'denied',
      'ready_for_pickup',
      'picked_up',
      'awaiting_return',
      'returned'
    ),
    defaultValue: 'pending'
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'appointments',
  timestamps: false
});

// Relationships
Student.hasMany(Appointment, { foreignKey: 'student_id' });
Appointment.belongsTo(Student, { foreignKey: 'student_id' });

Book.hasMany(Appointment, { foreignKey: 'book_id' });
Appointment.belongsTo(Book, { foreignKey: 'book_id' });

User.hasMany(Appointment, { foreignKey: 'staff_id' });
Appointment.belongsTo(User, { foreignKey: 'staff_id' });

export default Appointment;