import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/styles.css';

function Books() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('book_id'); // default sort
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [selectedBook, setSelectedBook] = useState(null); // for popout
  const role = (localStorage.getItem('role') || '').toLowerCase();// admin, librarian, student

  console.log("Role in Books.js:", `"${role}"`);
  
  // Fetch books
  const fetchBooks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/books');
      setBooks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Search + filter + sort
  const filteredBooks = books
    .filter((b) =>
      [b.title, b.author, b.isbn, b.book_id.toString()]
        .some((field) => field?.toLowerCase().includes(search.toLowerCase()))
    )
    .filter((b) => (filterCategory ? b.category === filterCategory : true))
    .filter((b) => (filterStatus ? b.status === filterStatus : true))
    .sort((a, b) => {
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      if (sortBy === 'author') return a.author.localeCompare(b.author);
      return a.book_id - b.book_id; // default
    });

  // Double click handler
  const handleDoubleClick = (book) => {
    setSelectedBook(book);
  };

  // Borrow / Return actions
  const handleBorrow = (book) => {
    // redirect to borrow form page
    window.location.href = `/borrow/${book.book_id}`;
  };

  const handleReturn = async (book) => {
    try {
      await axios.post(`http://localhost:5000/borrow/return/${book.record_id}`);
      fetchBooks();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="books-page">
      <h1>Books</h1>

      {/* Search + Filters */}
      <div className="controls">
        <input
          type="text"
          placeholder="Search by title, author, ISBN, or ID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="book_id">Sort by ID</option>
          <option value="title">Sort by Title</option>
          <option value="author">Sort by Author</option>
        </select>

        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
          <option value="">All Categories</option>
          {[...new Set(books.map((b) => b.category))].map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="">All Status</option>
          <option value="available">Available</option>
          <option value="borrowed">Borrowed</option>
          <option value="lost">Lost</option>
        </select>
      </div>

      {/* Books Table */}
      <table className="books-table">
        <thead>
          <tr>
            <th>ID</th><th>Title</th><th>Author</th><th>Category</th><th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks.map((book) => (
            <tr key={book.book_id} onDoubleClick={() => handleDoubleClick(book)}>
              <td>{book.book_id}</td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.category}</td>
              <td>{book.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Popout Window */}
      {selectedBook && (
        <div className="modal">
          <div className="modal-content">
            <h2>{selectedBook.title}</h2>
            <p><strong>Author:</strong> {selectedBook.author}</p>
            <p><strong>Category:</strong> {selectedBook.category}</p>
            <p><strong>Year:</strong> {selectedBook.publication_year}</p>
            <p><strong>ISBN:</strong> {selectedBook.isbn}</p>
            <p><strong>Status:</strong> {selectedBook.status}</p>

            {/* Role-based actions: Only admin/librarian can borrow/return */}
            {(role === 'admin' || role === 'librarian') ? (
              <>
                {selectedBook.status === 'available' && (
                  <button onClick={() => handleBorrow(selectedBook)}>Borrow</button>
                )}
                {selectedBook.status === 'borrowed' && (
                  <button onClick={() => handleReturn(selectedBook)}>Return</button>
                )}
              </>
            ) : null}

            <button onClick={() => setSelectedBook(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Books;