// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import interviewReducer from './slices/interview';


const store = configureStore({
  reducer: {
    auth: authReducer,
    interview:interviewReducer,
  },
});

export default store;
