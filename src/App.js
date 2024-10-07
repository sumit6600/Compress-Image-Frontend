// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Upload from './components/Upload';
import Status from './components/Status';
import Result from './components/Result'; // Optional
import DownloadSheet from './components/DownloadSheet';
import RequestList from './components/RequestList';

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/download">Download CSV</Link></li>
            <li><Link to="/">Upload CSV</Link></li>
            <li><Link to="/status">Check Status</Link></li>
            <li><Link to="/list">Request List</Link></li> {/* Optional */}
            <li><Link to="/result">Download Result</Link></li> {/* Optional */}
          </ul>
        </nav>

        <Routes>
          <Route path="/download" element={<DownloadSheet />} />
          <Route path="/" element={<Upload />} />
          <Route path="/status" element={<Status />} />
          <Route path="/list" element={<RequestList />} /> {/* Optional */}
          <Route path="/result" element={<Result />} /> {/* Optional */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
