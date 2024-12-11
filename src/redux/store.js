import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import leaveReducer from './slices/leaveSlice';
import auditReducer from './slices/auditSlice';
import attendanceReducer from './slices/attendanceSlice';
import employeeReducer from './slices/employeeSlice';
import interviewReducer from './slices/interview';
import queryReducer from './slices/querySlice';
import taskReducer from './slices/taskSlice';



const store = configureStore({
  reducer: {
    auth: authReducer,
    leave:leaveReducer,
    audit:auditReducer,
    attendance:attendanceReducer,
    employee:employeeReducer,
    interview:interviewReducer,
    query:queryReducer,
    task:taskReducer,
  },
});

export default store;
