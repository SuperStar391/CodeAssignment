import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const base_url = "http://localhost:3001/api";
const addTransactionSlice = createSlice({
  name: "Add Transaction",
  initialState: {
    error: null,
    loader: false,
    message: null,
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
    builder.addCase(addTransactionAction.pending, (state, action) => {
      state.loader = true;
    });
    builder.addCase(addTransactionAction.fulfilled, (state, action) => {
      state.loader = false;
      state.message = action.payload.message;
    });
    builder.addCase(addTransactionAction.rejected, (state, action) => {
      state.loader = false;
      state.error = action.payload;
    });
  },
});

export const { clearError, clearMessage } = addTransactionSlice.actions;
export default addTransactionSlice.reducer;

export const addTransactionAction = createAsyncThunk(
  "transaction/add",
  async (formData, { rejectWithValue }) => {
    const config = { headers: { "Content-Type": "application/json" } };
    try {
      const res = await axios.post(base_url + "/add", formData, config);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);
