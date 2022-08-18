import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const base_url = "http://localhost:3001/api";
const getAllTransactionSlice = createSlice({
  name: "Get All Transaction",
  initialState: {
    error: null,
    loader: false,
    data: null,
  },
  reducers: {
    clearError(state, action) {
      state.error = null;
    },
    clearMessage(state, action) {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllTransactionAction.pending, (state, action) => {
      state.loader = true;
    });
    builder.addCase(getAllTransactionAction.fulfilled, (state, action) => {
      state.loader = false;
      state.data = action.payload;
    });
    builder.addCase(getAllTransactionAction.rejected, (state, action) => {
      state.loader = false;
      state.error = action.payload;
    });
  },
});

export const { clearError, clearMessage } = getAllTransactionSlice.actions;
export default getAllTransactionSlice.reducer;

export const getAllTransactionAction = createAsyncThunk(
  "transaction/getAllTrans",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(base_url + "/get");
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);
