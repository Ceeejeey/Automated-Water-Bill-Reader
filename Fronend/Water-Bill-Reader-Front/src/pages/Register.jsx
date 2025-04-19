import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios'

const Register = () => {
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post("/api/register", {
        full_name: form.full_name,
        email: form.email,
        password: form.password,
      });
  
      console.log("✅ Registration successful:", response.data);
      // 💖 Redirect to login or dashboard
      navigate("/login");
    } catch (error) {
      console.error("❌ Registration failed:", error.response?.data || error.message);
      alert(error.response?.data?.detail || "Something went wrong. Try again!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4 font-poppins">
      <div className="w-full max-w-xl bg-white/70 backdrop-blur-md rounded-3xl shadow-xl p-10 border border-gray-200">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-600 mb-6">
          Create your account 
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-left text-gray-700 font-medium mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="full_name"
              value={form.full_name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-left text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-left text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-4 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all shadow-md"
          >
            Register
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
