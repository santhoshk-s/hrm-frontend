import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {  leaveapprove, leaverejected } from "../../redux/slices/leaveSlice";
import useAuth from "../../utils/useAuth";


const LeaveModal = ({ isOpen, modalData, closeModal, handleSubmit, actionType }) => {
    const dispatch = useDispatch();
    const { role } = useAuth(); // Assumes useAuth provides the user's role

    const [comments, setComments] = useState({
        managerComments: "",
        hrComments: "",
    });
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        setComments({ ...comments, [e.target.name]: e.target.value });
    };

   

    const handleModalSubmit = async () => {
      if (!comments.managerComments && !comments.hrComments) {
          setError("Comments are required.");
          return;
      }

      try {
          const payload = {
              id: modalData._id, // Use the correct `id` field from modalData
              managerComments: role === "manager" ? comments.managerComments : "",
              hrComments: role === "hr" ? comments.hrComments : "",
          };

          if (actionType === "approve") {
              await dispatch(leaveapprove(payload)).unwrap();
          } else if (actionType === "reject") {
              await dispatch(leaverejected(payload)).unwrap();
          }

          handleSubmit(payload); // Notify parent of submission
          closeModal(); // Close modal
      } catch (err) {
          setError(err.message || "An error occurred while submitting.");
      }
  };

  if (!isOpen) return null;


    return (
        <div className="modal fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-lg shadow-xl w-96 max-w-md">
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                    {actionType === "approve" ? "Approve Leave" : "Reject Leave"}
                </h3>
                {error && (
                    <div className="mb-4 text-red-600 bg-red-100 p-2 rounded">
                        {error}
                    </div>
                )}
                <form>
                    {role === "manager" && (
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Manager Comments
                            </label>
                            <textarea
                                name="managerComments"
                                value={comments.managerComments}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                    )}
                    {role === "hr" && (
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                HR Comments
                            </label>
                            <textarea
                                name="hrComments"
                                value={comments.hrComments}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                    )}
                    <div className="flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="btn bg-gray-300 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-400 transition duration-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleModalSubmit}
                            className="btn bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition duration-200"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LeaveModal;
