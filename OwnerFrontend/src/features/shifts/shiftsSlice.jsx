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

export const editShift = createAsyncThunk(
  "shifts/editShift",
  async (data, { rejectWithValue }) => {
    try {
      const response = await client.put(`/shift/${data._id}`, data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const deleteShift = createAsyncThunk(
  "shifts/deleteShift",
  async (id, { rejectWithValue }) => {
    try {
      const response = await client.delete(`/shift/${id}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

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
      })
      .addCase(editShift.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editShift.fulfilled, (state, action) => {
        if (!action.payload?._id) return;
        state.status = "success";
        const index = state.shifts.findIndex(
          (shift) => shift._id === action.payload._id
        );
        if (index !== -1) state.shifts[index] === action.payload;
        state.status = "succeeded";
      })
      .addCase(deleteShift.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })
      .addCase(deleteShift.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteShift.fulfilled, (state, action) => {
        state.status = "succeeded";
        const deletedShiftId = action.payload._id;
        state.shifts.filter((shift) => shift._id !== deletedShiftId);
      });
  },
});

export const { shiftAdded, resetShiftsStatus } = shiftsSlice.actions;
export default shiftsSlice.reducer;

export const selectAllShifts = (state) => state.shifts.shifts;
export const selectSingleShift = (state, shiftId) =>
  state.shifts.shifts.find((shift) => shift._id === shiftId);
