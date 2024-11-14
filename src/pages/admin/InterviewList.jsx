import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from "react-redux";
import { addInterview } from '../../redux/slices/interview';

const initialCandidates = [
  {
    id: 1,
    name: 'John Doe',
    position: 'Software Engineer',
    experience: '5 years',
    skills: 'JavaScript, React, Node.js',
    resumeLink: 'john-doe-resume.pdf',
    status: 'Pending',
  },
  {
    id: 2,
    name: 'Jane Smith',
    position: 'Product Manager',
    experience: '3 years',
    skills: 'Product Management, Agile, Roadmapping',
    resumeLink: 'jane-smith-resume.pdf',
    status: 'Pending',
  },
  {
    id: 3,
    name: 'Alice Johnson',
    position: 'UX Designer',
    experience: '4 years',
    skills: 'User Research, Wireframing, Prototyping',
    resumeLink: 'alice-johnson-resume.pdf',
    status: 'Pending',
  },
];

const CandidateTable = () => {
  const dispatch = useDispatch();
  const { data: addData, error: addError, loading: addLoading } = useSelector((state) => state.interview.addInterview);
  const [candidates, setCandidates] = useState(initialCandidates);
  const [formData, setFormData] = useState({
    candidateName: '',
    candidateEmail: '',
    mobile: '',
    position: '',
    experience: '',
    date: '',
    skills: '',
    resume: null,
    status: 'Pending',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Toggle modal visibility
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  // Update input fields as the user types
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, resume: file });
    }
  };

  // Handle form submission for adding or editing
  const handleSubmit = (e) => {
    e.preventDefault();

    const resumeLink = formData.resume ? formData.resume.name : '';

    if (isEditing) {
      setCandidates((prevCandidates) =>
        prevCandidates.map((candidate) =>
          candidate.id === editId ? { ...candidate, ...formData, resumeLink } : candidate
        )
      );
      setIsEditing(false);
      setEditId(null);
    } else {
      dispatch(addInterview({ formData }));
      const newCandidate = {
        id: candidates.length + 1,
        ...formData,
        resumeLink,
      };
      setCandidates([...candidates, newCandidate]);
    }

    // Reset form data and close modal
    setFormData({
      candidateName: '',
      position: '',
      experience: '',
      candidateEmail: '',
      mobile: null,
      date: '',
      skills: '',
      resume: null,
      status: 'Pending',
    });
    toggleModal();
  };

  // Edit a candidate
  const handleEdit = (candidate) => {
    setFormData({
      ...candidate,
      resume: null,
    });
    setIsEditing(true);
    setEditId(candidate.id);
    toggleModal();
  };

  // Delete a candidate
  const handleDelete = (id) => {
    setCandidates(candidates.filter((candidate) => candidate.id !== id));
  };

  // Update candidate status from dropdown
  const handleStatusChange = (id, newStatus) => {
    setCandidates((prevCandidates) =>
      prevCandidates.map((candidate) =>
        candidate.id === id ? { ...candidate, status: newStatus } : candidate
      )
    );
  };

  return (
    <div className="m-5">
      {/* Button to open modal for adding a new candidate */}
      <button
        onClick={() => {
          setFormData({
            candidateName: '',
            position: '',
            experience: '',
            candidateEmail: '',
            mobile: null,
            date: '',
            skills: '',
            resume: null,
            status: 'Pending',
          });
          setIsEditing(false);
          toggleModal();
        }}
        className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-5"
      >
        <FaPlus className="mr-2" /> Add Candidate
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
          <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full sm:w-3/4 lg:w-1/2 max-w-3xl">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
              {isEditing ? 'Edit Candidate' : 'Add Candidate'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-medium text-gray-800 dark:text-white">Candidate Name</label>
                <input
                  type="text"
                  name="candidateName"
                  value={formData.candidateName}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-800 dark:text-white">Position</label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-800 dark:text-white">Experience</label>
                <input
                  type="text"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 font-medium text-gray-800 dark:text-white">Skills</label>
                <input
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 font-medium text-gray-800 dark:text-white">Candidate Email</label>
                <input
                  type="email"
                  name="candidateEmail"
                  value={formData.candidateEmail}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-800 dark:text-white">Mobile</label>
                <input
                  type="number"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-800 dark:text-white">Resume Upload</label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-800 dark:text-white">Date</label>
                <input
                  type="Date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
            </div>

            <div className="mt-4 flex justify-between">
              <button
                type="button"
                onClick={toggleModal}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                {isEditing ? 'Update' : 'Add'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Candidates Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700 border-b-2 border-gray-300 text-center">
              <th className="p-3">Candidate Name</th>
              <th className="p-3">Position</th>
              <th className="p-3">Experience</th>
              <th className="p-3">Skills</th>
              <th className="p-3">Resume</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate) => (
              <tr key={candidate.id} className="border-b border-gray-300 text-center dark:bg-gray-800">
                <td className="p-3">{candidate.name}</td>
                <td className="p-3">{candidate.position}</td>
                <td className="p-3">{candidate.experience}</td>
                <td className="p-3">{candidate.skills}</td>
                <td className="p-3">
                  <button className="bg-orange-300 border rounded px-2 py-1">Download</button>
                </td>
                <td className="p-3">
                  <select
                    value={candidate.status}
                    onChange={(e) => handleStatusChange(candidate.id, e.target.value)}
                    className="bg-green-200 dark:bg-green-700 hover:to-blue-500 border rounded px-2 py-1 cursor-pointer"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Hired">Hired</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Callback">Callback</option>
                  </select>
                </td>
                <td className="p-3 flex justify-center space-x-2">
                  <button
                    onClick={() => handleEdit(candidate)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(candidate.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CandidateTable;
