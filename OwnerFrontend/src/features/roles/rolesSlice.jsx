import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import client from "../../api/client";

export const fetchRoles = createAsyncThunk(
  "roles/fetchRoles",
  async (_, { rejectWithValue }) => {
    try {
      const response = await client.get("/roles");
      return response.data;
    } catch (err) {
      // Return a rejected value with error message
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const createRole = createAsyncThunk("roles/addRole", async (data) => {
  try {
    const response = await client.post("/roles", data);
    return response.data;
  } catch (err) {
    console.error(err);
  }
});

const initialState = {
  roles: [],
  status: "idle",
  error: null,
};

const rolesSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {
    roleAdded(state, action) {
      state.roles.push(action.payload);
    },
    resetRoleStatus(state) {
      state.status = "idle";
    },
  },
  //zašto builder, pitaj cheta da ti objasni
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoles.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.roles = action.payload;
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export const { roleAdded, resetRoleStatus } = rolesSlice.actions;
export default rolesSlice.reducer;

export const selectAllRoles = (state) => state.roles.roles;
