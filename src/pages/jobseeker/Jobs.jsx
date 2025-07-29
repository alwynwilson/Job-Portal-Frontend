import React, { useEffect, useState } from 'react';
import { getAllJobsAPI, applyJobAPI, saveJobAPI } from '../../services/allAPI';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingJobId, setSavingJobId] = useState(null);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [resume, setResume] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const userId = JSON.parse(sessionStorage.getItem('userId'));
  const token = sessionStorage.getItem('token');
  const reqHeader = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  const fetchJobs = async () => {
    try {
      const response = await getAllJobsAPI();
      if (response?.status === 200) {
        setJobs(response.data);
      } else {
        console.error('Failed to fetch jobs:', response?.message);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (jobId) => {
    setSavingJobId(jobId);
    try {
      const res = await saveJobAPI(jobId, reqHeader);
      if (res.status === 200 || res.status === 201) {
        alert('Job saved successfully!');
      } else {
        alert('You may have already saved this job.');
      }
    } catch (error) {
      console.error('Save failed:', error);
      alert('Failed to save job. Try again.');
    } finally {
      setSavingJobId(null);
    }
  };

  const openApplyModal = (jobId) => {
    setSelectedJobId(jobId);
    setShowModal(true);
  };

  const closeApplyModal = () => {
    setShowModal(false);
    setResume('');
    setCoverLetter('');
    setSelectedJobId(null);
  };

  const handleApplySubmit = async () => {
    if (!resume || !coverLetter) {
      alert('Please fill out both resume and cover letter.');
      return;
    }

    setSubmitting(true);
    try {
  const res = await applyJobAPI(selectedJobId, { resume, coverLetter }, reqHeader);

  if (res.status === 201) {
    alert('Successfully applied to the job!');
    closeApplyModal();    
  }
} catch (error) {
  if (error?.response?.status === 409) {
    alert('You have already applied for this job.');
  } else {
    alert('Something went wrong. Please try again.');
  }
}
 finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading jobs...</p>;

  return (
    <>
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <div
              key={job._id}
              className="border rounded-xl shadow-md p-4 hover:shadow-lg transition duration-300"
            >
              <h2 className="text-lg font-semibold text-gray-800">{job.title}</h2>
              <p className="text-sm text-gray-500">{job.company}</p>
              <p className="text-sm text-gray-600 mt-2">{job.location}</p>
              <p className="text-sm text-gray-600 mt-1">₹ {job.salary}</p>
              <p className="text-sm mt-2 text-gray-700">
                {job.description?.substring(0, 100)}...
              </p>

              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => openApplyModal(job._id)}
                  className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                >
                  Apply
                </button>

                <button
                  onClick={() => handleSave(job._id)}
                  disabled={savingJobId === job._id}
                  className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 disabled:opacity-50"
                >
                  {savingJobId === job._id ? 'Saving...' : 'Save'}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full">No jobs found.</p>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Apply for Job</h2>

            <label className="block text-sm font-medium text-gray-700 mb-1">
              Resume
            </label>
            <textarea
              className="w-full border rounded p-2 mb-4"
              rows="4"
              placeholder="Paste your resume text here"
              value={resume}
              onChange={(e) => setResume(e.target.value)}
            />

            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cover Letter
            </label>
            <textarea
              className="w-full border rounded p-2 mb-4"
              rows="4"
              placeholder="Write your cover letter"
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={closeApplyModal}
                className="px-4 py-1 border rounded text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleApplySubmit}
                disabled={submitting}
                className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
              >
                {submitting ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Jobs;
