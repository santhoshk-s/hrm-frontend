import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { BASE_URL } from "../../constant";
import api from "../../api";
const BASE_URL = import.meta.env.VITE_BASE_URL



//  leave  data
export const leavelist = createAsyncThunk(
    "leave/leavelist",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get(
                `${BASE_URL}/leave/all`

            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// leave apply

export const leaveapply = createAsyncThunk(
    "leave/leaveapply",
    async ({ reason,dates }, { rejectWithValue }) => {
        try {
            const response = await api.post(
                `${BASE_URL}/leave/apply`, { reason,dates }

            );
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// leave approve


export const leaveapprove = createAsyncThunk(
    "leave/leaveapprove",
    async ({ id, managerComments, hrComments }, { rejectWithValue }) => {
        try {
            const response = await api.put(
                `${BASE_URL}/leave/approve/${id}`, { managerComments, hrComments }

            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// leave rejected

export const leaverejected = createAsyncThunk(
    "leave/leaverejected",
    async ({ id, managerComments, hrComments }, { rejectWithValue }) => {
        try {
            const response = await api.put(
                `${BASE_URL}/leave/reject/${id}`, { managerComments, hrComments }

            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// leave pending

export const leavepending = createAsyncThunk(
    "leave/leavepending",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get(
                `${BASE_URL}/leave/pending`

            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// hr 
export const getForHrLeave = createAsyncThunk(
    "leave/getForHrLeave",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get(
                `${BASE_URL}/leave/hr`

            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

//get all

export const getAllLeaves = createAsyncThunk(
    "leave/getAllLeaves",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get(
                `${BASE_URL}/leave/all`

            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

//get one 

export const getOneLeave = createAsyncThunk(
    "leave/getOneLeave",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get(
                `${BASE_URL}/leave/one`

            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);


// leave delete

export const leaveDelete = createAsyncThunk(
    "leave/leaveDelete",
    async ({id} ,{ rejectWithValue }) => {
        try {
            const response = await api.delete(
                `${BASE_URL}/leave/delete/${id}`

            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// leaveSlice

const leaveSlice = createSlice({
    name: "leave",
    initialState: {
        data: null,
        loading: false,
        error: null,
        leavelist: { data: null, loading: false, error: null },
        leaveapply: { data: null, loading: false, error: null },
        leaveapprove: { data: null, loading: false, error: null },
        leaverejected: { data: null, loading: false, error: null },
        leavepending: { data: null, loading: false, error: null },
        getForHrLeave: { data: null, loading: false, error: null },
        getAllLeaves: { data: null, loading: false, error: null },
        getOneLeave: { data: null, loading: false, error: null },
        leaveDelete: { data: null, loading: false, error: null },
    },
    reducers: {},
    extraReducers: (builder) => {
        builder

            // leave  list
            .addCase(leavelist.pending, (state) => {
                state.leavelist.loading = true;
                state.leavelist.error = null;
            })
            .addCase(leavelist.fulfilled, (state, action) => {
                state.leavelist.loading = false;
                state.leavelist.data = action.payload.data;
            })
            .addCase(leavelist.rejected, (state, action) => {
                state.leavelist.loading = false;
                state.leavelist.error = action.payload;
            })

            // leave apply

            .addCase(leaveapply.pending, (state) => {
                state.leaveapply.loading = true;
                state.leaveapply.error = null;
            })
            .addCase(leaveapply.fulfilled, (state, action) => {
                state.leaveapply.loading = false;
                state.leaveapply.data = action.payload.data;
            })
            .addCase(leaveapply.rejected, (state, action) => {
                state.leaveapply.loading = false;
                state.leaveapply.error = action.payload;
            })

            // leaveapprove

            .addCase(leaveapprove.pending, (state) => {
                state.leaveapprove.loading = true;
                state.leaveapprove.error = null;
            })
            .addCase(leaveapprove.fulfilled, (state, action) => {
                state.leaveapprove.loading = false;
                state.leaveapprove.data = action.payload.data;
            })
            .addCase(leaveapprove.rejected, (state, action) => {
                state.leaveapprove.loading = false;
                state.leaveapprove.error = action.payload;
            })

            //leaverejected
            .addCase(leaverejected.pending, (state) => {
                state.leaverejected.loading = true;
                state.leaverejected.error = null;
            })
            .addCase(leaverejected.fulfilled, (state, action) => {
                state.leaverejected.loading = false;
                state.leaverejected.data = action.payload.data;
            })
            .addCase(leaverejected.rejected, (state, action) => {
                state.leaverejected.loading = false;
                state.leaverejected.error = action.payload;
            })

            // leavepending

            .addCase(leavepending.pending, (state) => {
                state.leavepending.loading = true;
                state.leavepending.error = null;
            })
            .addCase(leavepending.fulfilled, (state, action) => {
                state.leavepending.loading = false;
                state.leavepending.data = action.payload.data;
            })
            .addCase(leavepending.rejected, (state, action) => {
                state.leavepending.loading = false;
                state.leavepending.error = action.payload;
            })

            //hr
            .addCase(getForHrLeave.pending, (state) => {
                state.getForHrLeave.loading = true;
                state.getForHrLeave.error = null;
            })
            .addCase(getForHrLeave.fulfilled, (state, action) => {
                state.getForHrLeave.loading = false;
                state.getForHrLeave.data = action.payload.data;
            })
            .addCase(getForHrLeave.rejected, (state, action) => {
                state.getForHrLeave.loading = false;
                state.getForHrLeave.error = action.payload;
            })

            //get all leave

            .addCase(getAllLeaves.pending, (state) => {
                state.getAllLeaves.loading = true;
                state.getAllLeaves.error = null;
            })
            .addCase(getAllLeaves.fulfilled, (state, action) => {
                state.getAllLeaves.loading = false;
                state.getAllLeaves.data = action.payload.data;
            })
            .addCase(getAllLeaves.rejected, (state, action) => {
                state.getAllLeaves.loading = false;
                state.getAllLeaves.error = action.payload;
            })

            //getone leave

            .addCase(getOneLeave.pending, (state) => {
                state.getOneLeave.loading = true;
                state.getOneLeave.error = null;
            })
            .addCase(getOneLeave.fulfilled, (state, action) => {
                state.getOneLeave.loading = false;
                state.getOneLeave.data = action.payload.data;
            })
            .addCase(getOneLeave.rejected, (state, action) => {
                state.getOneLeave.loading = false;
                state.getOneLeave.error = action.payload;
            })

            // leave delete
            .addCase(leaveDelete.pending, (state) => {
                state.leaveDelete.loading = true;
                state.leaveDelete.error = null;
            })
            .addCase(leaveDelete.fulfilled, (state, action) => {
                state.leaveDelete.loading = false;
                state.leaveDelete.data = action.payload.data;
            })
            .addCase(leaveDelete.rejected, (state, action) => {
                state.leaveDelete.loading = false;
                state.leaveDelete.error = action.payload;
            })

    },
});

export default leaveSlice.reducer;
