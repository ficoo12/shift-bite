import { useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";

export const SingleRestaurantPage = () => {
  const { id } = useParams();

  const restaurant = useAppSelector((state) =>
    state.restaurants.find((restaurant) => restaurant.id === Number(id))
  );

  return (
    <div>
      <h1>{restaurant.name}</h1>
    </div>
  );
};
