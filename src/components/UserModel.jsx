import React from "react";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";

const UserModel = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="relative bg-white shadow-xl rounded-lg py-3 w-full max-w-md">
      <button
        onClick={onClose}
        className="absolute right-2 top-2 px-4 py-2 bg-red-500 text-white rounded-lg"
      >
        Close
      </button>
      <div className="photo-wrapper p-2">
        <img
          className="w-32 h-32 rounded-full mx-auto"
          src={user.image || "https://via.placeholder.com/150"}
          alt={user.userName || "Profile"}
        />
      </div>
      <div className="p-2">
        <h3 className="text-center text-xl text-gray-900 font-medium leading-8">
          {user.userName || "N/A"}
        </h3>
        <div className="text-center text-gray-400 text-xs font-semibold">
          <p>{user.skills || "N/A"}</p>
        </div>
        <div className="w-full grid gap-6 grid-cols-2">
          <div className="flex justify-between">
            <h2 className="px-2 py-2 text-gray-500 font-semibold">Email</h2>
            <span className="px-2 py-2">{user.email || "N/A"}</span>
          </div>
          <div className="flex justify-between">
            <h2 className="px-2 py-2 text-gray-500 font-semibold">Mobile</h2>
            <span className="px-2 py-2">{user.mobile || "N/A"}</span>
          </div>
          <div className="flex justify-between">
            <h2 className="px-2 py-2 text-gray-500 font-semibold">Blood Group</h2>
            <span className="px-2 py-2">{user.blood || "N/A"}</span>
          </div>
          <div className="space-y-4">
  <div className="flex items-center justify-between border-b pb-2">
    <h2 className="text-gray-500 font-medium">PAN</h2>
    <button className=" text-white font-semibold  px-4 py-2 rounded-lg bg-blue-500 transition">
    <IoEyeSharp size={20} />
    </button>
  </div>
  <div className="flex items-center justify-between border-b pb-2">
    <h2 className="text-gray-500 font-medium">Aadhaar</h2>
    <button className=" text-white font-semibold  px-4 py-2 rounded-lg bg-blue-500 transition">
    <IoEyeSharp size={20} />
    </button>
  </div>
</div>

        </div>
      </div>
    </div>
  </div>
  
  );
};

export default UserModel;
