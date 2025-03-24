import { Images, Price, UnitPrice } from "@/app/lib/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItemState {
  name: string;
  id: string;
  subtitle: string;
  price: Price;
  unitPrice: UnitPrice;
  images: Images;
  quantity: number;
}

const initialState: CartItemState[] = [];

export const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    updateCart: (state, action: PayloadAction<CartItemState[]>) => {
      return action.payload;
    },
  },
});

export const { updateCart } = cart.actions;
export default cart.reducer;