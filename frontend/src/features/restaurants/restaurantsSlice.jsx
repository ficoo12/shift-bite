import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import client from "../../api/client";

export const fetchRestaurants = createAsyncThunk(
  "restaurants/fetchRestaurants",
  async (_, { rejectWithValue }) => {
    try {
      const response = await client.get("/restaurants");
      return response.data;
    } catch (err) {
      if (err.response) {
        return rejectWithValue(err.response.data.message || "Forbidden");
      }
      return rejectWithValue(err.message);
    }
  }
);

export const createRestaurant = createAsyncThunk(
  "restaurants/addRestaurant",
  async (data) => {
    try {
      const response = await client.post("/restaurants", data);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  }
);

const initialState = {
  restaurants: [],
  status: "idle",
  error: null,
};

const restaurantsSlice = createSlice({
  name: "restaurants",
  initialState,
  reducers: {
    restauranAdded(state, action) {
      state.restaurants.push(action.payload);
    },
    restaurantUpdated(state, action) {
      const { id, name, location, phone } = action.payload;
      const existingRestaurant = state.restaurants.find(
        (restaurant) => restaurant._id === id
      );
      if (existingRestaurant) {
        existingRestaurant.name = name;
        existingRestaurant.location = location;
        existingRestaurant.phone = phone;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRestaurants.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRestaurants.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.restaurants = action.payload;
      })
      .addCase(fetchRestaurants.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});
export const { restauranAdded, restaurantUpdated } = restaurantsSlice.actions;
export default restaurantsSlice.reducer;

export const selectAllRestaurants = (state) => state.restaurants.restaurants;
export const selectSingleRestaurant = (state, restaurantId) =>
  state.restaurants.restaurants.find(
    (restaurant) => restaurant._id === restaurantId
  );
