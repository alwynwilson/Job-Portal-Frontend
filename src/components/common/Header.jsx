import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-full bg-white shadow-md px-4 py-3 flex flex-wrap justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-indigo-600">
        JobPortal
      </Link>

      <div className="flex gap-2 mt-2 sm:mt-0">
        <Link to="/login">
          <button className="px-4 py-2 text-sm font-medium text-indigo-600 border border-indigo-600 rounded hover:bg-indigo-600 hover:text-white transition">
            Login
          </button>
        </Link>
        <Link to="/register">
          <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded hover:bg-indigo-700 transition">
            Sign Up
          </button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
