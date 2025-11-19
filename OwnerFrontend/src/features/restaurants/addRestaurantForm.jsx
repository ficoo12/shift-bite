import React, { useState } from "react";
import { createRestaurant, resetRestaurantStatus } from "./restaurantsSlice";
import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

export const AddRestaurantForm = () => {
  const [addRequestStatus, setAddRequestStatus] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const name = form.restaurantName.value;
    const location = form.restaurantLocation.value;
    const phone = form.restaurantPhoneNumber.value;

    const newRestaurant = {
      name,
      location,
      phone,
    };

    try {
      setAddRequestStatus("pending");
      await dispatch(createRestaurant(newRestaurant));
      dispatch(resetRestaurantStatus());
      form.reset();
      navigate("/restaurants");
    } catch (err) {
      console.error("Failed to create restaurant: ", err);
    } finally {
      setAddRequestStatus("idle");
    }
  };

  return (
    <section className="max-w-2xl">
      <h1 className="pb-5">Add new restaurant</h1>
      <form
        className="card px-5 py-5 space-y-4"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
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
          <label htmlFor="restaurantPhoneNumber">
            Restaurant phone number:
          </label>
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
