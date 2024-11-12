import React from "react";

const LeaveForm = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300">
    <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
      <form className="grid gap-6">
        {/* Name */}
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm font-semibold text-gray-700">Name:</label>
          <input
            id="name"
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
            type="text"
            placeholder="Enter your name"
          />
        </div>
  
        {/* Email */}
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-semibold text-gray-700">Email:</label>
          <input
            id="email"
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
            type="email"
            placeholder="Enter your email"
          />
        </div>
  
        {/* Reason */}
        <div className="flex flex-col gap-2">
          <label htmlFor="reason" className="text-sm font-semibold text-gray-700">Reason:</label>
          <textarea
            id="reason"
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
            placeholder="Enter your reason"
            rows="3"
          />
        </div>
  
        {/* Date */}
        <div className="flex flex-col gap-2">
          <label htmlFor="date" className="text-sm font-semibold text-gray-700">Date:</label>
          <input
            id="date"
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
            type="date"
          />
        </div>
  
        {/* Submit Button */}
        <button className="w-full py-3 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 focus:outline-none shadow-md hover:shadow-lg transition-all">
          Submit
        </button>
      </form>
    </div>
  </div>
  
  );
};

export default LeaveForm;
