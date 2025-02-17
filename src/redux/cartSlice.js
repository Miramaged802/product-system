// src/slices/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: JSON.parse(localStorage.getItem("cart")) || [], // استعادة السلة من localStorage
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += 1; // زيادة الكمية إذا كان المنتج موجودًا بالفعل
      } else {
        state.items.push({ ...product, quantity: 1 }); // إضافة المنتج الجديد
      }

      localStorage.setItem("cart", JSON.stringify(state.items)); // حفظ السلة في localStorage
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter((item) => item.id !== productId);
      localStorage.setItem("cart", JSON.stringify(state.items)); // تحديث localStorage
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item && quantity > 0) {
        item.quantity = quantity;
      } else if (item && quantity <= 0) {
        state.items = state.items.filter((item) => item.id !== id);
      }
      localStorage.setItem("cart", JSON.stringify(state.items)); // تحديث localStorage
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cart"); // مسح السلة من localStorage
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
