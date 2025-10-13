import Book from '../models/bookModel.js';

// GET all books
export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll(); // SELECT * FROM books
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET single book by ID
export const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findOne({ where: { book_id: id } });
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST create new book
export const addBook = async (req, res) => {
  try {
    const { title, author, category, publication_year, isbn, status } = req.body;
    const newBook = await Book.create({ title, author, category, publication_year, isbn, status });
    res.status(201).json(newBook); // 201 = Created
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT update book details
export const updateBook = async (req, res) => {
  try {
    const { id } = req.params;

    // Optional: validate status if included
    const validStatuses = ['available', 'borrowed', 'lost', 'reserved', 'ready_for_pickup', 'awaiting_return'];
    if (req.body.status && !validStatuses.includes(req.body.status)) {
      return res.status(400).json({ message: 'Invalid book status' });
    }

    const updated = await Book.update(req.body, { where: { book_id: id } });
    if (updated[0] === 0) return res.status(404).json({ message: 'Book not found' });
    res.json({ message: 'Book updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE book
export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Book.destroy({ where: { book_id: id } });
    if (!deleted) return res.status(404).json({ message: 'Book not found' });
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT update only book status
export const updateBookStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['available', 'borrowed', 'lost', 'reserved', 'ready_for_pickup', 'awaiting_return'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const updated = await Book.update({ status }, { where: { book_id: id } });
    if (updated[0] === 0) return res.status(404).json({ message: 'Book not found' });

    res.json({ message: 'Book status updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};