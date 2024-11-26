import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { BASE_URL } from "../../constant";
import api from "../../api";
const BASE_URL = import.meta.env.VITE_BASE_URL
import { notification } from "antd";



export const getAllQuery = createAsyncThunk(
    "query/getAllQuery",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get(
                `${BASE_URL}/query/all`
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// get one query 

export const getOneQuery = createAsyncThunk(
    "query/getOneQuery",
    async ({ id }, { rejectWithValue }) => {
        try {
            const response = await api.get(
                `${BASE_URL}/query/one/${id}`
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// add query

export const addQuery = createAsyncThunk(
    "query/addQuery",
    async (queryData, { rejectWithValue }) => {
      try {
        const response = await api.post(`${BASE_URL}/query/new`, queryData);
        notification.success({
            message: "Success",
            description: response.data.message ,
          });
        return response.data;
      } catch (error) {
        console.error("Add Query Error:", error.response?.data || error.message);
        notification.error({
            message: "Error",
            description: errorMessage,
          });
        return rejectWithValue(
          error.response?.data || { message: "Unexpected error occurred" }
        );
      }
    }
  );
  

// getpending query 


export const getPendingQuery = createAsyncThunk(
    "query/getPendingQuery",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get(
                `${BASE_URL}/query/pending`
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

//query Response
export const queryResponse = createAsyncThunk(
    "query/queryResponse",
    async ({ id, response }, { rejectWithValue }) => {
        try {
            const res = await api.put(
                `${BASE_URL}/query/response/${id}`, response
            );
            return res.data;
        } catch (error) {
            return rejectWithValue(error.res.data);
        }
    }
);


// query slice

const querySlice = createSlice({
    name: "query",
    initialState: {
        data: null,
        loading: false,
        error: null,
        getAllQuery: { data: null, loading: false, error: null },
        getOneQuery: { data: null, loading: false, error: null },
        addQuery: { data: null, loading: false, error: null },
        getPendingQuery: { data: null, loading: false, error: null },
        queryResponse: { data: null, loading: false, error: null },

    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // leave  list
            .addCase(getAllQuery.pending, (state) => {
                state.getAllQuery.loading = true;
                state.getAllQuery.error = null;
            })
            .addCase(getAllQuery.fulfilled, (state, action) => {
                state.getAllQuery.loading = false;
                state.getAllQuery.data = action.payload.data;
            })
            .addCase(getAllQuery.rejected, (state, action) => {
                state.getAllQuery.loading = false;
                state.getAllQuery.error = action.payload;
            })
            // getonequery


            .addCase(getOneQuery.pending, (state) => {
                state.getOneQuery.loading = true;
                state.getOneQuery.error = null;
            })
            .addCase(getOneQuery.fulfilled, (state, action) => {
                state.getOneQuery.loading = false;
                state.getOneQuery.data = action.payload.data;
            })
            .addCase(getOneQuery.rejected, (state, action) => {
                state.getOneQuery.loading = false;
                state.getOneQuery.error = action.payload;
            })

            // addquery

            .addCase(addQuery.pending, (state) => {
                state.addQuery.loading = true;
                state.addQuery.error = null;
            })
            .addCase(addQuery.fulfilled, (state, action) => {
                state.addQuery.loading = false;
                state.addQuery.data = action.payload.data;
            })
            .addCase(addQuery.rejected, (state, action) => {
                state.addQuery.loading = false;
                state.addQuery.error = action.payload;
            })


            // getPendingQuery
            .addCase(getPendingQuery.pending, (state) => {
                state.getPendingQuery.loading = true;
                state.getPendingQuery.error = null;
            })
            .addCase(getPendingQuery.fulfilled, (state, action) => {
                state.getPendingQuery.loading = false;
                state.getPendingQuery.data = action.payload.data;
            })
            .addCase(getPendingQuery.rejected, (state, action) => {
                state.getPendingQuery.loading = false;
                state.getPendingQuery.error = action.payload;
            })

            //queryResponse

            .addCase(queryResponse.pending, (state) => {
                state.queryResponse.loading = true;
                state.queryResponse.error = null;
            })
            .addCase(queryResponse.fulfilled, (state, action) => {
                state.queryResponse.loading = false;
                state.queryResponse.data = action.payload.data;
            })
            .addCase(queryResponse.rejected, (state, action) => {
                state.queryResponse.loading = false;
                state.queryResponse.error = action.payload;
            })
    }


});

export default querySlice.reducer;
