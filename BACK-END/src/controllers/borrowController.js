import BorrowRecord from '../models/borrowModel.js';
import Book from '../models/bookModel.js';
import Student from '../models/studentModel.js';
import User from '../models/userModel.js';
import { Op } from 'sequelize';

// Borrow a book
export const borrowBook = async (req, res) => {
  try {
    const { student_id, book_id, librarian_id } = req.body;

    // Check if book is available
    const book = await Book.findByPk(book_id);
    if (!book || book.status !== 'available') {
      return res.status(400).json({ message: 'Book not available' });
    }

    // Compute borrow_date and due_date (7 days later)
    const borrowDate = new Date();
    const dueDate = new Date(borrowDate);
    dueDate.setDate(dueDate.getDate() + 7);

    // Create borrow record with status = 'borrowed'
    const record = await BorrowRecord.create({
      student_id,
      book_id,
      librarian_id,
      borrow_date: borrowDate,
      due_date: dueDate,
      status: 'borrowed'
    });

    // Update book status
    await book.update({ status: 'borrowed' });

    res.status(201).json({ message: 'Book borrowed successfully', record });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Return a book
export const returnBook = async (req, res) => {
  try {
    const { record_id } = req.params;
    const record = await BorrowRecord.findByPk(record_id, { include: Book });

    if (!record) return res.status(404).json({ message: 'Record not found' });
    if (record.status === 'returned') {
      return res.status(400).json({ message: 'Book already returned' });
    }

    await record.update({ status: 'returned', return_date: new Date() });
    await record.Book.update({ status: 'available' });

    res.json({ message: 'Book returned successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all borrow records
export const getAllBorrowRecords = async (req, res) => {
  try {
    const records = await BorrowRecord.findAll({
      include: [Student, Book, User]
    });
    res.json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get filtered borrow records
export const getBorrowRecordsFiltered = async (req, res) => {
  try {
    const { range, status } = req.query;
    const where = {};

    // Date filtering
    if (range && range !== 'overall') {
      const now = new Date();
      let start;
      if (range === 'day') {
        start = new Date();
        start.setHours(0, 0, 0, 0);
      }
      if (range === 'week') {
        start = new Date();
        start.setDate(start.getDate() - 7);
      }
      if (range === 'month') {
        start = new Date();
        start.setMonth(start.getMonth() - 1);
      }
      if (range === 'year') {
        start = new Date();
        start.setFullYear(start.getFullYear() - 1);
      }
      if (start) where.borrow_date = { [Op.gte]: start };
    }

    // Status filtering
    if (status) {
      where.status = status;
    }

    const records = await BorrowRecord.findAll({
      where,
      include: [Student, Book, User]
    });

    res.json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};