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
  const studentId = localStorage.getItem('user_id');

  useEffect(() => {
    // Fetch available books
    axios.get('http://localhost:5000/books')
      .then(res => {
        const availableBooks = Array.isArray(res.data) ? res.data.filter(b => b.status === 'available') : [];
        setBooks(availableBooks);
      })
      .catch(err => console.error('Error fetching books:', err));

    // Fetch student's appointments
    axios.get(`http://localhost:5000/appointments?student_id=${studentId}`)
      .then(res => {
        const data = res.data;
        const list = Array.isArray(data.appointments) ? data.appointments : Array.isArray(data) ? data : [];
        setAppointments(list);
      })
      .catch(err => console.error('Error fetching appointments:', err));
  }, [studentId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/appointments', {
        student_id: studentId,
        book_id: bookId,
        type,
        scheduled_date: scheduledDate
      });
      setMessage('Appointment scheduled!');
      setBookId('');
      setScheduledDate('');
      setType('borrow');
      // Refresh appointments
      const res = await axios.get(`http://localhost:5000/appointments?student_id=${studentId}`);
      const data = res.data;
      const list = Array.isArray(data.appointments) ? data.appointments : Array.isArray(data) ? data : [];
      setAppointments(list);
    } catch (err) {
      console.error('Error scheduling appointment:', err);
      setMessage('Error scheduling appointment.');
    }
  };

  return (
  <div className="appointment-wrapper">
    <div className="appointment-panel">
      <h2 className="appointment-title">Schedule Appointment</h2>
      {message && <p className="appointment-message">{message}</p>}

      <form className="appointment-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="book">Book</label>
          <select id="book" value={bookId} onChange={(e) => setBookId(e.target.value)} required>
            <option value="">Select Book</option>
            {books.map(book => (
              <option key={book.book_id} value={book.book_id}>{book.title}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="type">Type</label>
          <select id="type" value={type} onChange={(e) => setType(e.target.value)}>
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
        </div>
      </form>
    </div>

    <div className="appointment-history">
      <h3 className="appointment-subtitle">Your Appointments</h3>
      <ul className="appointment-list">
        {Array.isArray(appointments) && appointments.map(app => (
          <li key={app.appointment_id} className={`appointment-item status-${app.status}`}>
            <span className="appointment-type">{app.type}</span>
            <span className="appointment-status">{app.status}</span>
            <span className="appointment-date">{new Date(app.scheduled_date).toLocaleDateString()}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);
}
export default StudentAppointment;