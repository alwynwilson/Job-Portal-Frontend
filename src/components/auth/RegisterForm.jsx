import React, { useState } from "react";
import { registerAPI } from "../../services/allAPI.js";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "job_seeker",
    profile: {
      fullName: "",
      skills: "",
      experience: "",
      education: "",
      location: "",
      phone: "",
      linkedin: "",
    },
    company: {
      name: "",
      description: "",
      location: "",
      website: "",
    },
  });
  console.log(formData);
  

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, checked, dataset } = e.target;
    setError("");

    if (name === "isEmployer") {
      setFormData((prev) => ({
        ...prev,
        role: checked ? "employer" : "job_seeker",
      }));
    } else if (dataset.parent === "profile") {
      setFormData((prev) => ({
        ...prev,
        profile: { ...prev.profile, [name]: value },
      }));
    } else if (dataset.parent === "company") {
      setFormData((prev) => ({
        ...prev,
        company: { ...prev.company, [name]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password, role } = formData;


    if (username && email && password && role) {
      try {
        const result = await registerAPI(formData);
        if (result.status === 201 || result.status === 200) {
          sessionStorage.setItem("role", role);
          navigate("/login");
        } else if (result.status === 409) {
          setError("User already exists");
        } else {
          setError(result.data?.error || "Registration failed");
        }
      } catch (err) {
        setError(err.response?.data?.error || "Server error");
      }
    } else {
      setError("Please fill all required fields");
    }
  };

  const isEmployer = formData.role === "employer";

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {error && <div className="text-red-600 text-sm text-center">{error}</div>}

      <div>
        <label className="block text-sm font-medium">Full Name</label>
        <input
          name="username"
          type="text"
          value={formData.username}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Password</label>
        <input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
      </div>

      <div className="flex items-center space-x-2">
        <input
          name="isEmployer"
          type="checkbox"
          checked={isEmployer}
          onChange={handleChange}
          className="h-4 w-4"
        />
        <label className="text-sm">I am an employer</label>
      </div>

      {!isEmployer && (
        <div className="space-y-2">
          <h3 className="text-sm font-semibold">Job Seeker Profile</h3>
          <input
            name="fullName"
            data-parent="profile"
            type="text"
            placeholder="Full Name"
            value={formData.profile.fullName}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            name="skills"
            data-parent="profile"
            type="text"
            placeholder="Skills (comma separated)"
            value={formData.profile.skills}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            name="experience"
            data-parent="profile"
            type="number"
            placeholder="Experience (years)"
            value={formData.profile.experience}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            name="education"
            data-parent="profile"
            type="text"
            placeholder="Education"
            value={formData.profile.education}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            name="location"
            data-parent="profile"
            type="text"
            placeholder="Location"
            value={formData.profile.location}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            name="phone"
            data-parent="profile"
            type="text"
            placeholder="Phone"
            value={formData.profile.phone}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            name="linkedin"
            data-parent="profile"
            type="text"
            placeholder="LinkedIn"
            value={formData.profile.linkedin}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
      )}

      {isEmployer && (
        <div className="space-y-2">
          <h3 className="text-sm font-semibold">Company Info</h3>
          <input
            name="name"
            data-parent="company"
            type="text"
            placeholder="Company Name"
            value={formData.company.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            name="description"
            data-parent="company"
            type="text"
            placeholder="Company Description"
            value={formData.company.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            name="location"
            data-parent="company"
            type="text"
            placeholder="Company Location"
            value={formData.company.location}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            name="website"
            data-parent="company"
            type="text"
            placeholder="Company Website"
            value={formData.company.website}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition"
      >
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
