import Book from '../models/bookModel.js';


export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll(); //“SELECT * FROM books” but in sequelize await=so the code waits for response 1st before moving on
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const addBook = async (req, res) => {
  try {
    const { title, author, category, publication_year, isbn } = req.body;// the data from the front end
    const newBook = await Book.create({ title, author, category, publication_year, isbn });
    res.status(201).json(newBook);//res.status(201) says that its created and like a standard HTTP success 4 insert 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const updateBook = async (req, res) => {
  try {
    const { id } = req.params; //comes from your URL path sp like /books/5 means the id is 5
    const updated = await Book.update(req.body, { where: { book_id: id } }); // in sql thi is the update, set, and where methods(?)   
    if (updated[0] === 0) return res.status(404).json({ message: 'Book not found' }); 
    res.json({ message: 'Book updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Book.destroy({ where: { book_id: id } });// lol this is to delete -- yung destroy sa sequeluze un
    if (!deleted) return res.status(404).json({ message: 'Book not found' });
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getBookById = async (req, res) => { // 2  get a singular book
  try {
    const { id } = req.params;
    const book = await Book.findOne({ where: { book_id: id } });
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};