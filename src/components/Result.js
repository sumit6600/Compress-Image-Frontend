// src/components/DownloadExcel.js
import React, { useState } from 'react';
import axios from 'axios';

const DownloadExcel = () => {
  const [requestId, setRequestId] = useState('');
  const [error, setError] = useState('');
  
  const handleDownload = async () => {
    if (!requestId) {
      setError('Please enter a Request ID.');
      return;
    }

    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/auth/file-upload-output`, {
        params: { requestId },
        responseType: 'blob',  // Important to set responseType to blob for file downloads
      });

      // Create a URL for the file and trigger download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `output-${requestId}.xlsx`);  // Set the file name for download
      document.body.appendChild(link);
      link.click();
      link.remove();

      setError(''); // Clear error if successful
    } catch (err) {
      console.error('Error downloading file:', err);
      setError('Failed to download the file. Please ensure the Request ID is correct.');
    }
  };

  return (
    <div>
      <h2>Download Excel File</h2>
      <input
        type="text"
        placeholder="Enter Request ID"
        value={requestId}
        onChange={(e) => setRequestId(e.target.value)}
      />
      <button onClick={handleDownload}>Download Excel</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default DownloadExcel;
