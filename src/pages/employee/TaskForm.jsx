import React, { useState } from "react";
import { notification } from "antd"; 
import { useDispatch, useSelector } from "react-redux"; 
// import { addQuery } from "../../redux/slices/querySlice"; 
import { addTask } from "../../redux/slices/taskSlice";



const TaskForm = () => {
  const dispatch = useDispatch(); 
  const [formData, setFormData] = useState({ subject: "", comments: "" });

  const { loading, error } = useSelector((state) => state.task);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const TaskData = { subject: formData.subject, task: formData.comments };  
    try {
      await dispatch(addTask(TaskData));
      notification.success({
        message: "Task Submitted",
        description: "Your query has been successfully submitted.",
        placement: "top",
      });
      setFormData({ subject: "", comments: "" });
    } catch (error) {
      console.error("task Submission Error:", error);
      notification.error({
        message: "Submission Failed",
        description: error.message || "There was an issue with your submission.",
        placement: "top",
      });
    }
  };
  

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 items-center p-8 bg-white rounded-xl shadow-lg max-w-full mx-auto border border-gray-200"
    >
      <h2 className="text-2xl font-bold text-gray-800">Employee Task Form</h2>
      <p className="text-sm text-gray-500 text-center">
        Have a question or concern? Fill out the form, and we’ll get back to you.
      </p>

      <input
        id="subject"
        value={formData.subject}
        onChange={handleChange}
        className="w-full p-4 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400 text-gray-700"
        type="text"
        placeholder="Enter Subject"
        required
        aria-label="Enter the subject of your query"
      />

      <textarea
        id="comments"
        value={formData.comments}
        onChange={handleChange}
        placeholder="Enter your reason..."
        className="w-full h-40 p-4 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none placeholder-gray-400 text-gray-700"
        required
        aria-label="Enter details about your query"
      ></textarea>

      <button
        type="submit"
        className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg font-semibold hover:bg-gradient-to-l hover:from-purple-600 hover:to-blue-500 focus:outline-none shadow-md hover:shadow-lg transform transition-all hover:-translate-y-1"
        disabled={loading} 
      >
        {loading ? "Submitting..." : "Submit"}
      </button>

      {error && (
        <p className="text-red-500 text-sm text-center mt-2">{error}</p>
      )}
    </form>
  );
};

export default TaskForm;
