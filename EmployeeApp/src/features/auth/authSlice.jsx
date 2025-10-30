import { redirect } from "react-router-dom";
import client from "../../api/client";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  employee: null,
  logedIn: false,
  loading: false,
  error: null,
};
export async function checkAuth() {
  try {
    const response = await client.get("/check-employee-auth");
    const employee = response.data.employee;
    if (!employee) {
      return redirect("/login");
    }
    return employee;
  } catch (error) {
    console.error("checkAuth error:", error);
    return redirect("/login");
  }
}

export const loginEmployee = createAsyncThunk(
  "auth/loginEmployee",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await client.post("/employeelogin", credentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "login failed");
    }
  }
);

export const logoutEmployee = createAsyncThunk(
  "auth/logoutEmployee",
  async () => {
    await client.post("/employeelogout");
    return true;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthState: (state) => {
      state.employee = null;
      state.logedIn = false;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.logedIn = true;
        state.employee = action.payload.employee;
      })
      .addCase(loginEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logoutEmployee.fulfilled, (state) => {
        state.employee = null;
        state.logedIn = false;
      });
  },
});
export const { resetAuthState } = authSlice.actions;
export default authSlice.reducer;
