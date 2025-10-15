import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/appointment.css';

function StudentAppointment() {
  const [books, setBooks] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [bookId, setBookId] = useState('');
  const [type, setType] = useState('borrow');
  const [scheduledDate, setScheduledDate] = useState('');
  const [message, setMessage] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [historyPage, setHistoryPage] = useState(1);
  const historyPerPage = 5;
  const [showReturnForm, setShowReturnForm] = useState(false);
  const [returnDate, setReturnDate] = useState('');
  const [selectedReturnApp, setSelectedReturnApp] = useState(null);

  const studentId = localStorage.getItem('user_id');

  useEffect(() => {
    axios.get('http://localhost:5000/books')
      .then(res => {
        const availableBooks = Array.isArray(res.data)
          ? res.data.filter(b => b.status === 'available')
          : [];
        setBooks(availableBooks);
      })
      .catch(err => console.error('Error fetching books:', err));

    fetchAppointments();
  }, [studentId]);

  const fetchAppointments = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/appointments?student_id=${studentId}`);
      const data = res.data;
      const list = Array.isArray(data.appointments)
        ? data.appointments
        : Array.isArray(data)
        ? data
        : [];
      setAppointments(list);
    } catch (err) {
      console.error('Error fetching appointments:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/appointments', {
        student_id: studentId,
        book_id: bookId,
        type,
        scheduled_date: scheduledDate
      });
      setMessage(' Appointment scheduled!');
      setBookId('');
      setScheduledDate('');
      setType('borrow');
      setShowForm(false);
      fetchAppointments();
    } catch (err) {
      console.error('Error scheduling appointment:', err);
      setMessage(' Error scheduling appointment.');
    }
  };

  const handleConfirm = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/appointments/${id}/status`, {
        status,
        student_id: studentId
      });
      fetchAppointments();
    } catch (err) {
      console.error('Error confirming status:', err);
    }
  };

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });

  // === Derived Lists ===
  const upcoming = appointments.filter(a =>
    ['pending', 'approved', 'ready_for_pickup'].includes(a.status)
  );

  const openBooks = appointments.filter(a =>
    ['picked_up', 'awaiting_return'].includes(a.status)
  );

  const history = appointments.filter(a =>
    ['returned', 'denied'].includes(a.status)
  );

  const overdueReminders = appointments.filter(a => {
    if (!a.due_date) return false;
    const due = new Date(a.due_date);
    const today = new Date();
    const diffDays = Math.ceil((due - today) / (1000 * 60 * 60 * 24));
    return diffDays <= 3 && diffDays >= 0 && a.status === 'picked_up';
  });

  const overdue = appointments.filter(a => a.status === 'overdue');

  // Paginate history
  const paginatedHistory = history.slice(
    (historyPage - 1) * historyPerPage,
    historyPage * historyPerPage
  );

  return (
    <div className="appointment-wrapper">
      <h2 className="appointment-title"> Library Appointments</h2>
      {message && <p className="appointment-message">{message}</p>}

      <button className="toggle-btn" onClick={() => setShowForm(true)}>
        Schedule Appointment
      </button>

      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <h2>📅 Schedule an Appointment</h2>
            <form className="appointment-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="book">Book</label>
                <select
                  id="book"
                  value={bookId}
                  onChange={(e) => setBookId(e.target.value)}
                  required
                >
                  <option value="">Select Book</option>
                  {books.map((book) => (
                    <option key={book.book_id} value={book.book_id}>
                      {book.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="type">Type</label>
                <select
                  id="type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="borrow">Borrow</option>
                  <option value="return">Return</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="date">Date</label>
                <input
                  id="date"
                  type="date"
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                  required
                />
              </div>

              <div className="form-actions">
                <button type="submit">Submit</button>
                <button type="button" onClick={() => setShowForm(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showReturnForm && (
        <div className="modal">
          <div className="modal-content">
            <h2>📅 Request Return</h2>
            <form
              className="appointment-form"
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  await axios.put(
                    `http://localhost:5000/appointments/${selectedReturnApp.appointment_id}/status`,
                    {
                      status: "awaiting_return",
                      student_id: studentId,
                      scheduled_date: returnDate,
                    }
                  );
                  setMessage("✅ Return request submitted!");
                  setReturnDate("");
                  setShowReturnForm(false);
                  setSelectedReturnApp(null);
                  fetchAppointments();
                } catch (err) {
                  console.error("Error requesting return:", err);
                  setMessage("❌ Error requesting return.");
                }
              }}
            >
              <div className="form-group">
                <label htmlFor="returnDate">Return Date & Time</label>
                <input
                  id="returnDate"
                  type="datetime-local"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  required
                />
              </div>

              <div className="form-actions">
                <button type="submit">Submit</button>
                <button
                  type="button"
                  onClick={() => {
                    setShowReturnForm(false);
                    setSelectedReturnApp(null);
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="appointment-dashboard">
        {/* Upcoming Appointments */}
        {upcoming.length > 0 && (
          <>
            <h3 className="appointment-subtitle"> Upcoming Appointments</h3>
            <ul className="appointment-list">
              {upcoming.map((app) => (
                <li
                  key={app.appointment_id}
                  className={`appointment-item status-${app.status}`}
                >
                  <strong>{app.Book?.title}</strong> — {app.type} on{" "}
                  {formatDate(app.scheduled_date)} ({app.status})
                  {app.status === "ready_for_pickup" && (
                    <button
                      onClick={() =>
                        handleConfirm(app.appointment_id, "picked_up")
                      }
                    >
                      Confirm Pickup
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </>
        )}

        {/* Open Books */}
        {openBooks.length > 0 && (
          <>
            <h3 className="appointment-subtitle"> Open Books</h3>
            <ul className="appointment-list">
              {openBooks.map((app) => (
                <li key={app.appointment_id}>
                  <strong>{app.Book?.title}</strong> — Borrowed on {formatDate(app.scheduled_date)}
                  {app.status === "picked_up" && (
                    <button
                      onClick={() => {
                        setSelectedReturnApp(app);
                        setShowReturnForm(true);
                      }}
                    >
                      Request Return
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </>
        )}

        {/* Overdue Reminders */}
        {(overdueReminders.length > 0 || overdue.length > 0) && (
          <>
            <h3 className="appointment-subtitle"> Reminders & Overdue</h3>
            <ul className="appointment-list">
              {overdueReminders.map((app) => (
                <li key={app.appointment_id}>
                  <strong>{app.Book?.title}</strong> — Due soon (
                  {formatDate(app.due_date)})
                </li>
              ))}
              {overdue.map((app) => (
                <li key={app.appointment_id} className="status-overdue">
                  <strong>{app.Book?.title}</strong> — Overdue since{" "}
                  {formatDate(app.scheduled_date)}
                </li>
              ))}
            </ul>
          </>
        )}

        {/* History Button Always Visible */}
        <button
          className="toggle-btn"
          onClick={() => setShowHistory(!showHistory)}
        >
          {showHistory ? "Hide History" : "See History"}
        </button>

        {showHistory && (
          <div>
            <h3 className="appointment-subtitle"> History</h3>
            {history.length > 0 ? (
              <>
                <ul className="appointment-list">
                  {paginatedHistory.map((app) => (
                    <li key={app.appointment_id}>
                      <strong>{app.Book?.title}</strong> — {app.type} (
                      {app.status})
                    </li>
                  ))}
                </ul>
                <div className="pagination">
                  <button
                    onClick={() => setHistoryPage((p) => Math.max(p - 1, 1))}
                    disabled={historyPage === 1}
                  >
                    ◀ Prev
                  </button>
                  <span>
                    Page {historyPage} of{" "}
                    {Math.ceil(history.length / historyPerPage)}
                  </span>
                  <button
                    onClick={() =>
                      setHistoryPage((p) =>
                        p < Math.ceil(history.length / historyPerPage)
                          ? p + 1
                          : p
                      )
                    }
                    disabled={
                      historyPage >= Math.ceil(history.length / historyPerPage)
                    }
                  >
                    Next ▶
                  </button>
                </div>
              </>
            ) : (
              <p className="appointment-message">No history records yet.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}  

export default StudentAppointment;