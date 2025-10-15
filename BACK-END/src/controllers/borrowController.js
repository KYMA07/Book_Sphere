import { BorrowRecord } from '../models/borrowModel.js';
import Book from '../models/bookModel.js';
import Student from '../models/studentModel.js';
import User from '../models/userModel.js';
import { Op } from 'sequelize';

// Helper: calculate penalty
function calculatePenalty(dueDate, status) {
  if (!dueDate || (status !== 'borrowed' && status !== 'overdue')) return 0;

  const now = new Date();
  const diffDays = Math.floor((now - dueDate) / (1000 * 60 * 60 * 24));

  if (diffDays > 2) {
    return (diffDays - 2) * 5; // ₱5/day after 2-day grace
  }
  return 0;
}

// Borrow a book
export const borrowBook = async (req, res) => {
  try {
    const { student_number, book_id, staff_id } = req.body;

    const student = await Student.findOne({ where: { student_number } });
    if (!student) return res.status(404).json({ message: 'Student not found' });

    const student_id = student.student_id;

    const book = await Book.findByPk(book_id);
    if (!book || book.status !== 'available') {
      return res.status(400).json({ message: 'Book not available' });
    }

    const borrowDate = new Date();
    const dueDate = new Date(borrowDate);
    dueDate.setDate(dueDate.getDate() + 7);

    const record = await BorrowRecord.create({
      student_id,
      book_id,
      staff_id,
      borrow_date: borrowDate,
      due_date: dueDate,
      status: 'borrowed',
      penalty: 0
    });

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

    // calculate penalty before updating
    const penalty = calculatePenalty(record.due_date, record.status);

    await record.update({
      status: 'returned',
      return_date: new Date(),
      penalty
    });
    await record.Book.update({ status: 'available' });

    res.json({ message: 'Book returned successfully', penalty });
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

    // recalc penalties on the fly for freshness
    const updated = records.map(r => {
      const penalty = calculatePenalty(r.due_date, r.status);
      return { ...r.toJSON(), penalty };
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get filtered borrow records
export const getBorrowRecordsFiltered = async (req, res) => {
  try {
    const { range, status } = req.query;
    const where = {};

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

    if (status) {
      where.status = status;
    }

    const records = await BorrowRecord.findAll({
      where,
      include: [Student, Book, User]
    });

    const updated = records.map(r => {
      const penalty = calculatePenalty(r.due_date, r.status);
      return { ...r.toJSON(), penalty };
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};