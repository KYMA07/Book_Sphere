import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/staff.css';

function StaffAppointment() {
  const [appointments, setAppointments] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const staffId = localStorage.getItem('user_id');
  const [showDropdown, setShowDropdown] = useState(false);

  const fetchAppointments = async () => {
    try {
      const res = await axios.get('http://localhost:5000/appointments', {
        params: { status: statusFilter, page: currentPage, limit: 20 }
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
    new Date(dateStr).toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

  // === Grouped Lists ===
  const borrowRequests = appointments.filter(a =>
    ['pending', 'approved', 'ready_for_pickup', 'picked_up'].includes(a.status)
  );

  const returnRequests = appointments.filter(a =>
    ['awaiting_return', 'approved_return', 'returned'].includes(a.status)
  );

  const statuses = [
    'all',
    'pending',
    'approved',
    'ready_for_pickup',
    'picked_up',
    'awaiting_return',
    'approved_return',
    'returned',
    'denied'
  ];

  return (
    <div className="appointment-wrapper">
      <h2 className="appointment-title">Manage Appointments</h2>

      {/* Filter Buttons */}
      <div className="status-filters">
        <button
          className={`filter-btn ${statusFilter === 'all' ? 'active' : ''}`}
          onClick={() => {
            setStatusFilter('all');
            setCurrentPage(1);
          }}
        >
          All
        </button>

        <div className="filter-dropdown">
          <button className="filter-toggle" onClick={() => setShowDropdown(!showDropdown)}>
            More Filters ▾
          </button>

          {showDropdown && (
            <div className="filter-options">
              {statuses
                .filter((status) => status !== 'all')
                .map((status) => (
                  <button
                    key={status}
                    className={`filter-btn ${statusFilter === status ? 'active' : ''}`}
                    onClick={() => {
                      setStatusFilter(status);
                      setCurrentPage(1);
                      setShowDropdown(false);
                    }}
                  >
                    {status.replace(/_/g, ' ')}
                  </button>
                ))}
            </div>
          )}
        </div>
      </div>

      {/* Borrow Requests Section */}
      <h3 className="appointment-subtitle">Borrow Requests</h3>
      <ul className="appointment-list">
        {borrowRequests.map((app) => (
          <li key={app.appointment_id} className={`appointment-item status-${app.status}`}>
            <div>
              <strong>{app.Book?.title || `Book #${app.book_id}`}</strong> — {app.type} on {formatDate(app.scheduled_date)}<br />
              Student: {app.Student?.full_name || `#${app.student_id}`} | 
              <span className={`status-badge ${app.status}`}>{app.status}</span>
            </div>
            <div className="appointment-actions">
              {app.status === 'pending' && (
                <>
                  <button onClick={() => handleAction(app.appointment_id, 'approved')}>Approve Borrow</button>
                  <button onClick={() => handleAction(app.appointment_id, 'denied')}>Deny</button>
                </>
              )}
              {app.status === 'approved' && (
                <button onClick={() => handleAction(app.appointment_id, 'ready_for_pickup')}>
                  Mark Ready for Pickup
                </button>
              )}
              {app.status === 'ready_for_pickup' && <span>Waiting for student pickup</span>}
            </div>
          </li>
        ))}
      </ul>

      {/* Return Requests Section */}
      <h3 className="appointment-subtitle">Return Requests</h3>
      <ul className="appointment-list">
        {returnRequests.map((app) => (
          <li key={app.appointment_id} className={`appointment-item status-${app.status}`}>
            <div>
              <strong>{app.Book?.title || `Book #${app.book_id}`}</strong> — Return scheduled {formatDate(app.scheduled_date)}<br />
              Student: {app.Student?.full_name || `#${app.student_id}`} | 
              <span className={`status-badge ${app.status}`}>{app.status}</span>
            </div>
            <div className="appointment-actions">
              {app.status === 'awaiting_return' && (
                <button onClick={() => handleAction(app.appointment_id, 'approved_return')}>
                  Approve Return
                </button>
              )}
              {app.status === 'approved_return' && (
                <button onClick={() => handleAction(app.appointment_id, 'returned')}>
                  Confirm Returned
                </button>
              )}
              {app.status === 'returned' && <span>Book Returned</span>}
            </div>
          </li>
        ))}
      </ul>

      {/* Pagination */}
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