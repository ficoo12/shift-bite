import { Link, useParams } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { selectSingleRestaurant } from "./restaurantsSlice";
import Schedule from "../../components/Schedule";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import client from "../../api/client";

export const SingleRestaurantPage = () => {
  const { id } = useParams();
  console.log(id);

  const restaurant = useSelector((state) => selectSingleRestaurant(state, id));
  const restaurantStatus = useSelector((state) => state.restaurants.status);

  //neded for reloading
  const [restaurantReload, setRestaurantReload] = useState(null);

  useEffect(() => {
    if (!restaurant) {
      const fetchSingleRestaurant = async (id) => {
        const response = await client.get(`/restaurants/${id}`);
        setRestaurantReload(response.data);
        return response.data;
      };
      fetchSingleRestaurant(id);
    }
  }, []);

  const restaurantData = restaurant || restaurantReload;

  if (restaurantStatus === "loading" && !restaurantData)
    return <p>Loading...</p>;

  if (restaurantStatus === "loading") return <p>Loading...</p>;

  return (
    <>
      <div className="py-4">
        <div className="flex flex-col lg:flex-row gap-4 justify-between">
          <Link
            to="/restaurants"
            className="flex bg-white px-4 w-40 items-center gap-4 rounded-sm border border-lightGray hover:bg-lightGray hover:cursor-pointer transition-all duration-200 ease-in py-6 lg:py-0"
          >
            <ArrowLeftIcon className="w-5 "></ArrowLeftIcon>
            <p>Go back</p>
          </Link>

          <h1>
            {restaurantData?.name.charAt(0).toUpperCase()}
            {restaurantData?.name.slice(1)} - Schedule
          </h1>
        </div>
      </div>
      <Schedule id={id}></Schedule>
    </>
  );
};
