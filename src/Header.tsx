import { FC, useEffect, useState } from "react";
import { FaCartArrowDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, setActiveCategory, setActiveCategoryDishes } from "./restodata";
import { AppDispatch, RootState } from "../store";

const Header: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const items = useSelector((state: RootState) => state.data.items);
  const Countdsd = useSelector((state: RootState) => state);
  const activeCategoryDishes = useSelector((state: RootState) => state.data.activeCategoryDishes) || [];
  const activeCategory = useSelector((state: RootState) => state.data.activeCategory);
  const cartCount = useSelector((state: RootState) => state.data.cartCount);
  console.log("cartCount", cartCount > 0, cartCount);

  const [count, setCount] = useState(0); // State variable to hold the count value

  useEffect(() => {
    // Fetch data when component mounts
    dispatch(fetchData());
  }, [dispatch]);

  // Set initial active category and its dishes once the items data is available
  useEffect(() => {
    if (items?.data[0]?.table_menu_list && items.data[0].table_menu_list.length > 0) {
      const initialCategory = items.data[0].table_menu_list[0];
      dispatch(setActiveCategory(initialCategory)); // Assuming setActiveCategory expects the whole category object
      dispatch(setActiveCategoryDishes(initialCategory.category_dishes));
    }
  }, [items, dispatch]);

  // Function to handle click event on category list item
  const handleCategoryClick = (category: any) => {
    console.log(category); // Log the entire category object
    dispatch(setActiveCategory(category)); // Assuming setActiveCategory expects the whole category object
    dispatch(setActiveCategoryDishes(category.category_dishes));
  };

  return (
    <>
      <header className="sticky top-0 z-10 bg-black shadow-md flex justify-between font-extrabold text-[14px] w-[90%] m-auto py-7 phone:h-3 ">
        <div>
          <h1>Artisan Resto Cafe</h1>
        </div>
        <div className="flex gap-5">
          <span>My Orders</span>
          <div className="text-xl relative">
            <FaCartArrowDown />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-600 text-white rounded-full w-2 h-2 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>
        </div>
      </header>
      <div className="w-full ">
        <div className="sm:w-[100%] phone:py-0 phone:h-10 ">
          <ul className="flex gap-5 py-5 w-[90%] m-auto phone:overflow-auto phone:mb-10">
            {items?.data[0]?.table_menu_list?.map((item, index) => {
              const isActive = item.menu_category_id === activeCategory?.menu_category_id;
              return (
                <li
                  className={`phone:whitespace-nowrap relative cursor-pointer before:content-[''] before:w-[100%] before:h-1 before:absolute before:bottom-[-10px] ${
                    isActive
                      ? "text-red-600 before:bg-red-600" // Active category styles
                      : "hover:text-red-600 before:bg-[#ffff] hover:before:bg-red-600" // Non-active category styles
                  } ${isActive ? "" : "before:hidden hover:before:block"}`}
                  key={index}
                  onClick={() => handleCategoryClick(item)}
                >
                  {item.menu_category}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
