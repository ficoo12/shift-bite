import React from "react";
import { createRestaurant } from "./restaurantsSlice";
import { useDispatch } from "react-redux";

export const AddRestaurantForm = () => {
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
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

    dispatch(createRestaurant(newRestaurant));
    form.reset();
  };

  return (
    <section className="max-w-2xl">
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
