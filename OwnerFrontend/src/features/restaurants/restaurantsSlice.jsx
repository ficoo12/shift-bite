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

export const deleteRestaurant = createAsyncThunk(
  "restaurants/deleteRestaurant",
  async (restaurantId, { rejectWithValue }) => {
    try {
      const response = await client.delete(`/restaurants/${restaurantId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message?.data?.message || error.message);
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
    resetRestaurantStatus(state) {
      state.status = "idle";
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
      })
      .addCase(deleteRestaurant.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteRestaurant.fulfilled, (state, action) => {
        const deletedRestaurantId = action.payload.deleteRestaurantId;
        state.restaurants = state.restaurants.filter(
          (restaurant) => restaurant._id !== deletedRestaurantId
        );
        state.status = "succeeded";
      });
  },
});
export const { restaurantUpdated, resetRestaurantStatus } =
  restaurantsSlice.actions;
export default restaurantsSlice.reducer;

export const selectAllRestaurants = (state) => state.restaurants.restaurants;
export const selectSingleRestaurant = (state, restaurantId) =>
  state.restaurants.restaurants.find(
    (restaurant) => restaurant._id === restaurantId
  );
