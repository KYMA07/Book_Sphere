import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/styles.css';

function Dashboard() {
  const [records, setRecords] = useState([]);
  const [range, setRange] = useState('overall');
  const [status, setStatus] = useState('');
  const [selectedRecord, setSelectedRecord] = useState(null);

  // ✅ Fetch all records initially, then use filters if applied
  const fetchRecords = async () => {
    try {
      let url = 'http://localhost:5000/borrow';
      let params = {};

      // If filters are applied, use the filtered endpoint
      if (range !== 'overall' || status !== '') {
        url = 'http://localhost:5000/borrow/filtered';
        params = { range, status };
      }

      const res = await axios.get(url, { params });
      console.log("API response:", res.data);
      setRecords(res.data);
    } catch (err) {
      console.error("Error fetching records:", err);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, [range, status]);

  // Counts
  const borrowedCount = records.filter(r => !r.returned).length;
  const returnedCount = records.filter(r => r.returned).length;
  const overdueCount = records.filter(
    r => !r.returned && r.due_date && new Date(r.due_date) < new Date()
  ).length;

  return (
    <div className="dashboard-page">
      <h1>Library Dashboard</h1>

      {/* Date Range Selector */}
      <div className="controls">
        <select value={range} onChange={(e) => setRange(e.target.value)}>
          <option value="overall">Overall</option>
          <option value="day">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="year">This Year</option>
        </select>
      </div>

      {/* Summary Cards */}
      <div className="summary-cards">
        <button onClick={() => setStatus(status === 'borrowed' ? '' : 'borrowed')}>
          Books Borrowed: {borrowedCount}
        </button>
        <button onClick={() => setStatus(status === 'returned' ? '' : 'returned')}>
          Books Returned: {returnedCount}
        </button>
        <button onClick={() => setStatus(status === 'overdue' ? '' : 'overdue')}>
          Books Overdue: {overdueCount}
        </button>
      </div>

      {/* Records Table */}
      <table className="records-table">
        <thead>
          <tr>
            <th>Record ID</th>
            <th>Student</th>
            <th>Book</th>
            <th>Librarian</th>
            <th>Borrow Date</th>
            <th>Due Date</th>
            <th>Returned</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r) => (
            <tr key={r.record_id} onDoubleClick={() => setSelectedRecord(r)}>
              <td>{r.record_id}</td>
              <td>{r.Student?.full_name} ({r.Student?.student_number})</td>
              <td>{r.Book?.title}</td>
              <td>{r.User?.username}</td>
              <td>{r.borrow_date ? new Date(r.borrow_date).toLocaleDateString() : '-'}</td>
              <td>{r.due_date ? new Date(r.due_date).toLocaleDateString() : '-'}</td>
              <td>{r.returned ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Record Details */}
      {selectedRecord && (
        <div className="modal">
          <div className="modal-content">
            <h2>Borrow Record #{selectedRecord.record_id}</h2>
            <p><strong>Student:</strong> {selectedRecord.Student?.full_name} ({selectedRecord.Student?.student_number})</p>
            <p><strong>Book:</strong> {selectedRecord.Book?.title}</p>
            <p><strong>Librarian:</strong> {selectedRecord.User?.username}</p>
            <p><strong>Borrow Date:</strong> {selectedRecord.borrow_date ? new Date(selectedRecord.borrow_date).toLocaleString() : '-'}</p>
            <p><strong>Due Date:</strong> {selectedRecord.due_date ? new Date(selectedRecord.due_date).toLocaleString() : '-'}</p>
            <p><strong>Status:</strong> {selectedRecord.returned ? 'Returned' : 'Borrowed'}</p>
            <button onClick={() => setSelectedRecord(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;