import React, { useState } from "react";
import bgprofile from "../images/hrmprofile.jpg";

const Profile = () => {
  const [profilePic, setProfilePic] = useState(bgprofile);
  const [activeTab, setActiveTab] = useState("personal");
  const [profileData, setProfileData] = useState({
    userName: "",
    email: "",
    mobile: "",
    dob: "",
    gender: "",
    doj: "",
    bloodGroup: "",
    address: {
      permanentAddress: "",
      presentAddress: "",
      city: "",
      state: "",
      country: "",
      zipcode: "",
    },
    bankDetails: {
      bankName: "",
      accountNumber: "",
      bankBranch: "",
      IFSCcode: "",
    },
    documents: {
      aadhaar: null,
      pan: null,
      passport: null,
    },
    educations: {
      tenthMark: null,
      twelfthMark: null,
      college: "",
      collegeCgpa: "",
    },
    experiences: [
      {
        companyName: "",
        jobTitle: "",
        yearsWorked: "",
        companyLocation: "",
        jobDestinations: "",
        relievingReason: "",
      },
    ],
  });

  const [savedData, setSavedData] = useState(null); // State to store saved data after submission

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      address: { ...prevData.address, [name]: value },
    }));
  };

  const handleBankChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      bankDetails: { ...prevData.bankDetails, [name]: value },
    }));
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];
    if (name === "profilePic") {
      setProfilePic(URL.createObjectURL(file));
    } else {
      setProfileData((prevData) => ({
        ...prevData,
        documents: { ...prevData.documents, [name]: file },
      }));
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleExperienceChange = (index, e) => {
    const { name, value } = e.target;
    const updatedExperiences = [...profileData.experiences];
    updatedExperiences[index] = { ...updatedExperiences[index], [name]: value };
    setProfileData((prevData) => ({ ...prevData, experiences: updatedExperiences }));
  };

  const addNewExperience = () => {
    setProfileData((prevData) => ({
      ...prevData,
      experiences: [
        ...prevData.experiences,
        {
          companyName: "",
          jobTitle: "",
          yearsWorked: "",
          companyLocation: "",
          jobDestinations: "",
          relievingReason: "",
        },
      ],
    }));
  };

  const handleSaveChanges = () => {
    setSavedData(profileData); // Save data to display later
    const tabOrder = ["personal", "educational", "address", "bank", "experience"];
    const currentIndex = tabOrder.indexOf(activeTab);
    if (currentIndex < tabOrder.length - 1) {
      setActiveTab(tabOrder[currentIndex + 1]); // Move to the next tab
    } else {
      setActiveTab("allDetails"); // Move to all details once all sections are saved
    }
  };

  const handleEdit = (section) => {
    setActiveTab(section); // Set active tab to the clicked section
  };

  return (
    <div className="flex justify-center items-center min-h-screen -mt-8">
      <div className="bg-white p-10 rounded-2xl w-full max-w-7xl transition-all duration-500 flex flex-col">
        {/* Profile Picture Section */}
        <div className="mb-6 text-center">
          <img
            className="rounded-full h-24 w-24 object-cover border-4 border-gray-200 cursor-pointer transition-transform transform hover:scale-105"
            src={profilePic}
            alt="profile"
            onClick={() => document.getElementById("fileInput").click()}
          />
          <input
            id="fileInput"
            type="file"
            className="hidden"
            accept="image/*"
            name="profilePic"
            onChange={handleFileChange}
          />
        </div>

        {/* Tab Section */}
        <div className="mb-6">
          <ul className="flex border-b">
            {["personal", "educational", "address", "documents", "experience", "bank", "allDetails"].map((tab) => (
              <li
                key={tab}
                className={`mr-6 pb-2 cursor-pointer ${activeTab === tab ? "border-b-2 border-blue-500" : ""}`}
                onClick={() => handleTabClick(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </li>
            ))}
          </ul>
        </div>

        {/* Content Section */}
        <div className="flex-grow">
          {/* Personal Section */}
          {activeTab === "personal" && (
            <div>
              <h2 className="text-xl font-bold mb-4">Personal Details</h2>
              <form className="grid grid-cols-2 gap-8">
                {["userName", "email", "mobile", "dob", "doj"].map((field) => (
                  <div key={field}>
                    <label className="block text-md font-semibold mb-2">{field.replace(/([A-Z])/g, " $1")}</label>
                    <input
                      name={field}
                      value={profileData[field]}
                      onChange={handleChange}
                      className="w-full p-3 rounded-lg border border-gray-300"
                      type={field === "dob" || field === "doj" ? "date" : "text"}
                      placeholder={`Enter ${field.replace(/([A-Z])/g, " $1")}`}
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-md font-semibold mb-2">Gender</label>
                  <select
                    name="gender"
                    value={profileData.gender}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg border border-gray-300"
                  >
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </form>
            </div>
          )}

          {/* Educational Section */}
          {activeTab === "educational" && (
            <div>
              <h2 className="text-xl font-bold mb-4">Educational Details</h2>
              <form className="grid grid-cols-2 gap-8">
                <div>
                  <label className="block text-md font-semibold mb-2">10th Marks:</label>
                  <input
                    name="tenthMark"
                    value={profileData.educations.tenthMark}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg border border-gray-300"
                    type="text"
                    placeholder="Enter 10th Marks"
                  />
                </div>
                <div>
                  <label className="block text-md font-semibold mb-2">12th Marks:</label>
                  <input
                    name="twelfthMark"
                    value={profileData.educations.twelfthMark}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg border border-gray-300"
                    type="text"
                    placeholder="Enter 12th Marks"
                  />
                </div>
                <div>
                  <label className="block text-md font-semibold mb-2">College Name:</label>
                  <input
                    name="college"
                    value={profileData.educations.college}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg border border-gray-300"
                    type="text"
                    placeholder="Enter College Name"
                  />
                </div>
                <div>
                  <label className="block text-md font-semibold mb-2">College CGPA:</label>
                  <input
                    name="collegeCgpa"
                    value={profileData.educations.collegeCgpa}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg border border-gray-300"
                    type="text"
                    placeholder="Enter College CGPA"
                  />
                </div>
              </form>
            </div>
          )}

          {/* Address Section */}
          {activeTab === "address" && (
            <div>
              <h2 className="text-xl font-bold mb-4">Address Details</h2>
              <form className="grid grid-cols-2 gap-8">
                {["permanentAddress", "presentAddress", "city", "state", "country", "zipcode"].map((field) => (
                  <div key={field}>
                    <label className="block text-md font-semibold mb-2">{field.replace(/([A-Z])/g, " $1")}</label>
                    <input
                      name={field}
                      value={profileData.address[field]}
                      onChange={handleAddressChange}
                      className="w-full p-3 rounded-lg border border-gray-300"
                      type="text"
                      placeholder={`Enter ${field.replace(/([A-Z])/g, " $1")}`}
                    />
                  </div>
                ))}
              </form>
            </div>
          )}

          {/* Bank Section */}
          {activeTab === "bank" && (
            <div>
              <h2 className="text-xl font-bold mb-4">Bank Details</h2>
              <form className="grid grid-cols-2 gap-8">
                {["bankName", "accountNumber", "bankBranch", "IFSCcode"].map((field) => (
                  <div key={field}>
                    <label className="block text-md font-semibold mb-2">{field.replace(/([A-Z])/g, " $1")}</label>
                    <input
                      name={field}
                      value={profileData.bankDetails[field]}
                      onChange={handleBankChange}
                      className="w-full p-3 rounded-lg border border-gray-300"
                      type="text"
                      placeholder={`Enter ${field.replace(/([A-Z])/g, " $1")}`}
                    />
                  </div>
                ))}
              </form>
            </div>
          )}

          {/* Experience Section */}
          {activeTab === "experience" && (
            <div>
              <h2 className="text-xl font-bold mb-4">Experience Details</h2>
              {profileData.experiences.map((experience, index) => (
                <div key={index} className="mb-4">
                  <h3 className="text-lg font-semibold">Experience {index + 1}</h3>
                  <form className="grid grid-cols-2 gap-8">
                    {Object.keys(experience).map((field) => (
                      <div key={field}>
                        <label className="block text-md font-semibold mb-2">
                          {field.replace(/([A-Z])/g, " $1")}
                        </label>
                        <input
                          name={field}
                          value={experience[field]}
                          onChange={(e) => handleExperienceChange(index, e)}
                          className="w-full p-3 rounded-lg border border-gray-300"
                          type="text"
                          placeholder={`Enter ${field.replace(/([A-Z])/g, " $1")}`}
                        />
                      </div>
                    ))}
                  </form>
                </div>
              ))}
              <button
                type="button"
                onClick={addNewExperience}
                className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-md"
              >
                Add Experience
              </button>
            </div>
          )}

          {/* All Details Section */}
          {activeTab === "allDetails" && savedData && (
            <div className="mt-6 p-6  max-w-4xl mx-auto">
              <h2 className="text-xl font-bold mb-6">All Details</h2>

             <div className="grid grid-cols-3 gap-10">
                {/* Personal Details Card */}
                <div className="mb-4 p-4 bg-white shadow-lg rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">Personal Details</h3>
                  <div className="space-y-2">
                    <div><strong>User Name: </strong> {savedData.userName}</div>
                    <div><strong>Email: </strong> {savedData.email}</div>
                    <div><strong>Mobile: </strong> {savedData.mobile}</div>
                    <div><strong>Date of Birth: </strong> {savedData.dob}</div>
                    <div><strong>Gender: </strong> {savedData.gender}</div>
                    <div><strong>Date of Joining: </strong> {savedData.doj}</div>
                    <div><strong>Blood Group: </strong> {savedData.bloodGroup}</div>
                  </div>
                </div>
  
                {/* Address Details Card */}
                <div className="mb-4 p-4 bg-white shadow-lg rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">Address Details</h3>
                  <div className="space-y-2">
                    <div><strong>Permanent Address: </strong> {savedData.address.permanentAddress}</div>
                    <div><strong>Present Address: </strong> {savedData.address.presentAddress}</div>
                    <div><strong>City: </strong> {savedData.address.city}</div>
                    <div><strong>State: </strong> {savedData.address.state}</div>
                    <div><strong>Country: </strong> {savedData.address.country}</div>
                    <div><strong>Zip Code: </strong> {savedData.address.zipcode}</div>
                  </div>
                </div>
  
                {/* Bank Details Card */}
                <div className="mb-4 p-4 bg-white shadow-lg rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">Bank Details</h3>
                  <div className="space-y-2">
                    <div><strong>Bank Name: </strong> {savedData.bankDetails.bankName}</div>
                    <div><strong>Account Number: </strong> {savedData.bankDetails.accountNumber}</div>
                    <div><strong>Bank Branch: </strong> {savedData.bankDetails.bankBranch}</div>
                    <div><strong>IFSC Code: </strong> {savedData.bankDetails.IFSCcode}</div>
                  </div>
                </div>
  
                {/* Educational Details Card */}
                <div className="mb-4 p-4 bg-white shadow-lg rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">Educational Details</h3>
                  <div className="space-y-2">
                    <div><strong>10th Marks: </strong> {savedData.educations.tenthMark}</div>
                    <div><strong>12th Marks: </strong> {savedData.educations.twelfthMark}</div>
                    <div><strong>College Name: </strong> {savedData.educations.college}</div>
                    <div><strong>College CGPA: </strong> {savedData.educations.collegeCgpa}</div>
                  </div>
                </div>
  
                {/* Experience Details Card */}
                <div className="mb-4 p-4 bg-white shadow-lg rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">Experience Details</h3>
                  {savedData.experiences.map((exp, index) => (
                    <div key={index} className="space-y-2 mb-4">
                      <div><strong>Company Name: </strong> {exp.companyName}</div>
                      <div><strong>Job Title: </strong> {exp.jobTitle}</div>
                      <div><strong>Years Worked: </strong> {exp.yearsWorked}</div>
                      <div><strong>Company Location: </strong> {exp.companyLocation}</div>
                      <div><strong>Job Responsibilities: </strong> {exp.jobDestinations}</div>
                      <div><strong>Relieving Reason: </strong> {exp.relievingReason}</div>
                    </div>
                  ))}
                </div>
  
                {/* Documents Card */}
                <div className="mb-4 p-4 bg-white shadow-lg rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">Documents</h3>
                  <div className="space-y-2">
                    <div><strong>Aadhaar: </strong> {savedData.documents.aadhaar ? "Uploaded" : "Not Uploaded"}</div>
                    <div><strong>Pan Card: </strong> {savedData.documents.pan ? "Uploaded" : "Not Uploaded"}</div>
                    <div><strong>Passport: </strong> {savedData.documents.passport ? "Uploaded" : "Not Uploaded"}</div>
                  </div>
                </div>
             </div>
            </div>
          )}


          {/* Save & Next Button */}
          {activeTab !== "allDetails" && (
            <button
              onClick={handleSaveChanges}
              className="mt-6 py-2 px-4 bg-blue-500 text-white rounded-md"
            >
              Save & Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
