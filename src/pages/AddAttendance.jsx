import React, { useState, useRef, useEffect } from 'react';
import Webcam from 'react-webcam';

const AttendanceSystem = () => {
    const webcamRef = useRef(null);
    const [attendanceRecord, setAttendanceRecord] = useState(null);
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
    const [darkMode, setDarkMode] = useState(false);
    const actualArrivalTime = new Date();
    actualArrivalTime.setHours(9, 30, 0); // Set actual arrival time to 9:30 AM

    // Update local time every second
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // Open camera view and clear previous record
    const openCamera = () => {
        setIsCameraOpen(true);
    };

    // Capture image and preview it
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
            setIsCameraOpen(false); // Close the camera after capturing
        }
    };

    // Calculate time difference between actual arrival time and recorded time
    const getTimeDifference = () => {
        if (!attendanceRecord) return null;
        const recordTime = new Date(attendanceRecord.timestamp);
        const diffMs = recordTime - actualArrivalTime;
        const diffMins = Math.floor(diffMs / 60000); // convert milliseconds to minutes
        const hours = Math.floor(Math.abs(diffMins) / 60);
        const minutes = Math.abs(diffMins) % 60;
        return `${diffMins >= 0 ? '+' : '-'} ${hours}h ${minutes}m`;
    };

    // Remove the image
    const removeImage = () => {
        setAttendanceRecord(null);
    };

    // Retake an image by clearing previous record and reopening the camera
    const retakeImage = () => {
        setAttendanceRecord(null); // Clear previous record to remove the old image
        setIsCameraOpen(true);     // Open camera for new shot
    };

    // Verify the image
    const verifyImage = () => {
        if (attendanceRecord) {
            setAttendanceRecord({ ...attendanceRecord, verified: true });
        }
    };

    // Toggle Dark Mode
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <div className={`p-8 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
            <h2 className="text-2xl font-bold text-center mb-6 font-serif">Selfie-Based Attendance System</h2>

            {/* Dark Mode toggle */}
            <button
                onClick={toggleDarkMode}
                className="bg-gray-700 text-white py-2 px-4 rounded mb-6 block mx-auto"
            >
                Toggle {darkMode ? 'Light' : 'Dark'} Mode
            </button>

            {/* Display current time */}
            <div className="text-center text-lg mb-4">Current Time: {currentTime}</div>

            {/* Button to open camera */}
            <button
                onClick={openCamera}
                className="bg-blue-500 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded mb-4 block mx-auto"
            >
                📸 Take Selfie
            </button>

            {/* Camera view with "Take Shot" and "Cancel" buttons */}
            {isCameraOpen && (
                <div className="flex flex-col items-center mb-6">
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

            {/* Display selfie with "Remove", "Retake" and "Verify" options */}
            {attendanceRecord && (
                <div className="mt-8 flex flex-col items-center bg-gray-100 p-4 rounded-lg shadow-md w-full max-w-md">
                    <img src={attendanceRecord.image} alt="Selfie" className="w-30 h-30 mb-2" />
                    <h3 className="text-lg font-semibold text-gray-700">
                        Arrival Time: {new Date(attendanceRecord.timestamp).toLocaleString()}
                    </h3>
                    <p className="text-md text-gray-600">
                        Time Difference from 9:30 AM: {getTimeDifference()}
                    </p>
                    <div className="flex space-x-4 mt-2">
                        <button
                            onClick={removeImage}
                            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded"
                        >
                            Remove
                        </button>
                        <button
                            onClick={retakeImage}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-1 px-3 rounded"
                        >
                            Retake
                        </button>
                        <button
                            onClick={verifyImage}
                            className={`${
                                attendanceRecord.verified ? 'bg-gray-500' : 'bg-green-500 hover:bg-green-600'
                            } text-white font-semibold py-1 px-3 rounded`}
                            disabled={attendanceRecord.verified}
                        >
                            {attendanceRecord.verified ? 'Verified' : 'Verify'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AttendanceSystem;
