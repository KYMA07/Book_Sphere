import React, { useState, useEffect } from 'react';
import axios from 'axios';

function StaffAppointment() {
  const [appointments, setAppointments] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const staffId = localStorage.getItem('user_id');

  const fetchAppointments = async () => {
    try {
      const res = await axios.get('http://localhost:5000/appointments', {
        params: { status: statusFilter, page: currentPage, limit: 10 }
      });

      // ✅ Correctly extract the array
      const data = res.data;
      setAppointments(Array.isArray(data.appointments) ? data.appointments : []);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error('Error fetching appointments:', err);
      setAppointments([]); // fallback to empty array
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [statusFilter, currentPage]);

  const handleAction = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/appointments/${id}/status`, {
        status,
        staff_id: staffId
      });
      fetchAppointments(); // refresh list
    } catch (err) {
      console.error('Error updating appointment:', err);
    }
  };

  return (
    <div className="container">
      <h2>Manage Appointments</h2>

      <label>Status Filter: </label>
      <select value={statusFilter} onChange={(e) => {
        setStatusFilter(e.target.value);
        setCurrentPage(1);
      }}>
        <option value="all">All</option>
        <option value="pending">Pending</option>
        <option value="approved">Approved</option>
        <option value="denied">Denied</option>
        <option value="ready_for_pickup">Ready for Pickup</option>
        <option value="picked_up">Picked Up</option>
        <option value="awaiting_return">Awaiting Return</option>
        <option value="returned">Returned</option>
      </select>

      <ul>
        {appointments.map(app => (
          <li key={app.appointment_id}>
            Student #{app.student_id} wants to {app.type} book #{app.book_id} on {new Date(app.scheduled_date).toLocaleDateString()} — <strong>{app.status}</strong>
            {app.status === 'pending' && (
              <>
                <button onClick={() => handleAction(app.appointment_id, 'approved')}>Approve</button>
                <button onClick={() => handleAction(app.appointment_id, 'denied')}>Deny</button>
              </>
            )}
          </li>
        ))}
      </ul>

      <div className="pagination">
        <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1}>◀ Prev</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={() => setCurrentPage(p => p < totalPages ? p + 1 : p)} disabled={currentPage === totalPages}>Next ▶</button>
      </div>
    </div>
  );
}

export default StaffAppointment;