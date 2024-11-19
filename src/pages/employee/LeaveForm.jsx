import React, { useState } from "react";
import { leaveapply } from "../../redux/slices/leaveSlice";
import { useDispatch, useSelector } from "react-redux";
import { notification } from "antd"; // Import Ant Design notification

const LeaveForm = () => {
  const dispatch = useDispatch();
  const { data, error, loading } = useSelector(
    (state) => state.leave.leaveapply
  );
  const [leaveData, setLeaveData] = useState({ reason: "", dates: [] });

  // Handle change for text input and textarea
  const handlechange = (e) => {
    const { name, value } = e.target;
    if (name === "dates") {
      // If date is already selected, avoid adding it again
      if (!leaveData.dates.includes(value)) {
        setLeaveData((prevData) => ({
          ...prevData,
          dates: [...prevData.dates, value],
        }));
      }
    } else {
      setLeaveData({
        ...leaveData,
        [name]: value,
      });
    }
  };

  // Function to remove a date from the selected dates array
  const removeDate = (dateToRemove) => {
    setLeaveData((prevData) => ({
      ...prevData,
      dates: prevData.dates.filter((date) => date !== dateToRemove),
    }));
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    dispatch(
      leaveapply({ reason: leaveData.reason, dates: leaveData.dates })
    ).then(() => {
      setLeaveData({ reason: "", dates: [] });
      showNotification(); // Show notification on successful submission
    });
  };

  // Ant Design notification
  const showNotification = () => {
    notification.success({
      message: "Request Sent",
      description: "Your leave request has been sent and is waiting for approval.",
      placement: "top",
    });
  };

  return (
    <div className="min-h-[60vh] flex justify-center px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Leave Request Form
        </h2>
        <form onSubmit={handlesubmit} className="grid gap-6">
          {/* Reason */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="reason"
              className="text-sm font-semibold text-gray-700"
            >
              Reason:
            </label>
            <textarea
              id="reason"
              name="reason"
              value={leaveData.reason}
              onChange={handlechange}
              className="w-full p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
              placeholder="Enter your reason"
              rows="4"
              required
              aria-label="Reason for leave"
            />
          </div>

          {/* Date */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="dates"
              className="text-sm font-semibold text-gray-700"
            >
              Date:
            </label>
            <input
              id="dates"
              name="dates"
              onChange={handlechange}
              className="w-full p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
              type="date"
              required
              aria-label="Select a date"
            />
          </div>

          {/* Selected Dates */}
          {leaveData.dates.length > 0 && (
            <div className="flex flex-col gap-2">
              <p className="text-sm font-semibold text-gray-700">
                Selected Dates:
              </p>
              <div className="flex gap-2 flex-wrap">
                {leaveData.dates.map((date, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-gray-200 p-2 rounded-md"
                  >
                    <span className="text-gray-800">{date}</span>
                    <button
                      type="button"
                      onClick={() => removeDate(date)}
                      className="text-red-500 font-bold hover:text-red-700"
                      aria-label={`Remove date ${date}`}
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg font-semibold hover:bg-gradient-to-l hover:from-purple-600 hover:to-blue-500 focus:outline-none shadow-md hover:shadow-lg transform transition-all hover:-translate-y-1"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default LeaveForm;
