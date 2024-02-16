import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface Dish {
  dish_id: string;
  dish_name: string;
  dish_price: number;
  dish_image: string;
  dish_currency: string;
  dish_description: string;
  dish_calories: number;
  dish_Type: number;
  dish_Availability: boolean;
  addonCat: any[];
  nexturl: string;
  count: number; // Added count property
}

interface MenuCategory {
  menu_category: string;
  menu_category_id: string;
  menu_category_image: string;
  nexturl: string;
  category_dishes: Dish[];
}

interface DataState {
  items: MenuCategory[] | null;
  activeCategory: MenuCategory | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null | undefined;
  activeCategoryDishes: Dish[] | null;
  cartCount: number; // Changed type from null | 0 to number
}

const initialState: DataState = {
  items: null,
  activeCategory: null,
  status: "idle",
  error: null,
  activeCategoryDishes: null,
  cartCount: 0, // Initialize cartCount to 0
};

interface UpdateItemCountPayload {
  dish_id: string;
  count: number;
}

export const fetchData = createAsyncThunk("data/fetchData", async () => {
  const response = await fetch("https://run.mocky.io/v3/db0018c8-5982-4d89-a54f-f51fe14d3c89");
  const data = await response.json();
  return data; // Assuming the API returns an array of data
});

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setActiveCategoryDishes(state, action: PayloadAction<Dish[]>) {
      state.activeCategoryDishes = action.payload;
    },
    setActiveCategory(state, action: PayloadAction<MenuCategory | null>) {
      state.activeCategory = action.payload;
    },
    updateItemCount(state, action: PayloadAction<UpdateItemCountPayload>) {
      const { dish_id, count } = action.payload;
      const dishToUpdate = state.activeCategoryDishes?.find((dish) => dish.dish_id === dish_id);
      if (dishToUpdate) {
        dishToUpdate.count = count; // Update the count of the specific dish

        // Calculate the total count of items in the cart
        state.cartCount = state.activeCategoryDishes.reduce((total, dish) => total + (dish.count || 0), 0);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchData.fulfilled, (state, action: PayloadAction<MenuCategory[]>) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setActiveCategoryDishes, setActiveCategory, updateItemCount } = dataSlice.actions;

export default dataSlice.reducer;
