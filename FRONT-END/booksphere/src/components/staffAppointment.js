import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/appointment.css'; // Optional: reuse styling

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
      const data = res.data;
      setAppointments(Array.isArray(data.appointments) ? data.appointments : []);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error('Error fetching appointments:', err);
      setAppointments([]);
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
      fetchAppointments();
    } catch (err) {
      console.error('Error updating appointment:', err);
    }
  };

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });

  return (
    <div className="appointment-wrapper">
      <h2 className="appointment-title"> Manage Appointments</h2>

      <div className="dashboard-filters">
        <label>Status Filter:</label>
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="ready_for_pickup">Ready for Pickup</option>
          <option value="picked_up">Picked Up</option>
          <option value="awaiting_return">Awaiting Return</option>
          <option value="returned">Returned</option>
          <option value="denied">Denied</option>
        </select>
      </div>

      <ul className="appointment-list">
        {appointments.map((app) => (
          <li key={app.appointment_id} className={`appointment-item status-${app.status}`}>
            <div>
              <strong>{app.Book?.title || `Book #${app.book_id}`}</strong> — {app.type} on {formatDate(app.scheduled_date)}<br />
              Student: {app.Student?.full_name || `#${app.student_id}`} | Status: <strong>{app.status}</strong>
            </div>

            <div className="appointment-actions">
              {app.status === 'pending' && (
                <>
                  <button onClick={() => handleAction(app.appointment_id, 'approved')}>Approve</button>
                  <button onClick={() => handleAction(app.appointment_id, 'denied')}>Deny</button>
                </>
              )}
              {app.status === 'approved' && (
                <button onClick={() => handleAction(app.appointment_id, 'ready_for_pickup')}>
                  Mark as Ready for Pickup
                </button>
              )}
              {app.status === 'ready_for_pickup' && (
                <button onClick={() => handleAction(app.appointment_id, 'picked_up')}>
                  Mark as Picked Up
                </button>
              )}
              {app.status === 'awaiting_return' && (
                <button onClick={() => handleAction(app.appointment_id, 'returned')}>
                  Confirm Return
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>

      <div className="pagination">
        <button onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} disabled={currentPage === 1}>
          ◀ Prev
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => setCurrentPage((p) => (p < totalPages ? p + 1 : p))}
          disabled={currentPage === totalPages}
        >
          Next ▶
        </button>
      </div>
    </div>
  );
}

export default StaffAppointment;