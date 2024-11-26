import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

const initialCandidates = JSON.parse(localStorage.getItem('candidates')) || []

const CandidateTables = () => {
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

  useEffect(() => {
    localStorage.setItem('candidates', JSON.stringify(candidates));
  }, [candidates]);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, resume: file });
    }
  };

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
      const newCandidate = {
        id: candidates.length ? candidates[candidates.length - 1].id + 1 : 1,
        ...formData,
        resumeLink,
      };
      setCandidates([...candidates, newCandidate]);
    }

    setFormData({
      candidateName: '',
      position: '',
      experience: '',
      candidateEmail: '',
      mobile: '',
      date: '',
      skills: '',
      resume: null,
      status: 'Pending',
    });
    toggleModal();
  };

  const handleEdit = (candidate) => {
    setFormData({
      ...candidate,
      resume: null,
    });
    setIsEditing(true);
    setEditId(candidate.id);
    toggleModal();
  };

  const handleDelete = (id) => {
    setCandidates(candidates.filter((candidate) => candidate.id !== id));
  };

  const handleStatusChange = (id, newStatus) => {
    setCandidates((prevCandidates) =>
      prevCandidates.map((candidate) =>
        candidate.id === id ? { ...candidate, status: newStatus } : candidate
      )
    );
  };

  return (
    <div className="m-5">
      <button
        onClick={() => {
          setFormData({
            candidateName: '',
            position: '',
            experience: '',
            candidateEmail: '',
            mobile: '',
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

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 w-full sm:w-3/4 lg:w-1/2 max-w-3xl">
            <h2 className="text-lg font-semibold mb-4">
              {isEditing ? 'Edit Candidate' : 'Add Candidate'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label>Candidate Name</label>
                <input
                  type="text"
                  name="candidateName"
                  value={formData.candidateName}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label>Position</label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label>Experience</label>
                <input
                  type="text"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label>Skills</label>
                <input
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label>Candidate Email</label>
                <input
                  type="email"
                  name="candidateEmail"
                  value={formData.candidateEmail}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label>Mobile</label>
                <input
                  type="number"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label>Resume Upload</label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label>Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
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

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-sm">
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
              <tr key={candidate.id} className="border-b text-center">
                <td className="p-3">{candidate.candidateName}</td>
                <td className="p-3">{candidate.position}</td>
                <td className="p-3">{candidate.experience}</td>
                <td className="p-3">{candidate.skills}</td>
                <td className="p-3">
                  <button className="bg-orange-300 border rounded px-2 py-1">
                    Download
                  </button>
                </td>
                <td className="p-3">
                  <select
                    value={candidate.status}
                    onChange={(e) => handleStatusChange(candidate.id, e.target.value)}
                    className="bg-green-200 border rounded px-2 py-1"
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

export default CandidateTables;
