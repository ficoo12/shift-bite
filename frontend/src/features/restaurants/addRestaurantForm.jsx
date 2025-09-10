import React from "react";
import { nanoid } from "@reduxjs/toolkit";
import { useAppDispatch } from "../../app/hooks";
import { restauranAdded } from "./restaurantsSlice";
export const AddRestaurantForm = () => {
  const dispatch = useAppDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const name = form.restaurantName.value;
    const location = form.restaurantLocation.value;
    const phone = form.restaurantPhoneNumber.value;

    const newRestaurant = {
      id: nanoid(),
      name,
      location,
      phone,
      imageURL:
        "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    };
    console.log(newRestaurant);

    dispatch(restauranAdded(newRestaurant));
    form.reset();
  };

  return (
    <section className="max-w-2xl ">
      <form className="card px-5 py-5 space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="restaurantName">Restaurant title:</label>
          <input
            type="text"
            id="restaurantName"
            name="restaurantName"
            required
          ></input>
        </div>
        <div>
          <label htmlFor="restaurantLocation">Restaurant location:</label>
          <input
            type="text"
            id="restaurantLocation"
            name="restaurantLocation"
            required
          ></input>
        </div>
        <div>
          <label htmlFor="restaurantPhoneNumber">Restaurant phone:</label>
          <input
            type="text"
            id="restaurantPhoneNumber"
            name="restaurantPhoneNumber"
            required
          ></input>
        </div>
        <button className="btnPrimary">Save restaurant</button>
      </form>
    </section>
  );
};
