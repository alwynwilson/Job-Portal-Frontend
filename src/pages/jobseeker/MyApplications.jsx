import React, { useEffect, useState } from 'react';
import { getApplicationsAPI } from '../../services/allAPI';

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = sessionStorage.getItem("token");

        const reqHeader = {
          "Authorization": `Bearer ${token}`
        };

        const res = await getApplicationsAPI(reqHeader);
        setApplications(res.data || []);
      } catch (err) {
        console.error('Error fetching applications:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);
  return (
    <div className="h-[80vh] flex flex-col p-4 bg-gray-50">
      <h1 className="text-3xl font-bold text-black mb-4 text-start">
        My Applications
      </h1>

      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : applications.length === 0 ? (
        <p className="text-center text-gray-600">
          You haven't applied to any jobs yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto flex-1 pr-2">
          {applications.map((app) => (
            <div
              key={app._id}
              className="bg-white shadow-md p-4 rounded-md border border-gray-200"
            >
              <h2 className="text-xl font-semibold text-gray-800">{app.job?.title}</h2>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Company:</strong> {app.job?.company}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Location:</strong> {app.job?.location}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Salary:</strong> ₹{app.job?.salary || 'Not specified'}
              </p>
              <p className="text-sm text-green-600 font-medium mt-2">
                ✅ Status: {app.status}
              </p>
              <p className="text-xs text-gray-400">
                Applied on: {new Date(app.appliedAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyApplications;
