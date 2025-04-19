import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios'

const Login = () => {
  const [form, setForm] = useState({
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
      const response = await axios.post("http://localhost:8000/login", {
        email: form.email,
        password: form.password,
      });
  
      const { access_token, user } = response.data;
  
      // 💾 Store token in localStorage for future authenticated requests
      localStorage.setItem("token", access_token);
      localStorage.setItem("user", JSON.stringify(user));
  
      console.log("✅ Login successful:", user);
  
      // 🎯 Redirect to dashboard or home
      navigate("/dashboard");
  
    } catch (error) {
      console.error("❌ Login failed:", error.response?.data || error.message);
      alert(error.response?.data?.detail || "Invalid email or password!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4 font-poppins">
      <div className="w-full max-w-md bg-white/70 backdrop-blur-md rounded-3xl shadow-xl p-10 border border-gray-200">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-600 mb-6">
          Login 
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
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
            Login
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-600">
          Don’t have an account?{' '}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
