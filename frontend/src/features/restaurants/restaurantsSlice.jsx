import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: 1,
    name: "Burger Hub",
    location: "Berlin, Germany",
    imageURL:
      "https://plus.unsplash.com/premium_photo-1661883237884-263e8de8869b?q=80&w=2089&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    name: "Burger Hub House",
    location: "Stuttgart, Germany",
    imageURL:
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    name: "Burger Hub House 2",
    location: "Esslingen, Germany",
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
  },
});
export const { restauranAdded } = restaurantsSlice.actions;
export default restaurantsSlice.reducer;
