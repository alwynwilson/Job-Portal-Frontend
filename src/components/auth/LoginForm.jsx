import React, { useState } from "react";
import { loginAPI } from "../../services/allAPI";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "job_seeker", 
  });

  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    if (name === "isEmployer") {
      setFormData({ ...formData, role: checked ? "employer" : "job_seeker" });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, role } = formData;

    if (email && password) {
      try {
        const result = await loginAPI({ email, password, role });
        console.log(result);

        if (result.status === 200) {
          const user = result.data.user;

          sessionStorage.setItem("user", JSON.stringify(user));
          sessionStorage.setItem("token", result.data.token);
          sessionStorage.setItem("role", user.role);

          setFormData({ email: "", password: "", role: "job_seeker" });

          setTimeout(() => {
            if (user.role === "employer") {
              navigate("/employer/applications");
            } else {
              navigate("/jobseeker/jobs");
            }
          }, 1000);
        } else {
          setErrorMsg("Login failed. Please check your credentials.");
        }
      } catch (err) {
        console.error("Login Error:", err);
        setErrorMsg("Invalid Credentials, login failed");
      }
    } else {
      setErrorMsg("Please fill in all fields.");
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {errorMsg && <p className="text-red-600 text-sm">{errorMsg}</p>}

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Email address
        </label>
        <input
          type="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          name="password"
          required
          value={formData.password}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div className="flex items-center space-x-2">
        <input
          id="isEmployer"
          name="isEmployer"
          type="checkbox"
          checked={formData.role === "employer"}
          onChange={handleChange}
          className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
        />
        <label htmlFor="isEmployer" className="text-sm text-gray-700">
          I am an employer
        </label>
      </div>

      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition"
        >
          Login
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
