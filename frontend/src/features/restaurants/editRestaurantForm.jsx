import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { restaurantUpdated } from "./restaurantsSlice";
import { selectSingleRestaurant } from "./restaurantsSlice";
export const EditRestaurantForm = () => {
  const { id } = useParams();
  console.log(Number(id));

  const restaurant = useAppSelector((state) =>
    selectSingleRestaurant(state, Number(id))
  );

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  if (!restaurant) {
    return (
      <section>
        <p>Restaurant not found!</p>
      </section>
    );
  }

  const onSaveRestaurantClicked = (event) => {
    event.preventDefault();

    const { elements } = event.currentTarget;
    const name = elements.restaurantName.value;
    const location = elements.restaurantLocation.value;
    const phone = elements.restaurantPhoneNumber.value;

    if (name && location && phone) {
      dispatch(restaurantUpdated({ id: restaurant.id, name, location, phone }));
      navigate(`/restaurants/${restaurant.id}`);
    }
  };
  return (
    <section className="max-w-2xl ">
      <form
        className="card px-5 py-5 space-y-4"
        onSubmit={onSaveRestaurantClicked}
      >
        <div>
          <label htmlFor="restaurantName">Restaurant name:</label>
          <input
            type="text"
            id="restaurantName"
            name="restaurantName"
            required
            defaultValue={restaurant.name}
          ></input>
        </div>
        <div>
          <label htmlFor="restaurantLocation">Restaurant location:</label>
          <input
            type="text"
            id="restaurantLocation"
            name="restaurantLocation"
            required
            defaultValue={restaurant.location}
          ></input>
        </div>
        <div>
          <label htmlFor="restaurantPhoneNumber">Restaurant number:</label>
          <input
            type="text"
            id="restaurantPhoneNumber"
            name="restaurantPhoneNumber"
            defaultValue={restaurant.phone}
            required
          ></input>
        </div>
        <button className="btnPrimary">Save restaurant</button>
      </form>
    </section>
  );
};
