import { APIUser } from "@/types/data/auth.type";
import { createSlice } from "@reduxjs/toolkit";


const userReducer = createSlice({
     initialState: null as APIUser | null,
     name: "useReducer",
     reducers: {
          setUser: (state, action) => {
               return action.payload
          },
          removeUser: () => {
               return null
          },
     }
})


export const { setUser, removeUser } = userReducer.actions;
export default userReducer.reducer