import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: 1,
    name: "Burger Hub",
    location: "Berlin, Germany",
    phone: "12345678",
    imageURL:
      "https://plus.unsplash.com/premium_photo-1661883237884-263e8de8869b?q=80&w=2089&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    name: "Burger Hub House",
    location: "Stuttgart, Germany",
    phone: "12345678",
    imageURL:
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    name: "Burger Hub House 2",
    location: "Esslingen, Germany",
    phone: "12345678",
    imageURL:
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const restaurantsSlice = createSlice({
  name: "restaurants",
  initialState,
  reducers: {
    restauranAdded(state, action) {
      state.push(action.payload);
    },
    restaurantUpdated(state, action) {
      const { id, name, location, phone } = action.payload;
      const existingRestaurant = state.find(
        (restaurant) => restaurant.id === id
      );
      if (existingRestaurant) {
        existingRestaurant.name = name;
        existingRestaurant.location = location;
        existingRestaurant.phone = phone;
      }
    },
  },
});
export const { restauranAdded, restaurantUpdated } = restaurantsSlice.actions;
export default restaurantsSlice.reducer;
