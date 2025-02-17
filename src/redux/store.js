
import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice";
import cartReducer from "./cartSlice";
import checkoutReducer from "./checkoutSlice";

const store = configureStore({
  reducer: {
        products: productsReducer,
        cart: cartReducer,
       checkout: checkoutReducer,
  },
});

export default store;
