import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notification, Modal } from "antd";
import { leaveapply } from "../../redux/slices/leaveSlice";

const LeaveForm = ({ updateLeaveBalances }) => {
  const dispatch = useDispatch();
  const { data, error, loading } = useSelector((state) => state.leave.leaveapply);

  // Leave balances managed in state
  const [leaveBalances, setLeaveBalances] = useState({
    total: 24,
    sick: 12,
    casual: 12,
  });

  const [leaveData, setLeaveData] = useState({
    startDate: "",
    endDate: "",
    assignedTo: "",
    reason: "",
    leaveType: "",
  });

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeaveData({
      ...leaveData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!leaveData.leaveType) {
      notification.error({
        message: "Leave Type Required",
        description: "Please select a leave type.",
      });
      return;
    }

    if (leaveBalances[leaveData.leaveType] > 0) {
      dispatch(
        leaveapply({
          startDate: leaveData.startDate,
          endDate: leaveData.endDate,
          assignedTo: leaveData.assignedTo,
          reason: leaveData.reason,
          leaveType: leaveData.leaveType,
        })
      ).then(() => {
        // Update leave balance
        setLeaveBalances((prevBalances) => ({
          ...prevBalances,
          [leaveData.leaveType]: prevBalances[leaveData.leaveType] - 1,
          total: prevBalances.total - 1,
        }));

        setLeaveData({
          startDate: "",
          endDate: "",
          assignedTo: "",
          reason: "",
          leaveType: "",
        });

        showNotification();
        updateLeaveBalances({
          [leaveData.leaveType]: leaveBalances[leaveData.leaveType] - 1,
          total: leaveBalances.total - 1,
        });
      });
    } else {
      notification.error({
        message: "Insufficient Balance",
        description: `No ${leaveData.leaveType} leaves left.`,
      });
    }
  };

  const showNotification = () => {
    notification.success({
      message: "Request Sent",
      description: "Your leave request has been sent and is waiting for approval.",
      placement: "top",
    });
  };

  const handleView = (type) => {
    setModalContent(
      `Details for ${type.charAt(0).toUpperCase() + type.slice(1)} Leave`
    );
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="min-h-[80vh] flex flex-col justify-center px-4 sm:px-6 lg:px-8">
      {/* Leave Balances */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {Object.entries(leaveBalances).map(([key, value]) => (
          <div key={key} className={`bg-white text-black p-6 rounded-lg shadow-lg`}>
            <h3 className="text-lg font-semibold capitalize">{key} Leave</h3>
            <p className="text-2xl font-bold">{value} days</p>
            {key !== "total" && (
              <button
                onClick={() => handleView(key)}
                className="mt-4 px-4 py-2 rounded-lg bg-gray-800 text-white font-semibold hover:bg-gray-700 transition"
              >
                View
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Leave Application Form */}
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Leave Application Form
        </h2>
        <form onSubmit={handleSubmit} className="grid gap-6">
          {/* Leave Type */}
          <div className="flex flex-col gap-2">
            <label htmlFor="leaveType" className="text-sm font-semibold text-gray-700">
              Leave Type:
            </label>
            <select
              id="leaveType"
              name="leaveType"
              value={leaveData.leaveType}
              onChange={handleChange}
              className="w-full p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
              required
            >
              <option value="">Select leave type</option>
              <option value="sick">Sick Leave</option>
              <option value="casual">Casual Leave</option>
            </select>
          </div>

          {/* Start Date */}
          <div className="flex flex-col gap-2">
            <label htmlFor="startDate" className="text-sm font-semibold text-gray-700">
              Start Date:
            </label>
            <input
              id="startDate"
              name="startDate"
              value={leaveData.startDate}
              onChange={handleChange}
              className="w-full p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
              type="date"
              required
            />
          </div>

          {/* End Date */}
          <div className="flex flex-col gap-2">
            <label htmlFor="endDate" className="text-sm font-semibold text-gray-700">
              End Date:
            </label>
            <input
              id="endDate"
              name="endDate"
              value={leaveData.endDate}
              onChange={handleChange}
              className="w-full p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
              type="date"
              required
            />
          </div>

          {/* Assign Work */}
          <div className="flex flex-col gap-2">
            <label htmlFor="assignedTo" className="text-sm font-semibold text-gray-700">
              Assign Work To:
            </label>
            <select
              id="assignedTo"
              name="assignedTo"
              value={leaveData.assignedTo}
              onChange={handleChange}
              className="w-full p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
              required
            >
              <option value="">Select a colleague</option>
              <option value="John Doe">John Doe</option>
              <option value="Jane Smith">Jane Smith</option>
              <option value="Mark Johnson">Mark Johnson</option>
            </select>
          </div>

          {/* Reason */}
          <div className="flex flex-col gap-2">
            <label htmlFor="reason" className="text-sm font-semibold text-gray-700">
              Reason:
            </label>
            <textarea
              id="reason"
              name="reason"
              value={leaveData.reason}
              onChange={handleChange}
              className="w-full p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
              placeholder="Enter your reason"
              rows="4"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg font-semibold hover:bg-gradient-to-l hover:from-purple-600 hover:to-blue-500 focus:outline-none shadow-md hover:shadow-lg transform transition-all hover:-translate-y-1"
          >
            Submit Application
          </button>
        </form>
      </div>

      {/* Modal for View Details */}
      <Modal title="Leave Details" visible={isModalVisible} onCancel={closeModal} footer={null}>
        <p>{modalContent}</p>
      </Modal>
    </div>
  );
};

export default LeaveForm;
