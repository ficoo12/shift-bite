import { Link, useParams } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { selectSingleRestaurant } from "./restaurantsSlice";
import Schedule from "../../components/Schedule";
import { useSelector } from "react-redux";

export const SingleRestaurantPage = () => {
  const { id } = useParams();
  const restaurant = useSelector((state) => selectSingleRestaurant(state, id));

  if (!restaurant) return <p>Loading...</p>;

  return (
    <>
      <div className="flex items-center gap-2">
        <Link to="/restaurants" className="flex">
          <ArrowLeftIcon></ArrowLeftIcon>
          <p>Go back</p>
        </Link>

        <h1>{restaurant.name}</h1>
        <Link to={`/editRestaurant/${restaurant._id}`}>
          Edit restaurant info
        </Link>
      </div>
      <Schedule id={id}></Schedule>
    </>
  );
};
