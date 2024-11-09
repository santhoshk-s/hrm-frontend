import React, { useState } from 'react';

const initialCandidates = [
  {
    id: 1,
    name: 'John Doe',
    position: 'Software Engineer',
    experience: '5 years',
    skills: 'JavaScript, React, Node.js',
    resumeLink: '/resumes/john-doe-resume.pdf',
    status: 'Pending',
  },
  {
    id: 2,
    name: 'Jane Smith',
    position: 'Product Manager',
    experience: '3 years',
    skills: 'Product Management, Agile, Roadmapping',
    resumeLink: '/resumes/jane-smith-resume.pdf',
    status: 'Pending',
  },
  {
    id: 3,
    name: 'Alice Johnson',
    position: 'UX Designer',
    experience: '4 years',
    skills: 'User Research, Wireframing, Prototyping',
    resumeLink: '/resumes/alice-johnson-resume.pdf',
    status: 'Pending',
  },
];

const CandidateTable = () => {
  const [candidates, setCandidates] = useState(initialCandidates);

  const updateStatus = (id, newStatus) => {
    setCandidates((prevCandidates) =>
      prevCandidates.map((candidate) =>
        candidate.id === id ? { ...candidate, status: newStatus } : candidate
      )
    );
  };

  return (
    <div className="m-5">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200 border-b-2 border-gray-300 text-center">
            <th className="p-3">Candidate Name</th>
            <th className="p-3">Position</th>
            <th className="p-3">Experience</th>
            <th className="p-3">Skills</th>
            <th className="p-3">Resume</th>
            <th className="p-3">Status</th>
            <th className="p-3">Action</th>
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
                <a
                  href={candidate.resumeLink}
                  download
                  className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
                >
                  Resume
                </a>
              </td>
              <td className="p-3">{candidate.status}</td>
              <td className="p-3 flex justify-center space-x-2">
                <button
                  onClick={() => updateStatus(candidate.id, 'Hired')}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Hire
                </button>
                <button
                  onClick={() => updateStatus(candidate.id, 'Rejected')}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Reject
                </button>
                <button
                  onClick={() => updateStatus(candidate.id, 'Callback')}
                  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                >
                  Callback
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
