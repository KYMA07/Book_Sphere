import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/dashboard.css';

function Dashboard() {
  const [allRecords, setAllRecords] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [records, setRecords] = useState([]);
  const [range, setRange] = useState('overall');
  const [status, setStatus] = useState('');
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 15;

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        let url = 'http://localhost:5000/borrow';
        let params = {};
        if (range !== 'overall' || status !== '') {
          url = 'http://localhost:5000/borrow/filtered';
          params = { range, status };
        }
        const res = await axios.get(url, { params });
        setRecords(res.data);
        const fullRes = await axios.get('http://localhost:5000/borrow');
        setAllRecords(fullRes.data);
        const appointRes = await axios.get('http://localhost:5000/appointments');
        const data = appointRes.data;
        setAppointments(Array.isArray(data.appointments) ? data.appointments : Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching records:", err);
      }
    };
    fetchRecords();
  }, [range, status]);

  useEffect(() => {
    setCurrentPage(1);
  }, [range, status]);

  const borrowedCount = allRecords.filter(r => r.status === 'borrowed').length;
  const returnedCount = allRecords.filter(r => r.status === 'returned').length;
  const overdueCount = allRecords.filter(r => r.status === 'overdue').length;
  const appointmentBorrowed = allRecords.filter(r => r.source === 'appointment').length;
  const manualBorrowed = allRecords.filter(r => r.source === 'manual').length;
  const activeStudents = new Set(allRecords.map(r => r.student_id)).size;
  const pendingAppointments = (Array.isArray(appointments) ? appointments : []).filter(a => a.status === 'pending').length;

  const handleExport = () => {
    const csv = [
      ['Record ID', 'Student', 'Book', 'Librarian', 'Borrow Date', 'Due Date', 'Status'],
      ...records.map(r => [
        r.record_id,
        `${r.Student?.full_name} (${r.Student?.student_number})`,
        r.Book?.title,
        r.User?.username,
        r.borrow_date ? new Date(r.borrow_date).toLocaleDateString() : '-',
        r.due_date ? new Date(r.due_date).toLocaleDateString() : '-',
        r.status
      ])
    ].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'borrow_records.csv';
    link.click();
  };

  return (
    <div className="library-dashboard">
    <h1>Booksphere Library</h1>

    {/* Time Range & Status Filters */}
    <div className="dashboard-filters">
      <select value={range} onChange={(e) => setRange(e.target.value)}>
        <option value="overall">Overall</option>
        <option value="day">Today</option>
        <option value="week">This Week</option>
        <option value="month">This Month</option>
        <option value="year">This Year</option>
      </select>

      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="">All Status</option>
        <option value="borrowed">Borrowed</option>
        <option value="returned">Returned</option>
        <option value="overdue">Overdue</option>
      </select>

      <button onClick={handleExport}> Export CSV</button>
    </div>

    {/* Summary Cards */}
    <div className="dashboard-summary">
      <div className="card"> Borrowed via Appointments: {appointmentBorrowed}</div>
      <div className="card"> Borrowed Manually: {manualBorrowed}</div>
      <div className="card"> Active Students: {activeStudents}</div>
      <div className="card"> Pending Appointments: {pendingAppointments}</div>
    </div>

    {/* Status Buttons */}
    <div className="status-buttons">
      <button onClick={() => setStatus(status === 'borrowed' ? '' : 'borrowed')}>
        Borrowed: {borrowedCount}
      </button>
      <button onClick={() => setStatus(status === 'returned' ? '' : 'returned')}>
        Returned: {returnedCount}
      </button>
      <button onClick={() => setStatus(status === 'overdue' ? '' : 'overdue')}>
        Overdue: {overdueCount}
      </button>
    </div>

    

      <table className="books-table"> {/* Use books-table for consistent style */}
        <thead>
          <tr>
            <th>Record ID</th>
            <th>Student</th>
            <th>Book</th>
            <th>Librarian</th>
            <th>Borrow Date</th>
            <th>Due Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {records
            .slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage)
            .map((r) => (
              <tr key={r.record_id} onClick={() => setSelectedRecord(r)}>
                <td>{r.record_id}</td>
                <td>{r.Student?.full_name} ({r.Student?.student_number})</td>
                <td>{r.Book?.title}</td>
                <td>{r.User?.username}</td>
                <td>{r.borrow_date ? new Date(r.borrow_date).toLocaleDateString() : '-'}</td>
                <td>{r.due_date ? new Date(r.due_date).toLocaleDateString() : '-'}</td>
                <td data-status={r.status}>{r.status}</td>
              </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination"> {/* Use books.js pagination style */}
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          ◀ Prev
        </button>
        <span>Page {currentPage} of {Math.ceil(records.length / recordsPerPage)}</span>
        <button
          onClick={() =>
            setCurrentPage((prev) =>
              prev < Math.ceil(records.length / recordsPerPage) ? prev + 1 : prev
            )
          }
          disabled={currentPage >= Math.ceil(records.length / recordsPerPage)}
        >
          Next ▶
        </button>
      </div>

      {selectedRecord && (
        <div className="modal">
          <div className="modal-content">
            <h2>Record Details</h2>
            <p><strong>Student:</strong> {selectedRecord.Student?.full_name} ({selectedRecord.Student?.student_number})</p>
            <p><strong>Book:</strong> {selectedRecord.Book?.title}</p>
            <p><strong>Librarian:</strong> {selectedRecord.User?.username}</p>
            <p><strong>Borrow Date:</strong> {selectedRecord.borrow_date ? new Date(selectedRecord.borrow_date).toLocaleString() : '-'}</p>
            <p><strong>Due Date:</strong> {selectedRecord.due_date ? new Date(selectedRecord.due_date).toLocaleString() : '-'}</p>
            <p><strong>Status:</strong> {selectedRecord.status}</p>
            {selectedRecord.return_date && (
              <p><strong>Return Date:</strong> {new Date(selectedRecord.return_date).toLocaleString()}</p>
            )}
            <button onClick={() => setSelectedRecord(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;