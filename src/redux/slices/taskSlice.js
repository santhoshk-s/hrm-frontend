import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";
const BASE_URL = import.meta.env.VITE_BASE_URL;

// Get all tasks
export const getAllTask = createAsyncThunk(
    "task/getAllTask",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get(`${BASE_URL}/task/all`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Get one task
export const getOneTask = createAsyncThunk(
    "task/getOneTask",
    async ({ id }, { rejectWithValue }) => {
        try {
            const response = await api.get(`${BASE_URL}/task/one/${id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Add a new task
export const addTask = createAsyncThunk(
    "task/addTask",
    async (task, { rejectWithValue }) => {
        try {
            const response = await api.post(`${BASE_URL}/task/new`, task);
            return response.data;
        } catch (error) {
            console.error("Add Task Error:", error.response?.data || error.message);
            return rejectWithValue(
                error.response?.data || { message: "Unexpected error occurred" }
            );
        }
    }
);

// Get pending tasks
export const getPendingTask = createAsyncThunk(
    "task/getPendingTask",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get(`${BASE_URL}/task/pending`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Task response
export const taskResponse = createAsyncThunk(
    "task/taskResponse",
    async ({ id, response }, { rejectWithValue }) => {
        try {
            const res = await api.put(`${BASE_URL}/task/response/${id}`, response);
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Task slice
const taskSlice = createSlice({
    name: "task",
    initialState: {
        data: null,
        loading: false,
        error: null,
        getAllTask: { data: null, loading: false, error: null },
        getOneTask: { data: null, loading: false, error: null },
        addTask: { data: null, loading: false, error: null },
        getPendingTask: { data: null, loading: false, error: null },
        taskResponse: { data: null, loading: false, error: null },
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Get all tasks
            .addCase(getAllTask.pending, (state) => {
                state.getAllTask.loading = true;
                state.getAllTask.error = null;
            })
            .addCase(getAllTask.fulfilled, (state, action) => {
                state.getAllTask.loading = false;
                state.getAllTask.data = action.payload.data;
            })
            .addCase(getAllTask.rejected, (state, action) => {
                state.getAllTask.loading = false;
                state.getAllTask.error = action.payload;
            })

            // Get one task
            .addCase(getOneTask.pending, (state) => {
                state.getOneTask.loading = true;
                state.getOneTask.error = null;
            })
            .addCase(getOneTask.fulfilled, (state, action) => {
                state.getOneTask.loading = false;
                state.getOneTask.data = action.payload.data;
            })
            .addCase(getOneTask.rejected, (state, action) => {
                state.getOneTask.loading = false;
                state.getOneTask.error = action.payload;
            })

            // Add a new task
            .addCase(addTask.pending, (state) => {
                state.addTask.loading = true;
                state.addTask.error = null;
            })
            .addCase(addTask.fulfilled, (state, action) => {
                state.addTask.loading = false;
                state.addTask.data = action.payload.data;
            })
            .addCase(addTask.rejected, (state, action) => {
                state.addTask.loading = false;
                state.addTask.error = action.payload;
            })

            // Get pending tasks
            .addCase(getPendingTask.pending, (state) => {
                state.getPendingTask.loading = true;
                state.getPendingTask.error = null;
            })
            .addCase(getPendingTask.fulfilled, (state, action) => {
                state.getPendingTask.loading = false;
                state.getPendingTask.data = action.payload.data;
            })
            .addCase(getPendingTask.rejected, (state, action) => {
                state.getPendingTask.loading = false;
                state.getPendingTask.error = action.payload;
            })

            // Task response
            .addCase(taskResponse.pending, (state) => {
                state.taskResponse.loading = true;
                state.taskResponse.error = null;
            })
            .addCase(taskResponse.fulfilled, (state, action) => {
                state.taskResponse.loading = false;
                state.taskResponse.data = action.payload.data;
            })
            .addCase(taskResponse.rejected, (state, action) => {
                state.taskResponse.loading = false;
                state.taskResponse.error = action.payload;
            });
    },
});

export default taskSlice.reducer;
