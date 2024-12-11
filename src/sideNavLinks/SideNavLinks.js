import { LuCalendarCheck } from "react-icons/lu";
import { PiUsersThreeBold } from "react-icons/pi";
import { FaListUl } from "react-icons/fa";
import { FaRegCalendarXmark } from "react-icons/fa6";
import { FaWpforms } from "react-icons/fa6";
import { PiCameraPlusBold } from "react-icons/pi";
import { PiUserSoundBold } from "react-icons/pi";
import { PiUserListFill } from "react-icons/pi";
import { IoHomeOutline } from "react-icons/io5";

export const sidebarLinks = {
  admin: [
    { to: "home", Icon: IoHomeOutline, title: "Home" },
    { to: "attendance", Icon: LuCalendarCheck, title: "All Attendance" },
    { to: "showemployees", Icon: PiUsersThreeBold, title: "All Employees" },
    { to: "interviewlist", Icon: FaListUl, title: "Interview List" },
    { to: "leavelist", Icon: FaRegCalendarXmark, title: "Leave List" },
    { to: "querylist", Icon: PiUserListFill, title: "Query List" },
    { to: "auditlog", Icon: PiUsersThreeBold, title: "Audit Log" },
    { to: "Tasklist", Icon: PiUserListFill, title: "Task List" },
    { to: "ResumeAnalyzer", Icon: PiUserListFill, title: "ResumeAnalyzer" },
    

  ],
  manager: [
    { to: "attendance", Icon: LuCalendarCheck, title: "All Attendance" },
    { to: "showemployees", Icon: PiUsersThreeBold, title: "All Employees" },
    { to: "interviewlist", Icon: FaListUl, title: "Interview List" },
    { to: "leavelist", Icon: FaRegCalendarXmark, title: "Leave List" },
    { to: "querylist", Icon: PiUserListFill, title: "Query List" },
    { to: "Tasklist", Icon: PiUserListFill, title: "Task List" },

  ],
  hr: [
    { to: "attendance", Icon: LuCalendarCheck, title: "All Attendance" },
    { to: "showemployees", Icon: PiUsersThreeBold, title: "All Employees" },
    { to: "interviewlist", Icon: FaListUl, title: "Interview List" },
    { to: "leavelist", Icon: FaRegCalendarXmark, title: "Leave List" },
    { to: "querylist", Icon: PiUserListFill, title: "Query List" },
    { to: "auditlog", Icon: PiUsersThreeBold, title: "Audit Log" },
    { to: "Tasklist", Icon: PiUserListFill, title: "Task List" },
    { to: "Taskform", Icon: PiUserListFill, title: "Task form" },
    { to: "ResumeAnalyzer", Icon: PiUserListFill, title: "ResumeAnalyzer" },



  ],
  employee: [
    { to: "add", Icon: PiCameraPlusBold, title: "Add Attendance" },
    { to: "leaveform", Icon: FaWpforms, title: "Leave Form" },
    { to: "employeequery", Icon: PiUserSoundBold, title: "Employee Query" },
    { to: "Tasklist", Icon: PiUserListFill, title: "Task List" },
    { to: "Taskform", Icon: PiUserListFill, title: "Task form" },

  ],
};
