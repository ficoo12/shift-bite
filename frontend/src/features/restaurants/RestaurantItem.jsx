import restaurantImg from "../../assets/restaurantImg.jpg";
import { Link } from "react-router-dom";
export const RestaurantItem = ({ restaurant }) => {
  return (
    <section>
      <div key={restaurant._id} className="card w-80 overflow-hidden">
        <div className="px-3 py-3 space-y-2">
          <img className="rounded-md" src={restaurantImg}></img>
          <h2>
            {restaurant.name.charAt(0).toUpperCase()}
            {restaurant.name.slice(1).toLowerCase()}
          </h2>
          <p>location: {restaurant.location}</p>
          <Link to={`/restaurants/${restaurant._id}`}>
            <button className="btnManageState">manage schedule</button>
          </Link>
        </div>
      </div>
    </section>
  );
};
