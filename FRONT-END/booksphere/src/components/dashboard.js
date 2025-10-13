import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/dashboard.css';

function Dashboard() {
  const [allRecords, setAllRecords] = useState([]);
  const [records, setRecords] = useState([]);
  const [range, setRange] = useState('overall');
  const [status, setStatus] = useState('');
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 15;

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

  const borrowedCount = allRecords.filter(r => r.status === 'borrowed').length;
  const returnedCount = allRecords.filter(r => r.status === 'returned').length;
  const overdueCount = allRecords.filter(r => r.status === 'overdue').length;

  return (
    <div className="dashboard-page">
      <h1>Library Dashboard</h1>

      <div className="controls">
        <select value={range} onChange={(e) => setRange(e.target.value)}>
          <option value="overall">Overall</option>
          <option value="day">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="year">This Year</option>
        </select>
      </div>

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
                <td>{r.status}</td>
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