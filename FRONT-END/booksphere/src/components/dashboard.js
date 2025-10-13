import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/styles.css';

function Dashboard() {
  const [allRecords, setAllRecords] = useState([]);
  const [records, setRecords] = useState([]);
  const [range, setRange] = useState('overall');
  const [status, setStatus] = useState('');
  const [selectedRecord, setSelectedRecord] = useState(null);

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

      // Always fetch full dataset for accurate counts
      if (url === 'http://localhost:5000/borrow') {
        setAllRecords(res.data);
      } else {
        const fullRes = await axios.get('http://localhost:5000/borrow');
        setAllRecords(fullRes.data);
      }
    } catch (err) {
      console.error("Error fetching records:", err);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, [range, status]);

  // Accurate counts from full dataset
  const borrowedCount = allRecords.filter(r => r.status === 'borrowed').length;
  const returnedCount = allRecords.filter(r => r.status === 'returned').length;
  const overdueCount = allRecords.filter(r => r.status === 'overdue').length;

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
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r) => (
            <React.Fragment key={r.record_id}>
              <tr onClick={() => setSelectedRecord(selectedRecord?.record_id === r.record_id ? null : r)}>
                <td>{r.record_id}</td>
                <td>{r.Student?.full_name} ({r.Student?.student_number})</td>
                <td>{r.Book?.title}</td>
                <td>{r.User?.username}</td>
                <td>{r.borrow_date ? new Date(r.borrow_date).toLocaleDateString() : '-'}</td>
                <td>{r.due_date ? new Date(r.due_date).toLocaleDateString() : '-'}</td>
                <td>{r.status}</td>
              </tr>

              {/* Inline expandable details */}
              {selectedRecord?.record_id === r.record_id && (
                <tr className="record-details-row">
                  <td colSpan="7">
                    <div className="record-details">
                      <p><strong>Student:</strong> {r.Student?.full_name} ({r.Student?.student_number})</p>
                      <p><strong>Book:</strong> {r.Book?.title}</p>
                      <p><strong>Librarian:</strong> {r.User?.username}</p>
                      <p><strong>Borrow Date:</strong> {r.borrow_date ? new Date(r.borrow_date).toLocaleString() : '-'}</p>
                      <p><strong>Due Date:</strong> {r.due_date ? new Date(r.due_date).toLocaleString() : '-'}</p>
                      <p><strong>Status:</strong> {r.status}</p>
                      {r.return_date && <p><strong>Return Date:</strong> {new Date(r.return_date).toLocaleString()}</p>}
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;