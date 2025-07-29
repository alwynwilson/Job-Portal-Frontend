import React, { useState, useEffect } from "react";
import { createJobAPI, getAllJobsAPI, updateJobAPI, deleteJobAPI } from "../../services/allAPI";

const PostJob = () => {
  const [jobs, setJobs] = useState([]);
  console.log(jobs);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    company: "",
    location: "",
    salary: "",
    requirements: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [editingJob, setEditingJob] = useState(null);

  const fetchJobs = async () => {
    const token = sessionStorage.getItem("token");
    const employerId = JSON.parse(sessionStorage.getItem("user"));
    const reqHeader = { Authorization: `Bearer ${token}`,
  user:employerId };

    try {
      const res = await getAllJobsAPI(reqHeader);
      console.log(res);
      
      if (res.status === 200) {
        setJobs(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const openModal = (job = null) => {
    setShowModal(true);
    if (job) {
      setEditingJob(job._id);
      setFormData({
        title: job.title,
        description: job.description,
        company: job.company,
        location: job.location,
        salary: job.salary,
        requirements: job.requirements.join(", "),
      });
    } else {
      setEditingJob(null);
      setFormData({
        title: "",
        description: "",
        company: "",
        location: "",
        salary: "",
        requirements: "",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = sessionStorage.getItem("token");
    const employerId = sessionStorage.getItem("user");
    const reqHeader = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const payload = {
      ...formData,
      employer: employerId,
      requirements: formData.requirements.split(",").map((r) => r.trim()),
      salary: formData.salary ? parseInt(formData.salary) : undefined,
    };

    try {
      let res;
      if (editingJob) {
        res = await updateJobAPI(editingJob, payload, reqHeader);
      } else {
        res = await createJobAPI(payload, reqHeader);
      }

      if (res.status === 200 || res.status === 201) {
        alert(editingJob ? "Job updated successfully!" : "Job posted successfully!");
        setShowModal(false);
        fetchJobs();
      } else {
        alert("Operation failed");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  const handleDelete = async (jobId) => {
    const token = sessionStorage.getItem("token");
    const reqHeader = { Authorization: `Bearer ${token}` };

    if (window.confirm("Are you sure you want to delete this job?")) {
      try {
        const res = await deleteJobAPI(jobId, reqHeader);
        if (res.status === 200) {
          alert("Job deleted successfully");
          fetchJobs();
        } else {
          alert("Failed to delete job");
        }
      } catch (err) {
        console.error(err);
        alert("Error deleting job");
      }
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Job Posts</h2>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => openModal()}
        >
          + Post New Job
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {jobs.map((job) => (
          <div key={job._id} className="border rounded p-4 shadow">
            <h3 className="text-xl font-semibold">{job?.title}</h3>
            <p className="text-gray-600">{job?.description}</p>
            <p className="mt-2 text-sm text-gray-500">
              {job?.company} • {job?.location}
            </p>
            <p className="text-sm text-gray-600">Salary: ₹{job?.salary}</p>
            <p className="text-sm text-gray-600">Requirements: {job.requirements?.join(", ")}</p>

            <div className="flex gap-2 mt-4 justify-end">
              <button
                onClick={() => openModal(job)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(job._id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
            <h3 className="text-xl font-semibold mb-4">{editingJob ? "Edit Job" : "Post New Job"}</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                placeholder="Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full border px-3 py-2 rounded"
                required
              />
              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full border px-3 py-2 rounded"
                required
              ></textarea>
              <input
                type="text"
                placeholder="Company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full border px-3 py-2 rounded"
                required
              />
              <input
                type="text"
                placeholder="Location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full border px-3 py-2 rounded"
                required
              />
              <input
                type="number"
                placeholder="Salary"
                value={formData.salary}
                onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="text"
                placeholder="Requirements (comma separated)"
                value={formData.requirements}
                onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                className="w-full border px-3 py-2 rounded"
              />
              <div className="flex justify-between mt-4">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  {editingJob ? "Update" : "Post"}
                </button>
                <button
                  type="button"
                  className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostJob;
