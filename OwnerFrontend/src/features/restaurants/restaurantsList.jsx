import { Link } from "react-router-dom";
import { selectAllRestaurants, fetchRestaurants } from "./restaurantsSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { RestaurantItem } from "./RestaurantItem";
import { RestaurantItemLoading } from "./RestaurantItemLoading";
import { ConfirmDeletion } from "./ConfirmDeletion";
import { AddFirstRestaurant } from "./addFirstRestaurant";

export const RestaurantsList = () => {
  const dispatch = useDispatch();
  const restaurants = useSelector(selectAllRestaurants);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(null);
  const restaurantStatus = useSelector((state) => state.restaurants.status);
  const error = useSelector((state) => state.restaurants.error);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    if (restaurantStatus == "idle") {
      dispatch(fetchRestaurants());
    }
  }, [restaurantStatus, dispatch]);

  if (restaurantStatus === "loading")
    return <RestaurantItemLoading numOfRest={3}></RestaurantItemLoading>;
  if (restaurantStatus === "failed") return <p>{error}</p>;

  const renderRestaurants = restaurants.map((restaurant) => (
    <RestaurantItem
      key={restaurant._id}
      restaurant={restaurant}
      setModal={() => {
        setModal(true);
        setSelectedRestaurantId(restaurant._id);
      }}
    ></RestaurantItem>
  ));

  return (
    <section>
      <div className="lg:flex lg:justify-between lg:items-center space-y-4">
        <h1>Restaurants</h1>
        <div className="max-w-fit">
          <Link className="btnPrimary" to="/addrestaurants">
            Add restaurant
          </Link>
        </div>
      </div>
      <div className="container flex flex-wrap gap-4 mt-10 lg:mt-0">
        {renderRestaurants.length === 0 ? (
          <AddFirstRestaurant></AddFirstRestaurant>
        ) : (
          renderRestaurants
        )}
      </div>
      <ConfirmDeletion
        modal={modal}
        restaurantId={selectedRestaurantId}
        close={() => setModal(false)}
      ></ConfirmDeletion>
    </section>
  );
};
