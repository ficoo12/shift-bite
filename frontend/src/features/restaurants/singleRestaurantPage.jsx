import { Link, useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

export const SingleRestaurantPage = () => {
  const { id } = useParams();
  console.log(Number(id));

  const restaurant = useAppSelector((state) =>
    state.restaurants.find((restaurant) => restaurant.id === Number(id))
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
