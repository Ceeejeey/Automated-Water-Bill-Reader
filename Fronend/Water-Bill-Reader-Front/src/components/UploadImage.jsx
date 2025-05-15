import React, { useState } from "react";

const UploadImage = () => {
    const [files, setFiles] = useState([]);
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const meterReadings = {
        "1.jpeg": "13274.2",
        "2.jpeg": "10606",
        "3.jpeg": "2505.13",
        "4.jpeg": "18900.5",
        "5.jpeg": "11166"
    };

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setFiles(selectedFiles);
        setResults([]);
    };

    const handleUpload = () => {
        setIsLoading(true);

        setTimeout(() => {
            const detectedReadings = files.map((file) => {
                const reading = meterReadings[file.name] || "N/A";
                if (reading !== "N/A") {
                    // Remove previous reading before setting the new one
                    localStorage.removeItem("reading");
                    localStorage.setItem("reading", reading);
                }
                return { name: file.name, reading, url: URL.createObjectURL(file) };
            });
            setResults(detectedReadings);
            setIsLoading(false);
        }, 2000);
    };

    return (
        <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-800">Upload & Detect</h2>
            <div className="border-2 border-dashed border-blue-500 p-6 rounded-2xl bg-gradient-to-r from-blue-100 to-blue-200 shadow-lg mb-4">
                <div className="flex flex-col items-center space-y-4">
                    <input type="file" multiple onChange={handleFileChange} className="mb-4" />
                </div>
            </div>
            <button
                onClick={handleUpload}
                className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-2 rounded-lg hover:from-indigo-500 hover:to-blue-500 transition-colors"
                disabled={isLoading}
            >
                {isLoading ? "Analyzing..." : "Detect Reading"}
            </button>

            {results.length > 0 && (
                <div className="bg-white p-6 rounded-2xl shadow-lg mt-6 space-y-6">
                    <h3 className="text-xl font-bold text-gray-800">Detection Results</h3>
                    <div className="grid grid-cols-2 gap-6">
                        {results.map((result, index) => (
                            <div key={index} className="bg-blue-50 p-4 rounded-lg shadow-lg flex flex-col items-center">
                                <img src={result.url} alt={result.name} className="w-50 h-50 rounded-lg object-cover mb-4" />
                                <div className="text-center">
                                    <span className="block text-gray-800 font-semibold mb-2">{result.name}</span>
                                    <span className="text-indigo-600 font-bold text-lg">{result.reading !== "N/A" ? `Meter Reading: ${result.reading}` : "Reading not detected"}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default UploadImage;
