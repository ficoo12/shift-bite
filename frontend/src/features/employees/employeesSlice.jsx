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
  async (data, { rejectWithValue }) => {
    try {
      const response = await client.post("/employees", data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const deleteEmployee = createAsyncThunk(
  "employee/deleteEmployee",
  async (employeeId, { rejectWithValue }) => {
    try {
      const response = await client.delete(`/employees/${employeeId}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
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
    employeeRemoved(state, action) {
      const employeeId = action.payload;
      state.employees = state.employees.filter((employee) => {
        return employee._id !== employeeId;
      });
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
      })
      .addCase(deleteEmployee.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        const deletedEmployeeId = action.payload._id;
        state.employees = state.employees.filter(
          (employee) => employee._id !== deletedEmployeeId
        );
        state.status = "succeeded";
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export const { employeeAdded, employeeRemoved } = employeesSlice.actions;
export default employeesSlice.reducer;
export const selectAllEmployees = (state) => state.employees.employees;
