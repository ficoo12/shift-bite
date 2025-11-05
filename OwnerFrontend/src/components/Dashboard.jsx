import { AddFirstRestaurant } from "../features/restaurants/addFirstRestaurant";
import restaurantImg from "../assets/restaurantImg.jpg";
import { useSelector } from "react-redux";
import { selectAllRestaurants } from "../features/restaurants/restaurantsSlice";

import { Link } from "react-router-dom";

const Dashboard = () => {
  const restaurants = useSelector(selectAllRestaurants);

  const renderRestaurants = restaurants.map((restaurant) => (
    <div key={restaurant._id} className="px-3 py-3 space-y-2 max-w-80 card">
      <img className="rounded-md" src={restaurantImg}></img>
      <h2>
        {restaurant.name.charAt(0).toUpperCase()}
        {restaurant.name.slice(1).toLowerCase()}
      </h2>
      <p>
        Location: {restaurant.location.charAt(0).toUpperCase()}
        {restaurant.location.slice(1)}
      </p>
      <div className="flex gap-2">
        <Link to={`/restaurants/${restaurant._id}`}>
          <button className="btnManageState">Manage Schedule</button>
        </Link>
      </div>
    </div>
  ));

  return (
    <>
      {renderRestaurants.length === 0 ? (
        <div>
          <h1>Let's get you started</h1>
          <div className="mt-5">
            <AddFirstRestaurant></AddFirstRestaurant>
          </div>
        </div>
      ) : (
        <div className="space-y-4 lg:flex lg:space-y-0 gap-4">
          {renderRestaurants}
        </div>
      )}
    </>
  );
};

export default Dashboard;
