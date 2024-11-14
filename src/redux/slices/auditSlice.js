import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../constant";
import api from "../../api";


export const getAllLogs = createAsyncThunk(
    "audit/getAllLogs",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get(
                `${BASE_URL}/auditlogs/all`

            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// audit slice

const auditSlice = createSlice({
    name: "audit",
    initialState: {
        data: null,
        loading: false,
        error: null,
        getAllLogs: { data: null, loading: false, error: null },
    },
    reducers: {},
    extraReducers: (builder) => {
        builder

            // get all logs

            .addCase(getAllLogs.pending, (state) => {
                state.getAllLogs.loading = true;
                state.getAllLogs.error = null;
            })
            .addCase(getAllLogs.fulfilled, (state, action) => {
                state.getAllLogs.loading = false;
                state.getAllLogs.data = action.payload.data;
            })
            .addCase(getAllLogs.rejected, (state, action) => {
                state.getAllLogs.loading = false;
                state.getAllLogs.error = action.payload;
            })

    },
});

export default auditSlice.reducer;

