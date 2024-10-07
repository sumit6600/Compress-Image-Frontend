import React from 'react';

const DownloadSheet = () => {
  const handleDownload = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/sample-downlaod-sheet`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/vnd.ms-excel', // or the correct mime type if different
        },
      });

      // Check if the response is okay
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Get the blob from the response
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'UPLOAD_FILES.xls'); // Set the desired file name

      // Append to the document and trigger the download
      document.body.appendChild(link);
      link.click();

      // Cleanup
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading the file:', error);
      // Optionally show an error message to the user
    }
  };

  return (
    <div>
      <h1>Download Sample Sheet</h1>
      <button onClick={handleDownload}>Download</button>
    </div>
  );
};

export default DownloadSheet;
