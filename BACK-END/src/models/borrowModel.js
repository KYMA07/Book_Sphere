import { DataTypes } from 'sequelize';
import sequelize from '../database/database.js';
import Student from './studentModel.js';
import Book from './bookModel.js';
import User from './userModel.js';

const BorrowRecord = sequelize.define('BorrowRecord', {
  record_id: {
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
  librarian_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: User,
      key: 'user_id'
    }
  },
  borrow_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  due_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  return_date: {
    type: DataTypes.DATE,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('borrowed', 'returned', 'overdue', 'lost'),
    defaultValue: 'borrowed'
  }
}, {
  tableName: 'borrow_records',
  timestamps: false
});

// Relationships
Student.hasMany(BorrowRecord, { foreignKey: 'student_id' });
BorrowRecord.belongsTo(Student, { foreignKey: 'student_id' });

Book.hasMany(BorrowRecord, { foreignKey: 'book_id' });
BorrowRecord.belongsTo(Book, { foreignKey: 'book_id' });

User.hasMany(BorrowRecord, { foreignKey: 'librarian_id' });
BorrowRecord.belongsTo(User, { foreignKey: 'librarian_id' });

export default BorrowRecord;  