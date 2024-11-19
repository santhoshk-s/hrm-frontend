import React, { useState, useRef, useEffect } from 'react';
import Webcam from 'react-webcam';
import { FaCamera, FaMoon, FaSun } from 'react-icons/fa';

const AttendanceSystem = () => {
    const webcamRef = useRef(null);
    const [attendanceRecord, setAttendanceRecord] = useState(null);
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
    const [darkMode, setDarkMode] = useState(false);

    // Update local time every second
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    // Open camera view
    const openCamera = () => {
        setIsCameraOpen(true);
    };

    // Capture image
    const captureImage = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        if (imageSrc) {
            const newRecord = {
                id: Date.now(),
                image: imageSrc,
                timestamp: new Date().toISOString(),
                verified: false,
            };
            setAttendanceRecord(newRecord);
            setIsCameraOpen(false);
        }
    };

    // Toggle Dark Mode
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    // Remove the image
    const removeImage = () => {
        setAttendanceRecord(null);
    };

    // Retake an image
    const retakeImage = () => {
        setAttendanceRecord(null);
        setIsCameraOpen(true);
    };

    // Verify the image
    const verifyImage = () => {
        if (attendanceRecord) {
            setAttendanceRecord({ ...attendanceRecord, verified: true });
        }
    };

    return (
        <div
            className={`min-h-screen flex flex-col ${
                darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'
            }`}
        >
            {/* Top Bar */}
            <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg">
                <h1 className="text-xl font-bold">Attendance System</h1>
                <div className="flex items-center space-x-4">
                    <span className="text-lg">{currentTime}</span>
                    {/* Dark Mode Toggle */}
                    <button
                        className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded"
                        onClick={toggleDarkMode}
                    >
                        {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
                        <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
                    </button>
                </div>
            </div>

            {/* Main Section */}
            <div className="flex flex-col items-center justify-center flex-grow">
                {/* Add Selfie Button */}
                {!isCameraOpen && !attendanceRecord && (
                    <button
                        onClick={openCamera}
                        className="flex items-center justify-center bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-semibold py-4 px-8 rounded-lg shadow-lg transition-all transform hover:scale-105"
                    >
                        <FaCamera size={28} />
                        <span className="text-lg ml-2">Add Selfie</span>
                    </button>
                )}

                {/* Camera View */}
                {isCameraOpen && (
                    <div className="fixed inset-0 bg-gray-900 bg-opacity-90 z-50 flex items-center justify-center">
                        <Webcam
                            audio={false}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            className="w-full h-auto max-h-screen"
                        />
                        <div className="absolute bottom-8 flex space-x-4">
                            <button
                                onClick={captureImage}
                                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all"
                            >
                                Take Shot
                            </button>
                            <button
                                onClick={() => setIsCameraOpen(false)}
                                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}

                {/* Display Selfie */}
                {attendanceRecord && (
                    <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md max-w-md">
                        <img src={attendanceRecord.image} alt="Selfie" className="rounded-lg mb-4 w-full h-auto" />
                        <h3 className="text-lg font-semibold text-gray-700">
                            Arrival Time: {new Date(attendanceRecord.timestamp).toLocaleString()}
                        </h3>
                        <div className="flex space-x-4 mt-4">
                            <button
                                onClick={removeImage}
                                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
                            >
                                Remove
                            </button>
                            <button
                                onClick={retakeImage}
                                className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded"
                            >
                                Retake
                            </button>
                            <button
                                onClick={verifyImage}
                                className={`${
                                    attendanceRecord.verified
                                        ? 'bg-gray-500'
                                        : 'bg-green-500 hover:bg-green-600'
                                } text-white font-semibold py-2 px-4 rounded`}
                                disabled={attendanceRecord.verified}
                            >
                                {attendanceRecord.verified ? 'Verified' : 'Verify'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AttendanceSystem;
