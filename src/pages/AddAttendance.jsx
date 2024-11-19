import React, { useState, useRef, useEffect } from 'react';
import Webcam from 'react-webcam';
import { FaCamera, FaMoon, FaSun, FaClock, FaStop } from 'react-icons/fa';

const AttendanceSystem = () => {
    const webcamRef = useRef(null);
    const intervalRef = useRef(null); // Ref to manage the timer
    const [attendanceRecord, setAttendanceRecord] = useState(null);
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
    const [darkMode, setDarkMode] = useState(false);
    const [isTimerRunning, setIsTimerRunning] = useState(true); // Timer running state
    const actualArrivalTime = new Date();
    actualArrivalTime.setHours(9, 30, 0); // Set actual arrival time to 9:30 AM

    // Update local time every second
    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString());
        }, 1000);
        return () => clearInterval(intervalRef.current);
    }, []);

    // Stop the timer
    const stopTimer = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            setIsTimerRunning(false);
        }
    };

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
            className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900 h-40'} ${
                isCameraOpen || !attendanceRecord ? 'overflow-hidden' : 'overflow-auto'
            }`}
        >
            {/* Top Bar */}
            <div className="flex justify-between items-center p-4">
                {/* Current Time and Stop Button */}
                <div className="flex items-center space-x-2">
                    <FaClock size={24} />
                    <span className="text-lg">{currentTime}</span>
                    {isTimerRunning && (

                        <button
                            className="bg-red-500 text-white px-3 py-1 rounded flex items-center space-x-1"
                            onClick={stopTimer}
                        >
                            <FaStop />
                            <span>Stop</span>
                        </button>
                    )}
                </div>

                {/* Dark Mode Toggle */}
                <button
                    className="flex items-center space-x-2 bg-gray-700 text-white py-2 px-4 rounded"
                    onClick={toggleDarkMode}
                >
                    {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
                    <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
                </button>
            </div>

            {/* Main Section */}
            <div className="flex flex-col items-center justify-center min-h-screen">
                {/* Add Selfie Button */}
                {!isCameraOpen && !attendanceRecord && (
                    <button
                        onClick={openCamera}
                        className="flex items-center justify-center bg-blue-500 hover:bg-green-500 text-white font-semibold py-4 px-8 rounded-lg shadow-lg space-x-2"
                    >
                        <FaCamera size={28} />
                        <span className="text-lg">Add Selfie</span>
                    </button>
                )}

                {/* Camera View */}
                {isCameraOpen && (
                    <div className="flex flex-col items-center">
                        <Webcam
                            audio={false}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            className="border border-gray-300 rounded-lg mb-4 w-full max-w-md"
                        />
                        <div className="flex space-x-4">
                            <button
                                onClick={captureImage}
                                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
                            >
                                Take Shot
                            </button>
                            <button
                                onClick={() => setIsCameraOpen(false)}
                                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}

                {/* Display Selfie */}
                {attendanceRecord && (
                    <div className="-mt-2 flex flex-col items-center bg-gray-100 p-4 rounded-lg shadow-md w-screen max-w-md">
                        <img src={attendanceRecord.image} alt="Selfie" className="w-30 h-30 mb-2" />
                        <h3 className="text-lg font-semibold text-gray-700">
                            Arrival Time: {new Date(attendanceRecord.timestamp).toLocaleString()}
                        </h3>
                        <div className="flex space-x-4 mt-2">
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
                                    attendanceRecord.verified ? 'bg-gray-500' : 'bg-green-500 hover:bg-green-600'
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
