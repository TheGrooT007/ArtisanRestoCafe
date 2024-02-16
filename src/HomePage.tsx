import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, updateItemCount } from "./restodata";
import { AppDispatch, RootState } from "../store";

interface Item {
  id: string;
  name: string;
  price: string;
  description: string;
  calories: number;
  image: string;
  customizationAvailable: boolean;
}

// Adjust interface if needed based on your actual data structure
interface Dish {
  dish_id: string;
  dish_name: string;
  dish_description: string;
  dish_price: number;
  dish_image: string;
  dish_currency: string;
  dish_calories: number;
  dish_Type: number;
  addonCat: any[]; // Consider defining a more specific type
}

const HomePage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [dishCounts, setDishCounts] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const items = useSelector((state) => state.data.items);

  const activeCategoryDishes = useSelector((state: RootState) => state.data.activeCategoryDishes) || [];

  const handleIncrement = (dish_id: string) => {
    const newCount = (dishCounts[dish_id] || 0) + 1;
    setDishCounts({ ...dishCounts, [dish_id]: newCount });
    // Dispatch with TypeScript enforcement
    dispatch(updateItemCount({ dish_id, count: newCount }));
  };

  const handleDecrement = (dish_id: string) => {
    const currentCount = dishCounts[dish_id] || 0;
    if (currentCount > 0) {
      const newCount = currentCount - 1;
      setDishCounts({ ...dishCounts, [dish_id]: newCount });
      dispatch(updateItemCount({ dish_id, count: newCount }));
    }
  };

  return (
    <div>
      {activeCategoryDishes.map((dish: Dish) => (
        <div key={dish.id} className="flex justify-between w-[90%] m-auto py-5 border-b border-[#b2beb5] relative">
          <div className="phone:min-w-[50%]">
            <div className="flex gap-4 items-center">
              <div className="w-4">
                <img
                  className="block w-full"
                  src={
                    dish.dish_Type === 1
                      ? "https://foodsafetyhelpline.com/wp-content/uploads/2013/05/non-veg-300x259.jpg"
                      : "https://foodsafetyhelpline.com/wp-content/uploads/2013/05/veg-300x259.jpg"
                  }
                  alt="icon"
                />
              </div>

              <span className="phone:text-[12px] phone:whitespace-nowrap">{dish.dish_name}</span>
            </div>
            <p className="phone:text-[12px] phone:mt-2">
              {dish.dish_currency} {dish.dish_price}
            </p>
            <small className="block text-[#b2beb5] phone:max-w-[50%] phone:mt-6 tablet:max-w-[70%] sm:text-[14px] sm:max-w-[80%] md:text-[16px]">
              {dish.dish_description}
            </small>

            <div className="flex gap-2 bg-green-600 w-fit rounded-2xl my-5">
              {/* Interactive buttons for quantity, assuming a state or method to handle these */}
              <button onClick={() => handleDecrement(dish.dish_id)} className="w-6 block text-right text-[15px] cursor-pointer">
                -
              </button>
              <span className="w-5 text-center flex justify-center text-[14px]">{dishCounts[dish.dish_id] || 0}</span>
              <button onClick={() => handleIncrement(dish.dish_id)} className="w-6 text-left text-[15px] cursor-pointer">
                +
              </button>
            </div>

            {dish.addonCat && dish.addonCat.length > 0 && (
              <span className="text-sm text-red-600 phone:whitespace-nowrap">Customization Available</span>
            )}
          </div>
          <div className="flex phone:absolute phone:right-0 md:relative">
            <span className="text-sm h-fit w-20 mt-10 mr-4 phone:text-[12px] phone:mr-1 md:text-[14px]">
              {dish.dish_calories} Calories
            </span>
            <img
              className="rounded-md phone:w-[100px] block phone:h-[100px] tablet:w-[120px] tablet:h-[120px] tabx1:w-[150px] tabx1:h-[150px] lg:w-[200px] lg:h-[200px]"
              src={dish.dish_image}
              alt="dish icon"
            />

            {/* Assuming an additional image or icon here if necessary */}
          </div>
        </div>
      ))}
    </div>
  );
};
export default HomePage;
