import React, { useState } from 'react';

const Holidays = ({ onSubmit, initialData = {} }) => {
  const [name, setName] = useState(initialData.name || '');
  const [date, setDate] = useState(initialData.date || '');
  const [type, setType] = useState(initialData.type || 'National');
  const [description, setDescription] = useState(initialData.description || '');
  const [isRecurring, setIsRecurring] = useState(initialData.isRecurring || false);
  const [isArchived, setIsArchived] = useState(initialData.archived || false);
  const [showModal, setShowModal] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const confirmSubmit = () => {
    onSubmit({ name, date, type, description, isRecurring, isArchived });
    setSubmissionSuccess(true);
    setShowModal(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-lg shadow-lg max-w-md mx-auto space-y-4">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-900">
          {initialData._id ? 'Edit Holiday' : 'Add New Holiday'}
        </h2>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Holiday Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input input-bordered w-full border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="date">
            Date
          </label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="input input-bordered w-full border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="type">
            Type
          </label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="input input-bordered w-full border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200"
          >
            <option value="National">National</option>
            <option value="Local">Local</option>
            <option value="Company-Specific">Company-Specific</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            placeholder="Holiday Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="input input-bordered w-full border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200"
          />
        </div>
        <div className="mb-4 flex items-center">
          <input
            id="isRecurring"
            type="checkbox"
            checked={isRecurring}
            onChange={(e) => setIsRecurring(e.target.checked)}
            className="checkbox checkbox-primary"
          />
          <label htmlFor="isRecurring" className="ml-2 text-gray-700">Recurring</label>
        </div>
        <div className="mb-4 flex items-center">
          <input
            id="isArchived"
            type="checkbox"
            checked={isArchived}
            onChange={(e) => setIsArchived(e.target.checked)}
            className="checkbox checkbox-primary"
          />
          <label htmlFor="isArchived" className="ml-2 text-gray-700">Archived</label>
        </div>
        <button type="submit" className="btn btn-primary w-full bg-indigo-600 hover:bg-indigo-700 focus:bg-indigo-500 text-white px-4 py-2 rounded-md">
          {initialData._id ? 'Update Holiday' : 'Add Holiday'}
        </button>
      </form>

      {showModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-10">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Confirm Submission</h2>
            <p className="text-gray-700 mb-4">Are you sure you want to submit the holiday details?</p>
            <div className="flex justify-end space-x-2">
              <button onClick={() => setShowModal(false)} className="btn btn-secondary px-4 py-2 rounded-md text-white bg-red-600 hover:bg-red-700">Cancel</button>
              <button onClick={confirmSubmit} className="btn btn-primary px-4 py-2 rounded-md text-white bg-green-600 hover:bg-green-700">Confirm</button>
            </div>
          </div>
        </div>
      )}

      {submissionSuccess && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-20">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Success</h2>
            <p className="text-gray-700 mb-4">Holiday details have been successfully submitted!</p>
            <div className="flex justify-center">
              <button onClick={() => setSubmissionSuccess(false)} className="btn btn-primary px-4 py-2 rounded-md text-white bg-indigo-600 hover:bg-indigo-700">OK</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Holidays;
