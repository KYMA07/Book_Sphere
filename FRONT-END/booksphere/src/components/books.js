import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/books.css';

function Books() {
  const [books, setBooks] = useState([]);
  const [borrowRecords, setBorrowRecords] = useState([]);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('book_id');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);
  const [showBorrowForm, setShowBorrowForm] = useState(false);
  const [studentNumber, setStudentNumber] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    category: '',
    publication_year: '',
    isbn: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 10;
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [appointmentDate, setAppointmentDate] = useState('');

  const role = (localStorage.getItem('role') || '').toLowerCase();
  const userId = localStorage.getItem('user_id');

  useEffect(() => {
    if (role === 'student') {
      setStudentNumber(userId); // assuming user_id is student_number for students
    }
  }, [role, userId]);

  const fetchBooks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/books');
      setBooks(res.data);
    } catch (err) {
      console.error('Error fetching books:', err);
    }
  };

  const fetchBorrowRecords = async () => {
    try {
      const res = await axios.get('http://localhost:5000/borrow');
      setBorrowRecords(res.data);
    } catch (err) {
      console.error('Error fetching borrow records:', err);
    }
  };

  useEffect(() => {
    fetchBooks();
    fetchBorrowRecords();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, filterCategory, filterStatus]);

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
      return a.book_id - b.book_id;
    });

  const getRecordIdForBook = (bookId) => {
    const record = borrowRecords.find(r => r.book_id === bookId && r.status === 'borrowed');
    return record?.record_id;
  };

  const handleDoubleClick = (book) => {
    setSelectedBook(book);
    setShowBorrowForm(false);
    if (role === 'student') {
      setStudentNumber(userId);
    } else {
      setStudentNumber('');
    }
  };

  const handleBorrowClick = () => {
    setShowBorrowForm(true);
  };

  const submitNewBook = async () => {
    try {
      const res = await axios.post('http://localhost:5000/books', newBook);
      alert(`✅ ${res.data.message || 'Book added successfully'}`);
      fetchBooks();
      setShowAddModal(false);
      setNewBook({
        title: '',
        author: '',
        category: '',
        publication_year: '',
        isbn: ''
      });
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data?.error || 'Add book failed';
      alert(`❌ ${msg}`);
    }
  };
  const submitAppointment = async () => {
    if (!studentNumber || !selectedBook?.book_id || !appointmentDate) {
      alert('❌ Missing required fields.');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/appointments', {
        student_id: studentNumber,
        book_id: selectedBook.book_id,
        type: 'borrow',
        scheduled_date: appointmentDate   // <-- use the chosen date
      });

      alert(`✅ ${res.data.message || 'Appointment set successfully'}`);
      setShowAppointmentForm(false);
      setSelectedBook(null);
      setAppointmentDate(''); // reset
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data?.error || 'Appointment failed';
      alert(`❌ ${msg}`);
    }
  };
  const submitBorrow = async () => {
    const bookId = selectedBook?.book_id;
    const staffId = role === 'staff' ? userId : null;

    if (!studentNumber || !bookId || !staffId) {
      alert('❌ Missing required fields: student number, book ID, or staff ID.');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/borrow/borrow', {
        student_number: studentNumber,
        book_id: bookId,
        staff_id: staffId,
      });

      alert(`✅ ${res.data.message}`);
      fetchBooks();
      fetchBorrowRecords();
      setShowBorrowForm(false);
      setSelectedBook(null);
      if (role !== 'student') setStudentNumber('');
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data?.error || 'Borrow failed';
      alert(`❌ ${msg}`);
    }
  };

  const handleReturn = async () => {
    const recordId = getRecordIdForBook(selectedBook.book_id);
    if (!recordId) {
      alert('❌ No active borrow record found.');
      return;
    }

    try {
      const res = await axios.put(`http://localhost:5000/borrow/return/${recordId}`);
      alert(`✅ ${res.data.message || 'Book returned successfully'}`);
      fetchBooks();
      fetchBorrowRecords();
      setSelectedBook(null);
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data?.error || 'Return failed';
      alert(`❌ ${msg}`);
    }
  };

  const handleExportBooks = () => {
    const csv = [
      ['Book ID', 'Title', 'Author', 'Category', 'Year', 'ISBN', 'Status'],
      ...filteredBooks.map(b => [
        b.book_id, b.title, b.author, b.category, b.publication_year, b.isbn, b.status
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'books.csv';
    link.click();
  };

  return (
    <div className="books-page">
      <h1>Books</h1>

      <div className="book-stats">
        <p>Total Books: {books.length}</p>
        <p>Available: {books.filter(b => b.status === 'available').length}</p>
        <p>Borrowed: {books.filter(b => b.status === 'borrowed').length}</p>
        <p>Reserved: {books.filter(b => b.status === 'reserved').length}</p>
        <button onClick={handleExportBooks}>Export CSV</button>
      </div>

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

        {(role === 'staff' ) && (
          <button className="addbtn"onClick={() => setShowAddModal(true)}> + Add Book</button>
        )}
      </div>

      <table className="books-table">
        <thead>
          <tr>
            <th>ID</th><th>Title</th><th>Author</th><th>Category</th><th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks
            .slice((currentPage - 1) * booksPerPage, currentPage * booksPerPage)
            .map((book) => (
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

      <div className="pagination">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          ◀ Prev
        </button>

        <span>
          Page {currentPage} of {Math.ceil(filteredBooks.length / booksPerPage)}
        </span>

        <button
          onClick={() =>
            setCurrentPage((prev) =>
              prev < Math.ceil(filteredBooks.length / booksPerPage) ? prev + 1 : prev
            )
          }
          disabled={currentPage >= Math.ceil(filteredBooks.length / booksPerPage)}
        >
          Next ▶
        </button>
      </div>

      {selectedBook && (
        <div className="modal">
          <div className="modal-content">
            <h2>{selectedBook.title}</h2>
            <p><strong>Author:</strong> {selectedBook.author}</p>
            <p><strong>Category:</strong> {selectedBook.category}</p>
            <p><strong>Year:</strong> {selectedBook.publication_year}</p>
            <p><strong>ISBN:</strong> {selectedBook.isbn}</p>
            <p><strong>Status:</strong> {selectedBook.status}</p>

            {role === 'staff' && (
              <>
                {selectedBook.status === 'available' && !showBorrowForm && (
                  <button onClick={handleBorrowClick}>Borrow</button>
                )}
                {selectedBook.status === 'borrowed' && (
                  <button onClick={handleReturn}>Return</button>
                )}
              </>
            )}
            {/* Student Appointment Option */}
            {role === 'student' && (
              <>
                {selectedBook.status === 'available' && (
                  <>
                    {!showAppointmentForm ? (
                      <button onClick={() => setShowAppointmentForm(true)}>
                        Set Appointment
                      </button>
                    ) : (
                      <div className="appointment-form">
                        {/* Replace textarea with calendar input */}
                        <label>
                          Choose appointment date & time:
                          <input
                            type="datetime-local"
                            value={appointmentDate}
                            onChange={(e) => setAppointmentDate(e.target.value)}
                          />
                        </label>

                        <button onClick={submitAppointment}>Submit Appointment</button>
                        <button onClick={() => setShowAppointmentForm(false)}>Cancel</button>
                      </div>
                    )}
                  </>
                )}
                {selectedBook.status === 'reserved' && (
                  <p className="status-note">
                    📚 This book is currently reserved. You’ll be notified when it’s ready for pickup.
                  </p>
                )}
              </>
            )}


            {showBorrowForm && (
              <div className="borrow-form">
                <h3>Borrow Book</h3>
                <input
                  type="text"
                  placeholder="Student Number"
                  value={studentNumber}
                  onChange={(e) => setStudentNumber(e.target.value)}
                  disabled={role === 'student'}
                />
                <button onClick={submitBorrow}>Confirm Borrow</button>
                <button onClick={() => setShowBorrowForm(false)}>Cancel</button>
              </div>
            )}

            <button onClick={() => setSelectedBook(null)}>Close</button>
          </div>
        </div>
      )}

      {showAddModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add New Book</h2>
            <input
              type="text"
              placeholder="Title"
              value={newBook.title}
              onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
            />
            <input
              type="text"
              placeholder="Author"
              value={newBook.author}
              onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
            />
            <input
              type="text"
              placeholder="Category"
              value={newBook.category}
              onChange={(e) => setNewBook({ ...newBook, category: e.target.value })}
            />
            <input
              type="number"
              placeholder="Publication Year"
              value={newBook.publication_year}
              onChange={(e) => setNewBook({ ...newBook, publication_year: e.target.value })}
            />
            <input
              type="text"
              placeholder="ISBN"
              value={newBook.isbn}
              onChange={(e) => setNewBook({ ...newBook, isbn: e.target.value })}
            />
            <button onClick={submitNewBook}>Confirm Add</button>
            <button onClick={() => setNewBook({
              title: '', author: '', category: '', publication_year: '', isbn: ''
            })}>Reset Form</button>
            <button onClick={() => setShowAddModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Books;