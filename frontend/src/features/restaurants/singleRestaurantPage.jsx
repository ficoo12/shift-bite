import { Link, useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { selectSingleRestaurant } from "./restaurantsSlice";

export const SingleRestaurantPage = () => {
  const { id } = useParams();

  const restaurant = useAppSelector((state) =>
    selectSingleRestaurant(state, id)
  );

  return (
    <div className="flex items-center gap-2">
      <Link to="/restaurants" className="flex">
        <ArrowLeftIcon></ArrowLeftIcon>
        <p>Go back</p>
      </Link>

      <h1>{restaurant.name}</h1>
      <Link to={`/editRestaurant/${restaurant.id}`}>Edit restaurant info</Link>
    </div>
  );
};
