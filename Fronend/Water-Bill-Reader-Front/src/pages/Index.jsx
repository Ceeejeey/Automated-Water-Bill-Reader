import React from 'react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4 font-poppins">
      <div className="w-full max-w-2xl bg-white/70 backdrop-blur-md rounded-3xl shadow-xl p-10 text-center border border-gray-200">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Welcome to <span className="text-blue-600">Electricity Bill Reader </span>
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Automate your electricity meter reading using AI. Get accurate bills, instantly.
        </p>

        <div className="flex justify-center space-x-4">
          <Link to="/login">
            <button className="px-6 py-2 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all shadow-md">
              Login
            </button>
          </Link>
          <Link to="/register">
            <button className="px-6 py-2 rounded-xl border border-blue-600 text-blue-600 hover:bg-blue-50 transition-all shadow-sm">
              Register
            </button>
          </Link>
        </div>

        <footer className="mt-10 text-sm text-gray-400">
          © {new Date().getFullYear()} Electricity Bill Reader by Viduranga 💙
        </footer>
      </div>
    </div>
  );
};

export default Index;
