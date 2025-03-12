import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cart-slice";
// import toggleOpenReducer from "./features/toggle-open";
import { TypedUseSelectorHook, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    // toggleOpen: toggleOpenReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
