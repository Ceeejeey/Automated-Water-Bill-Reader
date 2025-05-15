import React, { useState } from "react";
import UploadImage from "../components/UploadImage";
import CurrentUsage from "../components/CurrentUsage";
import { Home, Upload, BarChart2, LogOut } from "lucide-react";

const WaterDashboard = () => {
    const [activeComponent, setActiveComponent] = useState("home");

    const renderComponent = () => {
        switch (activeComponent) {
            case "upload":
                return <UploadImage />;
            case "usage":
                return <CurrentUsage />;
            default:
                return (
                    <div className="text-gray-600 text-lg">
                        Select a section from the sidebar to get started. 💡
                    </div>
                );
        }
    };
const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("reading");
    setActiveComponent("home");
    window.location.href = "/"; // Navigate to index page
};



    return (
        <div className="min-h-screen flex bg-background">
            {/* Sidebar */}
            <aside className="w-64 bg-gradient-to-b from-blue-600 to-blue-400 text-gray-200 flex flex-col p-6 space-y-6 fixed h-screen shadow-lg">
                <h1 className="text-2xl font-bold mb-8 tracking-wide">Electricity Meter Reader </h1>
                <nav className="flex flex-col space-y-4">
                    <button
                        onClick={() => setActiveComponent("home")}
                        className={`flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${activeComponent === "home" ? "bg-blue-500 text-white" : "hover:bg-blue-500 hover:text-white"}`}
                    >
                        <Home />
                        <span className="text-lg">Dashboard Home</span>
                    </button>
                    <button
                        onClick={() => setActiveComponent("upload")}
                        className={`flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${activeComponent === "upload" ? "bg-blue-500 text-white" : "hover:bg-blue-500 hover:text-white"}`}
                    >
                        <Upload />
                        <span className="text-lg">Upload & Detect</span>
                    </button>
                    <button
                        onClick={() => setActiveComponent("usage")}
                        className={`flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${activeComponent === "usage" ? "bg-blue-500 text-white" : "hover:bg-blue-500 hover:text-white"}`}
                    >
                        <BarChart2 />
                        <span className="text-lg">Current Usage</span>
                    </button>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 p-3 rounded-lg text-left transition-colors hover:bg-red-500 hover:text-white"
                    >
                        <LogOut />
                        <span className="text-lg">Logout</span>
                    </button>

                </nav>
            </aside>

            {/* Main Content */}
            <main className="ml-64 flex-1 p-8 overflow-hidden">
                <div className="bg-white p-8 rounded-2xl shadow-lg mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">
                        Welcome, {localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).full_name : "User"}! 🚀
                    </h2>
                    <p className="text-gray-600 mt-2">Monitor and manage your water usage effortlessly.</p>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-lg h-[calc(100vh-180px)] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-100">
                    {renderComponent()}
                </div>
            </main>
        </div>
    );
};

export default WaterDashboard;
