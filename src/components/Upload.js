// src/components/Upload.js
import React, { useState } from 'react';
import axios from 'axios';

const Upload = () => {
  const [file, setFile] = useState(null);
  const [requestId, setRequestId] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setRequestId('');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a CSV file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/upload-file-compress`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setRequestId(response.data.requestId);
    } catch (err) {
      console.error(err);
      setError('Failed to upload CSV. Please try again.');
    }
  };

  return (
    <div>
      <h2>Upload CSV File</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".csv" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {requestId && (
        <div>
          <p>Your Request ID: <strong>{requestId}</strong></p>
          <p>Use this ID to check the status of your processing request.</p>
        </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Upload;
