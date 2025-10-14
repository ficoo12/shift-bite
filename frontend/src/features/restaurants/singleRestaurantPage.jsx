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
      <div className="flex items-center gap-2 justify-between py-4">
        <div className="flex gap-4">
          <Link
            to="/restaurants"
            className="flex bg-white px-4 w-40 items-center gap-4 rounded-sm border border-lightGray hover:bg-lightGray hover:cursor-pointer transition-all duration-200 ease-in"
          >
            <ArrowLeftIcon className="w-5 "></ArrowLeftIcon>
            <p>Go back</p>
          </Link>

          <h1>
            {restaurant.name.charAt(0).toUpperCase()}
            {restaurant.name.slice(1)}
          </h1>
        </div>

        <Link
          className="btnPrimary max-w-fit"
          to={`/editRestaurant/${restaurant._id}`}
        >
          Edit restaurant info
        </Link>
      </div>
      <Schedule id={id}></Schedule>
    </>
  );
};
