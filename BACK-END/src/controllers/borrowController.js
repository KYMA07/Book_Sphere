import BorrowRecord from '../models/BorrowRecord.js';
import Book from '../models/Book.js';
import Student from '../models/Student.js';
import User from '../models/User.js';

export const borrowBook = async (req, res) => {
  try {
    const { student_id, book_id, librarian_id, due_date } = req.body;// deconstructuring ya

    // Check if book is available
    const book = await Book.findByPk(book_id);
    if (!book || book.status !== 'available') {
      return res.status(400).json({ message: 'Book not available' });
    }

   
    const record = await BorrowRecord.create({ // kung available ung sa taas ung sa req.body ya
      student_id,
      book_id,
      librarian_id,
      due_date,
      returned: false
    });

   
    await book.update({ status: 'borrowed' });

    res.status(201).json({ message: 'Book borrowed successfully', record });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const returnBook = async (req, res) => {
  try {
    const { record_id } = req.params;// url parameters
    const record = await BorrowRecord.findByPk(record_id, { include: Book });

    if (!record) return res.status(404).json({ message: 'Record not found' });
    if (record.returned) return res.status(400).json({ message: 'Book already returned' });// if true semd 400

    await record.update({ returned: true, return_date: new Date() });// update bookrecors
    await record.Book.update({ status: 'available' });// tas update ung sa book

    res.json({ message: 'Book returned successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getAllBorrowRecords = async (req, res) => {
  try {
    const records = await BorrowRecord.findAll({
      include: [Student, Book, User]// sama ung mga related 
    });
    res.json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
