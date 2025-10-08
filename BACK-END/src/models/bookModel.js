import { DataTypes } from 'sequelize';
import sequelize from '../database/database.js';

const Book = sequelize.define('Book', {
  book_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING(200),// this is like VARCHAR in the sql 
    allowNull: false
  },
  author: {
    type: DataTypes.STRING(150),
    allowNull: true
  },
  category: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  publication_year: {
    type: DataTypes.INTEGER, // YEAR(4) can just be INTEGER in Sequelize
    allowNull: true
  },
  isbn: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('available', 'borrowed', 'lost'),
    defaultValue: 'available'
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'books',
  timestamps: false
});

export default Book;
    