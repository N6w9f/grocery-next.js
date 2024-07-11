import { APICategorySchema } from "@/types/data/categories.type";
import { createSlice } from "@reduxjs/toolkit";

const categoryReducer = createSlice({
     initialState: null as APICategorySchema | null,
     name: "categoryReducer",
     reducers: {
          setCategory: (state, action) => {
               const data = action.payload
               return action.payload
          },
     }
})


export const { setCategory } = categoryReducer.actions;
export default categoryReducer.reducer
