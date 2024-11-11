import React from "react";

const LeaveForm = () => {
  return (
    <div className=" grid h-[400px] w-full items-center justify-center">
      <form className="grid gap-4">
        <div className="flex justify-between w-80 ">
          <label>Name :</label>
          <input className=" rounded-xl" type="text" placeholder="Enter your name" />
        </div>
        <div className="flex justify-between w-80">
          <label>Email :</label>
          <input className=" rounded-xl" type="email" placeholder="Enter your name" />
        </div>
        <div className="flex justify-between w-80">
          <label>Reason :</label>
          <textarea className=" rounded-xl" type="text" placeholder="Enter your name" />
        </div>

        <div className="flex justify-between w-80">
          <label>Date :</label>
          <input className=" rounded-xl " type="date" placeholder="Enter your name" />
        </div>
        <button className="p-2 rounded-xl  text-white bg-green-900">Submit</button>
      </form>
    </div>
  );
};

export default LeaveForm;
