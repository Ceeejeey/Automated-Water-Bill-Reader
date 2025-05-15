import React, { useState, useEffect } from "react";

const CurrentUsage = () => {
  const [previousReading, setPreviousReading] = useState("");
  const [currentReading, setCurrentReading] = useState(() => {
    const readingValue = localStorage.getItem("reading");
    return readingValue ? parseFloat(readingValue) : "";
  });
  const [usage, setUsage] = useState(0);
  const [bill, setBill] = useState(null);

  useEffect(() => {
    const handleStorageChange = () => {
      const readingValue = localStorage.getItem("reading");
      const newReading = readingValue ? parseFloat(readingValue) : "";
      setCurrentReading(newReading);
    };

    window.addEventListener("storage", handleStorageChange);
    handleStorageChange();

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const calculateUsage = () => {
    const calculatedUsage = Number(currentReading) - Number(previousReading);
    const validUsage = calculatedUsage >= 0 ? calculatedUsage : 0;
    setUsage(validUsage);
    setBill(null); // Reset bill when usage changes
  };

  const calculateBill = () => {
    let totalBill = 0;

    if (usage <= 30) {
      totalBill = usage * 8 + 120;
    } else if (usage <= 60) {
      totalBill = (30 * 8) + ((usage - 30) * 10) + 240;
    } else if (usage <= 90) {
      totalBill = (60 * 16) + ((usage - 60) * 16) + 360;
    } else if (usage <= 180) {
      totalBill = (60 * 16) + (30 * 16) + ((usage - 90) * 50) + 960;
    } else {
      totalBill = (60 * 16) + (30 * 16) + (90 * 50) + ((usage - 180) * 75) + 1500;
    }

    setBill(totalBill);
  };

  return (
    <div className="min-w-h-screen bg-gradient-to-tr from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-8">
      <div className="w-full max-w-[90vw] bg-white rounded-2xl shadow-lg p-10 flex flex-col space-y-6">
        <h2 className="text-2xl font-semibold text-indigo-700">Current Usage</h2>

        <input
          type="number"
          placeholder="Enter Previous Reading"
          className="text-base border border-indigo-300 rounded-lg p-3 w-full
                     focus:outline-none focus:ring-2 focus:ring-indigo-400
                     placeholder-indigo-400 transition"
          value={previousReading}
          onChange={(e) => setPreviousReading(e.target.value)}
        />

        <button
          onClick={calculateUsage}
          className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-2 rounded-lg hover:from-indigo-600 hover:to-blue-600 transition-colors"
        >
          Calculate Usage
        </button>

        <div className="bg-indigo-50 rounded-lg p-6 shadow-inner space-y-4">
          <div className="flex justify-between mb-2">
            <span className="text-base font-medium text-gray-700">Previous Reading:</span>
            <span className="text-base font-semibold text-indigo-900">
              {previousReading || "-"}
            </span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-base font-medium text-gray-700">Current Reading:</span>
            <span className="text-base font-semibold text-indigo-900">
              {currentReading || "-"}
            </span>
          </div>
          <hr className="border-indigo-300 my-4" />
          <div className="flex justify-between text-indigo-700 font-bold text-xl">
            <span>Usage:</span>
            <span>{usage} units</span>
          </div>
        </div>

        <button
          onClick={calculateBill}
          className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-6 py-2 rounded-lg hover:from-green-600 hover:to-teal-600 transition-colors"
        >
          Check My Current Month Charge
        </button>

        {bill !== null && (
          <div className="bg-green-50 rounded-lg p-6 shadow-inner space-y-4 mt-4">
            <h3 className="text-lg font-semibold text-green-700">Current Month Bill</h3>
            <div className="flex justify-between text-green-900 font-bold text-xl">
              <span>Total Charge:</span>
              <span>Rs. {bill.toFixed(2)}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrentUsage;
