import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api";


const BASE_URL = import.meta.env.VITE_BASE_URL
// add arrival
export const addArrival = createAsyncThunk(
    "attendance/addArrival",
    async ({ formData }, { rejectWithValue }) => {
        try {
            const response = await api.post(
                `${BASE_URL}/attendance/add_arrival`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }

            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// update departure

export const updateDeparture = createAsyncThunk(
    "attendance/updateDeparture",
    async ({ userRemark }, { rejectWithValue }) => {
        try {
            const response = await api.post(
                `${BASE_URL}/attendance/update_arrival`, userRemark
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// get attendance image url
export const getAttendanceImageUrl = (imageId) => {
    return `${BASE_URL}/attendance/image/${imageId}`
}

// get today one user attendance

export const getTodayOneUserAttendance = createAsyncThunk(
    "attendance/getTodayOneUserAttendance",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get(
                `${BASE_URL}/attendance/today`
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);


// get all attendance

export const getAllAttendance = createAsyncThunk(
    "attendance/getAllAttendance",
    async ({id,approve,adminResponse}, { rejectWithValue }) => {
        try {
            const response = await api.put(
                `${BASE_URL}/attendance/approve/${id}`,{approve,adminResponse}
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

 /// approve early departure

 export const approveEarlyDeparture = createAsyncThunk(
    "attendance/approveEarlyDeparture",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get(
                `${BASE_URL}/attendance/all`
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// attendanceSlice

const attendanceSlice = createSlice({
    name: "attendanece",
    initialState: {
        data: null,
        loading: false,
        error: null,
        addArrival: { data: null, loading: false, error: null },
        updateDeparture: { data: null, loading: false, error: null },
        getTodayOneUserAttendance: { data: null, loading: false, error: null },
        getAllAttendance: { data: null, loading: false, error: null },
        approveEarlyDeparture: { data: null, loading: false, error: null },
    },
    reducers: {},
    extraReducers: (builder) => {
        builder

            // add arrival

            .addCase(addArrival.pending, (state) => {
                state.addArrival.loading = true;
                state.addArrival.error = null;
            })
            .addCase(addArrival.fulfilled, (state, action) => {
                state.addArrival.loading = false;
                state.addArrival.data = action.payload.data;
            })
            .addCase(addArrival.rejected, (state, action) => {
                state.addArrival.loading = false;
                state.addArrival.error = action.payload;
            })

            // updateDeparture

            .addCase(updateDeparture.pending, (state) => {
                state.updateDeparture.loading = true;
                state.updateDeparture.error = null;
            })
            .addCase(updateDeparture.fulfilled, (state, action) => {
                state.updateDeparture.loading = false;
                state.updateDeparture.data = action.payload.data;
            })
            .addCase(updateDeparture.rejected, (state, action) => {
                state.updateDeparture.loading = false;
                state.updateDeparture.error = action.payload;
            })
            //getTodayOneUserAttendance

            .addCase(getTodayOneUserAttendance.pending, (state) => {
                state.getTodayOneUserAttendance.loading = true;
                state.getTodayOneUserAttendance.error = null;
            })
            .addCase(getTodayOneUserAttendance.fulfilled, (state, action) => {
                state.getTodayOneUserAttendance.loading = false;
                state.getTodayOneUserAttendance.data = action.payload.data;
            })
            .addCase(getTodayOneUserAttendance.rejected, (state, action) => {
                state.getTodayOneUserAttendance.loading = false;
                state.getTodayOneUserAttendance.error = action.payload;
            })

            //getAllAttendance


            .addCase(getAllAttendance.pending, (state) => {
                state.getAllAttendance.loading = true;
                state.getAllAttendance.error = null;
            })
            .addCase(getAllAttendance.fulfilled, (state, action) => {
                state.getAllAttendance.loading = false;
                state.getAllAttendance.data = action.payload.data;
            })
            .addCase(getAllAttendance.rejected, (state, action) => {
                state.getAllAttendance.loading = false;
                state.getAllAttendance.error = action.payload;
            })

            //approveEarlyDeparture

            
            .addCase(approveEarlyDeparture.pending, (state) => {
                state.approveEarlyDeparture.loading = true;
                state.approveEarlyDeparture.error = null;
            })
            .addCase(approveEarlyDeparture.fulfilled, (state, action) => {
                state.approveEarlyDeparture.loading = false;
                state.approveEarlyDeparture.data = action.payload.data;
            })
            .addCase(approveEarlyDeparture.rejected, (state, action) => {
                state.approveEarlyDeparture.loading = false;
                state.approveEarlyDeparture.error = action.payload;
            })
    },
});

export default attendanceSlice.reducer;

