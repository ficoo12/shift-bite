import { Link } from "react-router-dom";
import { selectAllRestaurants, fetchRestaurants } from "./restaurantsSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import restaurantImg from "../../assets/restaurantImg.jpg";

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

  if (restaurantStatus === "loading") return <p>Loading...</p>;
  if (restaurantStatus === "failed") return <p>{error}</p>;
  console.log(restaurants);

  const renderRestaurants = restaurants.map((restaurant) => (
    <div key={restaurant._id} className="card w-80 overflow-hidden">
      <div className="px-3 py-3 space-y-2">
        <img className="rounded-md" src={restaurantImg}></img>
        <h2>{restaurant.name}</h2>
        <p>location: {restaurant.location}</p>
        <Link to={`/restaurants/${restaurant._id}`}>
          <button className="btnManageState">manage schedule</button>
        </Link>
      </div>
    </div>
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
