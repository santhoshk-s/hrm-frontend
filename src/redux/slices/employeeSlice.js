import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { BASE_URL } from "../../constant";
import api from "../../api";
const BASE_URL = import.meta.env.VITE_BASE_URL


//  get all user

export const getAllUser = createAsyncThunk(
    "employee/getAllUser",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get(
                `${BASE_URL}/employee/all`

            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

//get one user
export const getOneUser = createAsyncThunk(
    "employee/getOneUser",
    async ({ id }, { rejectWithValue }) => {
        try {
            const response = await api.get(
                `${BASE_URL}/employee/one/${id}`

            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

//get profile
export const getProfile = createAsyncThunk(
    "employee/getProfile",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get(
                `${BASE_URL}/employee/profile`

            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// get profile image

export const getProfileFileUrl = (fileid) => {
    return `${BASE_URL}/employee/profile/${fileid}`
}

export const profileUpdate = createAsyncThunk(
    "employee/profileUpdate",
    async ({ formDate }, { rejectWithValue }) => {
        try {
            const response = await api.put(
                `${BASE_URL}/employee/update_profile`,
                formDate,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "An error occurred");
        }
    }
);


// delete profile

export const deleteProfile = createAsyncThunk(
    "employee/deleteProfile",
    async ({ id }, { rejectWithValue }) => {
        try {
            const response = await api.delete(
                `${BASE_URL}/employee/remove/${id}`

            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// change role 
export const changeRole = createAsyncThunk(
    "employee/changeRole",
    async ({ id }, { rejectWithValue }) => {
        try {
            const response = await api.put(
                `${BASE_URL}/employee/role_change/${id}`

            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);


// employee Slice

const employeeSlice = createSlice({
    name: "employee",
    initialState: {
        data: null,
        loading: false,
        error: null,
        getAllUser: { data: null, loading: false, error: null },
        getOneUser: { data: null, loading: false, error: null },
        getProfile: { data: null, loading: false, error: null },
        profileUpdate: { data: null, loading: false, error: null },
        deleteProfile: { data: null, loading: false, error: null },
        changeRole: { data: null, loading: false, error: null },
    },
    reducers: {},
    extraReducers: (builder) => {
        builder

            // getAllUser

            .addCase(getAllUser.pending, (state) => {
                state.getAllUser.loading = true;
                state.getAllUser.error = null;
            })
            .addCase(getAllUser.fulfilled, (state, action) => {
                state.getAllUser.loading = false;
                state.getAllUser.data = action.payload.data;
            })
            .addCase(getAllUser.rejected, (state, action) => {
                state.getAllUser.loading = false;
                state.getAllUser.error = action.payload;
            })

            // get one user
            .addCase(getOneUser.pending, (state) => {
                state.getOneUser.loading = true;
                state.getOneUser.error = null;
            })
            .addCase(getOneUser.fulfilled, (state, action) => {
                state.getOneUser.loading = false;
                state.getOneUser.data = action.payload.data;
            })
            .addCase(getOneUser.rejected, (state, action) => {
                state.getOneUser.loading = false;
                state.getOneUser.error = action.payload;
            })

            //get profile

            .addCase(getProfile.pending, (state) => {
                state.getProfile.loading = true;
                state.getProfile.error = null;
            })
            .addCase(getProfile.fulfilled, (state, action) => {
                state.getProfile.loading = false;
                state.getProfile.data = action.payload.data;
            })
            .addCase(getProfile.rejected, (state, action) => {
                state.getProfile.loading = false;
                state.getProfile.error = action.payload;
            })

         

            // Profile Update
            .addCase(profileUpdate.pending, (state) => {
                state.profileUpdate.loading = true;
                state.profileUpdate.error = null;
            })
            .addCase(profileUpdate.fulfilled, (state, action) => {
                state.profileUpdate.loading = false;
                state.profileUpdate.data = action.payload.data;
            })
            .addCase(profileUpdate.rejected, (state, action) => {
                state.profileUpdate.loading = false;
                state.profileUpdate.error = action.payload || "Failed to update the profile.";
            })

            // delete profile 

            .addCase(deleteProfile.pending, (state) => {
                state.deleteProfile.loading = true;
                state.deleteProfile.error = null;
            })
            .addCase(deleteProfile.fulfilled, (state, action) => {
                state.deleteProfile.loading = false;
                state.deleteProfile.data = action.payload.data;
            })
            .addCase(deleteProfile.rejected, (state, action) => {
                state.deleteProfile.loading = false;
                state.deleteProfile.error = action.payload;
            })

            // change role 
            .addCase(changeRole.pending, (state) => {
                state.changeRole.loading = true;
                state.changeRole.error = null;
            })
            .addCase(changeRole.fulfilled, (state, action) => {
                state.changeRole.loading = false;
                state.changeRole.data = action.payload.data;
            })
            .addCase(changeRole.rejected, (state, action) => {
                state.changeRole.loading = false;
                state.changeRole.error = action.payload;
            })
    },
});

export default employeeSlice.reducer;
