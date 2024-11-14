import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//import axios from "axios";
import { BASE_URL } from "../../constant";
import api from "../../api";




// Thunk for logging in a data
export const addInterview = createAsyncThunk(
    "interview/addInterview",
    async ({formData}, { rejectWithValue }) => {
      try {
        const response = await api.post(
          `${BASE_URL}/interview/new`,
          formData,{headers:{"Content-Type":"multipart/form-data"}}
        );
       
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );


  export const updateInterview = createAsyncThunk(
    "interview/updateInterview",
    async ({formData,id}, { rejectWithValue }) => {
      try {
        const response = await api.post(
          `${BASE_URL}/interview/update/${id}`,
          formData
        );
       
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  export const getAllInterview = createAsyncThunk(
    "interview/getAllInterview",
    async (_,{ rejectWithValue }) => {
      try {
        const response = await api.get(
          `${BASE_URL}/interview/all`
        );
       
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  export const getoneInterview = createAsyncThunk(
    "interview/getoneInterview",
    async ({id},{ rejectWithValue }) => {
      try {
        const response = await api.get(
          `${BASE_URL}/interview/one/${id}`
        );
       
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );




  const authSlice = createSlice({
    name: "interview",
    initialState: {
      data: null,
      loading: false,
      error: null,
      addInterview: { data: null,loading: false,error: null },
      updateInterview: { data: null,loading: false,error: null },
      getoneInterview:{ data: null,loading: false,error: null },
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        // Add interviw  cases
        .addCase(addInterview.pending, (state) => {
          state.addInterview.loading = true;
          state.addInterview.error = null;
        })
        .addCase(addInterview.fulfilled, (state, action) => {
          state.addInterview.loading = false;
          state.addInterview.data = action.payload.data;
        })
        .addCase(addInterview.rejected, (state, action) => {
          state.addInterview.loading = false;
          state.addInterview.error = action.payload;
        })

        // updateInterview cases
        .addCase(updateInterview.pending, (state) => {
            state.updateInterview.loading = true;
            state.updateInterview.error = null;
          })
          .addCase(updateInterview.fulfilled, (state, action) => {
            state.updateInterview.loading = false;
            state.updateInterview.data = action.payload.data;
          })
          .addCase(updateInterview.rejected, (state, action) => {
            state.updateInterview.loading = false;
            state.updateInterview.error = action.payload;
          })


           // getAll cases  getoneInterview
        .addCase(getAllInterview.pending, (state) => {
            state.getAllInterview.loading = true;
            state.getAllInterview.error = null;
          })
          .addCase(getAllInterview.fulfilled, (state, action) => {
            state.getAllInterview.loading = false;
            state.getAllInterview.data = action.payload.data;
          })
          .addCase(getAllInterview.rejected, (state, action) => {
            state.getAllInterview.loading = false;
            state.getAllInterview.error = action.payload;
          })
 
          // getAll cases  getoneInterview
        .addCase(getoneInterview.pending, (state) => {
            state.getoneInterview.loading = true;
            state.getoneInterview.error = null;
          })
          .addCase(getoneInterview.fulfilled, (state, action) => {
            state.getoneInterview.loading = false;
            state.getoneInterview.data = action.payload.data;
          })
          .addCase(getoneInterview.rejected, (state, action) => {
            state.getoneInterview.loading = false;
            state.getoneInterview.error = action.payload;
          })
 
    },
  });
  
  // export const { logout } = authSlice.actions;
  export default authSlice.reducer;