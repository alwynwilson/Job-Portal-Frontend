import SERVERURL from './serverurl'
import commonAPI from './commonAPI'

export const registerAPI = async (reqBody)=>{
    return await commonAPI("POST",`${SERVERURL}/auth/register`,reqBody)
}

export const loginAPI = async (reqBody)=>{
    return await commonAPI("POST",`${SERVERURL}/auth/login`,reqBody)
}

// Get all jobs
export const getAllJobsAPI = async () => {
  return await commonAPI("GET", `${SERVERURL}/jobs`);
};

// Get job by ID
export const getJobByIdAPI = async (jobId) => {
  return await commonAPI("GET", `${SERVERURL}/jobs/${jobId}`);
};

// Create new job (Employer only)
export const createJobAPI = async (reqBody, reqHeader) => {
  return await commonAPI("POST", `${SERVERURL}/jobs`, reqBody, reqHeader);
};

// Update job (Employer only)
export const updateJobAPI = async (jobId, reqBody, reqHeader) => {
  return await commonAPI("PUT", `${SERVERURL}/jobs/${jobId}`, reqBody, reqHeader);
};

// Delete job (Employer only)
export const deleteJobAPI = async (jobId, reqHeader) => {
  return await commonAPI("DELETE", `${SERVERURL}/jobs/${jobId}`, null, reqHeader);
};

// Save job (Job seeker only)
export const saveJobAPI = async (jobId, reqHeader) => {
  return await commonAPI("POST", `${SERVERURL}/jobs/${jobId}/save`, {}, reqHeader);
};

// Apply for job (Job seeker only)
export const applyJobAPI = async (jobId, reqBody, reqHeader) => {
  return await commonAPI("POST", `${SERVERURL}/jobs/${jobId}/apply`, reqBody, reqHeader);
};

// Get all applications for logged-in user
export const getApplicationsAPI = async (reqheader) => {
  return await commonAPI("GET", `${SERVERURL}/applications`, null, reqheader);
};