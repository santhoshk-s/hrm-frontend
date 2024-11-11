import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

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
  const [candidates, setCandidates] = useState(initialCandidates);
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    experience: '',
    skills: '',
    resumeFile: null,
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
      setFormData({ ...formData, resumeFile: file });
    }
  };

  // Handle form submission for adding or editing
  const handleSubmit = (e) => {
    e.preventDefault();

    const resumeLink = formData.resumeFile ? formData.resumeFile.name : '';

    if (isEditing) {
      setCandidates((prevCandidates) =>
        prevCandidates.map((candidate) =>
          candidate.id === editId ? { ...candidate, ...formData, resumeLink } : candidate
        )
      );
      setIsEditing(false);
      setEditId(null);
    } else {
      const newCandidate = {
        id: candidates.length + 1,
        ...formData,
        resumeLink,
      };
      setCandidates([...candidates, newCandidate]);
    }

    // Reset form data and close modal
    setFormData({
      name: '',
      position: '',
      experience: '',
      skills: '',
      resumeFile: null,
      status: 'Pending',
    });
    toggleModal();
  };

  // Edit a candidate
  const handleEdit = (candidate) => {
    setFormData({
      ...candidate,
      resumeFile: null,
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
            name: '',
            position: '',
            experience: '',
            skills: '',
            resumeFile: null,
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
        <div className="fixed inset-0 flex items-center justify-center  bg-black bg-opacity-50 z-10">
          <form className="bg-white rounded-lg shadow-lg p-6  w-1/2">
            <h2 className="text-lg font-semibold mb-4">{isEditing ? 'Edit Candidate' : 'Add Candidate'}</h2>
            <div onSubmit={handleSubmit} className="grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-medium items-center">Candidate Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Position</label>
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
                <label className="block mb-1 font-medium">Experience</label>
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
                <label className="block mb-1 font-medium">Skills</label>
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
                <label className="block mb-1 font-medium">Resume Upload</label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
            </div>
              <div className="flex justify-center space-x-3 mt-4 fl">
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
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200 border-b-2 border-gray-300 text-center">
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
            <tr key={candidate.id} className="border-b border-gray-300 text-center">
              <td className="p-3">{candidate.name}</td>
              <td className="p-3">{candidate.position}</td>
              <td className="p-3">{candidate.experience}</td>
              <td className="p-3">{candidate.skills}</td>
              <td className="p-3">
                {candidate.resumeLink ? candidate.resumeLink : 'No Resume Uploaded'}
              </td>
              <td className="p-3">
                <select
                  value={candidate.status}
                  onChange={(e) => handleStatusChange(candidate.id, e.target.value)}
                  className="bg-green-200 border  rounded px-2 py-1"
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
  );
};

export default CandidateTable;
