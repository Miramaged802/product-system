
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: null, // بيانات المستخدم
  isCompleted: false, // حالة إتمام الدفع
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload; // حفظ بيانات المستخدم
    },
    completeCheckout: (state) => {
      state.isCompleted = true; // علام إتمام الدفع
    },
    resetCheckout: (state) => {
      state.userData = null; // إعادة تعيين بيانات المستخدم
      state.isCompleted = false; // إعادة تعيين حالة الدفع
    },
  },
});

export const { setUserData, completeCheckout, resetCheckout } =
  checkoutSlice.actions;

export default checkoutSlice.reducer;
