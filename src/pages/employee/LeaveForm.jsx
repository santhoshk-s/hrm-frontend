import React, { useState } from "react";
import { leaveapply } from "../../redux/slices/leaveSlice";
import { useDispatch, useSelector } from "react-redux";

const LeaveForm = () => {
  const dispatch = useDispatch();
  const {data, error, loading} = useSelector((state) => state.leave.leaveapply);
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
    dispatch(leaveapply({ reason: leaveData.reason, dates: leaveData.dates })).then(() => setLeaveData({ reason: "", dates: [] })); 
  };
  console.log(data, error, loading);
  return (
    <div className="flex justify-center items-center">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
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
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
              placeholder="Enter your reason"
              rows="3"
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
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
              type="date"
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
                    <span>{date}</span>
                    <button
                      type="button"
                      onClick={() => removeDate(date)}
                      className="text-red-500 font-bold"
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
            className="w-full py-3 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 focus:outline-none shadow-md hover:shadow-lg transition-all"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default LeaveForm;
