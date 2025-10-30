import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import client from "../../api/client";

export const fetchShifts = createAsyncThunk("shifts/fetchShifts", async () => {
  try {
    const response = await client.get("/shift");
    return response.data;
  } catch (err) {
    console.error(err);
  }
});

export const createShift = createAsyncThunk("shifts/addShift", async (data) => {
  try {
    const response = await client.post("/shift", data);
    return response.data;
  } catch (err) {
    console.error(err);
  }
});

const initialState = {
  shifts: [],
  status: "idle",
  error: null,
};

const shiftsSlice = createSlice({
  name: "shifts",
  initialState,
  reducers: {
    shiftAdded(state, action) {
      state.shifts.push(action.payload);
    },
    resetShiftsStatus(state) {
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchShifts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchShifts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.shifts = action.payload;
      })
      .addCase(fetchShifts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export const { shiftAdded, resetShiftsStatus } = shiftsSlice.actions;
export default shiftsSlice.reducer;

export const selectAllShifts = (state) => state.shifts.shifts;
