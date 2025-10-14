import { Link } from "react-router-dom";
import { selectAllRestaurants, fetchRestaurants } from "./restaurantsSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { RestaurantItem } from "./RestaurantItem";
import { RestaurantItemLoading } from "./RestaurantItemLoading";

export const RestaurantsList = () => {
  const dispatch = useDispatch();
  const restaurants = useSelector(selectAllRestaurants);
  const restaurantStatus = useSelector((state) => state.restaurants.status);
  const error = useSelector((state) => state.restaurants.error);

  useEffect(() => {
    if (restaurantStatus == "idle") {
      dispatch(fetchRestaurants());
    }
  }, [restaurantStatus, dispatch]);

  if (restaurantStatus === "loading")
    return <RestaurantItemLoading numOfRest={3}></RestaurantItemLoading>;
  if (restaurantStatus === "failed") return <p>{error}</p>;
  console.log(restaurants);

  const renderRestaurants = restaurants.map((restaurant) => (
    <RestaurantItem restaurant={restaurant}></RestaurantItem>
  ));

  return (
    <section>
      <div className="lg:flex lg:justify-between lg:items-center">
        <h1>Restaurants</h1>
        <div className="max-w-fit">
          <Link className="btnPrimary" to="/addrestaurants">
            Add restaurant
          </Link>
        </div>
      </div>
      <div className="container flex flex-wrap mx-auto gap-4 mt-5">
        {renderRestaurants}
      </div>
    </section>
  );
};
