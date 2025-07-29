import { useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import {
  Bars3Icon,
  XMarkIcon,
  UserIcon,
  ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/24/outline";

const EmployerLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(sessionStorage.getItem("user")) || {
    username: "Employer",
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <header className="bg-white shadow-md p-4 flex justify-between items-center md:hidden">
        <button onClick={() => setIsSidebarOpen(true)} className="text-green-700">
          <Bars3Icon className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-semibold">Job Portal</h1>
        <div className="w-6 h-6" />
      </header>

      <aside
        className={`fixed md:static z-40 top-0 left-0 h-screen w-64 bg-green-100 p-4 flex flex-col transform transition-transform 
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="flex justify-between items-center md:hidden mb-4">
          <h2 className="text-xl font-bold">Employer</h2>
          <button onClick={() => setIsSidebarOpen(false)}>
            <XMarkIcon className="h-6 w-6 text-green-700" />
          </button>
        </div>

        <div className="flex-1 flex flex-col gap-4">
          <h2 className="text-xl font-bold hidden md:block">Employer</h2>
          <nav className="space-y-2">
            <Link to="/employer/applications" className="block text-gray-800 hover:text-green-600 font-medium">
              Applications
            </Link>
            <Link to="/employer/post-job" className="block text-gray-800 hover:text-green-600 font-medium">
              Post a Job
            </Link>
          </nav>
        </div>

        <div className="mt-4 pt-4 border-t flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <UserIcon className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-gray-800">
              {user.username}
            </span>
          </div>
          <button
            onClick={handleLogout}
            title="Logout"
            className="flex items-center gap-2 text-red-600 hover:text-red-800 hover:bg-red-100 px-2 py-1 rounded transition"
          >
            <ArrowRightStartOnRectangleIcon className="w-5 h-5" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 bg-gray-50 p-6">
        <div className="hidden md:flex items-center justify-between bg-white p-4 shadow-md mb-4">
          <h1 className="text-xl font-semibold">Job Portal</h1>
        </div>
        <Outlet />
      </main>
    </div>
  );
};

export default EmployerLayout;
