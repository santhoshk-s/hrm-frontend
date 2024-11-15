import React, { useState } from "react";
import bgprofile from "../images/hrmprofile.jpg"; // Default profile image

const Profile = () => {
  const [profilePic, setProfilePic] = useState(bgprofile); // State to store profile picture

  // Function to handle profile picture change
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result); // Update the profile picture state
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };

  return (
    <div className="flex justify-center items-center bg-gradient-to-br from-gray-100 to-gray-300 min-h-screen py-8">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-4xl transition-all duration-500">
        {/* Profile Picture Section */}
        <div className="flex justify-center mb-6 relative">
          <img
            className="rounded-full h-32 w-32 object-cover border-4 border-gray-200 cursor-pointer transition-transform transform hover:scale-105"
            src={profilePic}
            alt="profile"
            onClick={() => document.getElementById("fileInput").click()}
          />
          <input
            id="fileInput"
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleProfilePicChange}
          />
        </div>

        {/* Form Section */}
        <form className="grid grid-cols-2 gap-8">
          {/* Name */}
          <div className="col-span-2 md:col-span-1">
            <label htmlFor="name" className="block text-lg font-semibold mb-2">
              Name:
            </label>
            <input
              id="name"
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
              type="text"
              placeholder="Enter your name"
            />
          </div>

          {/* Email */}
          <div className="col-span-2 md:col-span-1">
            <label htmlFor="email" className="block text-lg font-semibold mb-2">
              Email:
            </label>
            <input
              id="email"
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
              type="email"
              placeholder="Enter your email"
            />
          </div>

          {/* Old Password */}
          <div className="col-span-2 md:col-span-1">
            <label
              htmlFor="oldPassword"
              className="block text-lg font-semibold mb-2"
            >
              Old Password:
            </label>
            <input
              id="oldPassword"
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
              type="password"
              placeholder="Enter old password"
            />
          </div>

          {/* New Password */}
          <div className="col-span-2 md:col-span-1">
            <label
              htmlFor="newPassword"
              className="block text-lg font-semibold mb-2"
            >
              New Password:
            </label>
            <input
              id="newPassword"
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
              type="password"
              placeholder="Enter new password"
            />
          </div>
 {/* position  */}
 <div className="col-span-2 md:col-span-1">
            <label
              htmlFor="position"
              className="block text-lg font-semibold mb-2"
            >
              Position:
            </label>
            <input
              id="position"
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
              type="text"
              placeholder="Enter your position"
            />
          </div>

           {/* employeecode*/}
           <div className="col-span-2 md:col-span-1">
            <label
              htmlFor="employeecode"
              className="block text-lg font-semibold mb-2"
            >
              Employee Code:
            </label>
            <input
              id="employeecode"
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
              type="text"
              placeholder="Enter your employeecode"
            />
          </div>

          {/* Address */}
          <div className="col-span-2">
            <label
              htmlFor="address"
              className="block text-lg font-semibold mb-2"
            >
              Address:
            </label>
            <textarea
              id="address"
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
              type="text"
              placeholder="Enter your address"
            />
          </div>

          {/* Blood Group */}
          <div className="col-span-2 md:col-span-1">
            <label
              htmlFor="bloodGroup"
              className="block text-lg font-semibold mb-2"
            >
              Blood Group:
            </label>
            <input
              id="bloodGroup"
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
              type="text"
              placeholder="Enter your blood group"
            />
          </div>

          {/* Aadhar Number */}
          <div className="col-span-2 md:col-span-1">
            <label
              htmlFor="aadhar"
              className="block text-lg font-semibold mb-2"
            >
              Aadhar :
            </label>
            <input
              id="aadhar"
              className="w-full p-3 rounded-lg border border-gray-300 transition-all"

              type="file"
              placeholder="Enter your Aadhar Number"
            />
          </div>

          {/* Pan Number */}
          <div className="col-span-2 md:col-span-1">
            <label htmlFor="pan" className="block text-lg font-semibold mb-2">
              Pan :
            </label>
            <input
              id="pan"
              className="w-full p-3 rounded-lg border border-gray-300 transition-all"
              type="file"
              placeholder="Enter your Pan Number"
            />
          </div>

          {/* Bank Account Number */}
          <div className="col-span-2 md:col-span-1">
            <label
              htmlFor="bankAccount"
              className="block text-lg font-semibold mb-2"
            >
              Bank Passbook :
            </label>
            <input
              id="bankAccount"
              className="w-full p-3 rounded-lg border border-gray-300 transition-all"
              type="file"
              placeholder="Enter your Account Number"
            />
          </div>
          {/* Submit Button */}
          <div className="col-span-2 flex justify-center">
            <button className="px-8 py-3 mt-8 rounded-lg bg-gradient-to-r from-green-600 to-green-500 text-white text-lg font-semibold hover:bg-gradient-to-r hover:from-green-500 hover:to-green-600 focus:outline-none shadow-md hover:shadow-lg transform transition-all hover:-translate-y-0.5">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
