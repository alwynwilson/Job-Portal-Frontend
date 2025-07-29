import React, { useEffect, useState } from 'react';
import { getAllJobsAPI } from '../../services/allAPI';

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = JSON.parse(sessionStorage.getItem('user'));
  console.log(userId);
  
  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        const res = await getAllJobsAPI();        
        const allJobs = res.data || [];
        console.log(allJobs);

        const userSavedJobs = allJobs.filter((job) =>
          Array.isArray(job.savedBy) && job.savedBy.includes(userId._id)
        );

        setSavedJobs(userSavedJobs);
      } catch (err) {
        console.error('Error fetching saved jobs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedJobs();
  }, []);

  return (
    <div className="h-[80vh] flex flex-col p-4 bg-gray-50">
      <h1 className="text-3xl font-bold text-black mb-4 text-start">
        Saved Jobs
      </h1>

      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : savedJobs.length === 0 ? (
        <p className="text-center text-gray-600">
          You haven't saved any jobs yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto flex-1 pr-2">
          {savedJobs.map((job) => (
            <div
              key={job._id}
              className="bg-white shadow-md p-4 rounded-md border border-gray-200"
            >
              <h2 className="text-xl font-semibold text-gray-800">{job.title}</h2>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Company:</strong> {job.company}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Location:</strong> {job.location}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Salary:</strong> ₹{job.salary || 'Not specified'}
              </p>
              <p className="text-sm text-gray-700 mt-2 mb-1">
                <strong>Description:</strong>
              </p>
              <p className="text-sm text-gray-700 line-clamp-4">
                {job.description}
              </p>
              <p className="text-sm text-blue-600 font-medium mt-2">
                📌 Status: Saved
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedJobs;
