import React, { useEffect, useState } from "react";
import bgprofile from "../images/hrmprofile.jpg"; // Default profile image
import { getProfile, profileUpdate } from "../redux/slices/employeeSlice";
import { useDispatch, useSelector } from "react-redux";

const Profile = () => {
  const dispatch = useDispatch();
  const { data: getData, error } = useSelector(
    (state) => state.employee.getProfile
  );
  const [profilePic, setProfilePic] = useState(bgprofile); // State to store profile picture

  const [profileData, setProfileData] = useState({
    userName: "",
    email: "",
    address: "",
    mobile: "",
    bloodGroup: "",
    aadhaar: null,
    pan: null,
    bank: null,
    position: "",
    empCode: "",
    image: null,
    imageId: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({ ...prevData, [name]: value }));
  };
  
  const handlesubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
  
    const formData = new FormData();
    Object.keys(profileData).forEach((key) => {
      if (profileData[key] !== null) {
        formData.append(key, profileData[key]);
      }
    });
  
    dispatch(profileUpdate({ formDate: formData })); // Dispatch with FormData
  };
  

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
  useEffect(() => {
    dispatch(getProfile()).then(() => setProfileData({ ...getData }));
  }, [dispatch]);
  console.log(profileData);

  return (
    <div className="flex justify-center items-center min-h-screen -mt-8">
      <div className="bg-white p-10 rounded-2xl w-full max-w-7xl transition-all duration-500">
        {/* Profile Picture Section */}
        <div className=" mb-6 ">
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
            name="image"
            onChange={(e) =>
              setProfileData({ ...profileData, image: e.target.files[0] })
            }
          />
        </div>

        {/* Form Section */}
        <form className="grid grid-cols-2 gap-8" onSubmit={handlesubmit}>
          {/* Name */}
          <div className="col-span-2 md:col-span-1">
            <label htmlFor="name" className="block text-lg font-semibold mb-2">
              Name:
            </label>
            <input
              id="name"
              name="userName"
              onChange={handleChange}
              value={profileData.userName}
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
              name="email"
              onChange={handleChange}
              value={profileData.email}
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
              type="email"
              placeholder="Enter your email"
            />
          </div>

          {/* Old Password */}
          {/* <div className="col-span-2 md:col-span-1">
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
          </div> */}

          {/* New Password */}
          {/* <div className="col-span-2 md:col-span-1">
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
          </div> */}
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
              name="position"
              value={profileData.position}
              onChange={handleChange}
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
              name="empCode"
              value={profileData.empCode}
              onChange={handleChange}
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
              name="address"
              value={profileData.address}
              onChange={handleChange}
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
              name="bloodGroup"
              value={profileData.bloodGroup}
              onChange={handleChange}
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
              name="aadhaar"
              onChange={(e) =>
                setProfileData({ ...profileData, aadhaar: e.target.files[0] })
              }
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
              name="pan"
              onChange={(e) =>
                setProfileData({ ...profileData, pan: e.target.files[0] })
              }
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
              name="bank"
              onChange={(e) =>
                setProfileData({ ...profileData, bank: e.target.files[0] })
              }
              className="w-full p-3 rounded-lg border border-gray-300 transition-all"
              type="file"
              placeholder="Enter your Account Number"
            />
          </div>
          {/* Submit Button */}
          <div className="col-span-2 flex justify-center">
            <button
              type="submit"
              className="px-8 py-3 mt-8 rounded-lg bg-gradient-to-r from-green-600 to-green-500 text-white text-lg font-semibold hover:bg-gradient-to-r hover:from-green-500 hover:to-green-600 focus:outline-none shadow-md hover:shadow-lg transform transition-all hover:-translate-y-0.5"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
