import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import client from "../../api/client";
import { redirect } from "react-router-dom";
const initialState = {
  user: null,
  logedIn: false,
  loading: false,
  error: null,
};

export async function checkAuth() {
  try {
    const response = await client.get("/check-auth");
    const user = response.data.user;
    if (!user) {
      throw redirect("/login");
    }
    return user;
  } catch (error) {
    console.error(error);
    throw redirect("/login");
  }
}

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (signupData, { rejectWithValue }) => {
    try {
      const response = await client.post("/users", signupData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "signup failed");
    }
  }
);

export const verifyEmail = createAsyncThunk(
  "/auth/verifyEmail",
  async (code, { rejectWithValue }) => {
    try {
      const response = await client.post("/verify-email", {
        code,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "verify email failed"
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await client.post("/login", credentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  await client.post("/logout");
  return true;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthState: (state) => {
      state.user = null;
      state.logedIn = false;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.logedIn = true;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.logedIn = false;
      })
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      });
  },
});

export const { resetAuthState } = authSlice.actions;
export default authSlice.reducer;
