import { APICart } from "@/types/data/cart.type";
import { createSlice } from "@reduxjs/toolkit";

const cartReducer = createSlice({
     initialState: [] as APICart[],
     name: "cartReducer",
     reducers: {
          setCart_reducer: (state, action: { payload: APICart[], type: string }) => {
               return action.payload;
          },

          addToCart_reducer: (state, action: { payload: APICart, type: string }) => {
               return [...state, action.payload]
          },

          removeCart_reducer: () => {
               return [];
          },
          removeOneItem: (state, action) => {
               const newState = state.filter((item) => item.id !== action.payload)

               return newState;
          }
     }
});



export const { setCart_reducer, addToCart_reducer, removeCart_reducer, removeOneItem } = cartReducer.actions;
export default cartReducer.reducer