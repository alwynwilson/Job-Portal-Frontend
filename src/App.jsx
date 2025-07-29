import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Applications from './pages/employer/Applications';
import PostJob from './pages/employer/PostJob';
import Jobs from './pages/jobseeker/Jobs';
import MyApplications from './pages/jobseeker/MyApplications';
import SavedJobs from './pages/jobseeker/SavedJobs';
import ProtectedRoute from './components/common/ProtectedRoute';
import JobSeekerLayout from './layouts/JobSeekerLayout';
import EmployerLayout from './layouts/EmployerLayout';

const userRole = sessionStorage.getItem('role');
console.log(userRole)


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/jobseeker"
          element={
            <ProtectedRoute role={userRole} allowedRole="job_seeker">
              <JobSeekerLayout />
            </ProtectedRoute>
          }
        >
          <Route path="jobs" element={<Jobs />} />
          <Route path="my-applications" element={<MyApplications />} />
          <Route path="saved-jobs" element={<SavedJobs />} />
        </Route>

        <Route
          path="/employer"
          element={
            <ProtectedRoute role={userRole} allowedRole="employer">
              <EmployerLayout />
            </ProtectedRoute>
          }
        >
          <Route path="applications" element={<Applications />} />
          <Route path="post-job" element={<PostJob />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
