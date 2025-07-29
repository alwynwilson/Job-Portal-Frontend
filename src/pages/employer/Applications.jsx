// src/pages/applications/Applications.jsx
import React from 'react';
import JobList from '../../components/jobs/JobList';

const Applications = () => {
  return (
    <div className="min-h-[80%] bg-gray-50 text-gray-800 px-4 py-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Applications</h1>
        <JobList />
      </div>
    </div>
  );
};

export default Applications;
