import React, { useEffect, useState } from "react";
import { getApplicationsAPI } from "../../services/allAPI";

const JobList = () => {
  const [applications, setApplications] = useState([]);
  console.log(applications);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const reqHeader = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };

        const response = await getApplicationsAPI(reqHeader);
        setApplications(response.data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Job Applications</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Job Title</th>
              <th className="border p-2">Posted Date</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Skills</th>
              <th className="border p-2">Experience</th>
              <th className="border p-2">Education</th>
              <th className="border p-2">Location</th>
              <th className="border p-2">Phone</th>
              <th className="border p-2">LinkedIn</th>
              <th className="border p-2">Cover Letter</th>
              <th className="border p-2">Resume</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app._id}>
                <td className="border p-2">{app.job?.title || "N/A"}</td>
                <td className="border p-2">
                  {new Date(app.job?.createdAt).toLocaleDateString() || "N/A"}
                </td>
                <td className="border p-2">
                  {app.applicant?.profile?.fullName || "N/A"}
                </td>
                <td className="border p-2">{app.applicant?.email || "N/A"}</td>
                <td className="border p-2">
                  {(app.applicant?.profile?.skills || []).join(", ")}
                </td>
                <td className="border p-2">
                  {app.applicant?.profile?.experience || 0} yrs
                </td>
                <td className="border p-2">
                  {app.applicant?.profile?.education || "N/A"}
                </td>
                <td className="border p-2">
                  {app.applicant?.profile?.location || "N/A"}
                </td>
                <td className="border p-2">
                  {app.applicant?.profile?.phone || "N/A"}
                </td>
                <td className="border p-2">
                  <a
                    href={app.applicant?.profile?.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    LinkedIn
                  </a>
                </td>
                <td className="border p-2 whitespace-pre-wrap">
                  {app.coverLetter || "N/A"}
                </td>
                <td className="border p-2">
                  <a
                    href={app.resumeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 underline"
                  >
                    Resume
                  </a>
                </td>
              </tr>
            ))}
            {applications.length === 0 && (
              <tr>
                <td colSpan="12" className="text-center p-4">
                  No applications found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JobList;
