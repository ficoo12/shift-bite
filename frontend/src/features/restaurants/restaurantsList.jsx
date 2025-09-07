import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";

export const RestaurantsList = () => {
  const restaurants = useAppSelector((state) => state.restaurants);

  const renderRestaurants = restaurants.map((restaurant) => (
    <div className="card w-80 overflow-hidden">
      <img src={restaurant.imageURL} className="h-44 w-full"></img>
      <div className="px-3 py-3 space-y-2">
        <h2>{restaurant.name}</h2>
        <p>location: {restaurant.location}</p>
        <Link to={`/restaurants/${restaurant.id}`}>
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
