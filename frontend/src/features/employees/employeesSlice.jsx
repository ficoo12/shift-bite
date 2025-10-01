import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import client from "../../api/client";

export const fetchEmployees = createAsyncThunk(
  "employees/fetchEmployees",
  async (_, { rejectWithValue }) => {
    try {
      const response = await client.get("/employees");
      return response.data;
    } catch (err) {
      if (err.response) {
        return rejectWithValue(err.response.data.message || "Forbidden");
      }
      return rejectWithValue(err.message);
    }
  }
);

export const createEmployee = createAsyncThunk(
  "employees/addEmployee",
  async (data) => {
    try {
      const response = await client.post("/employees", data);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  }
);

const initialState = {
  employees: [],
  status: "idle",
  error: null,
};

const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    employeeAdded(state, action) {
      state.employees.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export const { employeeAdded } = employeesSlice.actions;
export default employeesSlice.reducer;
export const selectAllEmployees = (state) => state.employees.employees;
