import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  attendanceRecord: null,
  isCameraOpen: false,
  darkMode: false,
};

const attendanceSlice = createSlice({
  name: 'attendance',
  initialState,
  reducers: {
    setAttendanceRecord: (state, action) => {
      state.attendanceRecord = action.payload;
    },
    clearAttendanceRecord: (state) => {
      state.attendanceRecord = null;
    },
    setCameraOpen: (state, action) => {
      state.isCameraOpen = action.payload;
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
});

export const { setAttendanceRecord, clearAttendanceRecord, setCameraOpen, toggleDarkMode } = attendanceSlice.actions;

export default attendanceSlice.reducer;
