import { configureStore } from "@reduxjs/toolkit";

// Reducers
import userReducer from "./reducers/user.reducer";
import cartReducer from "./reducers/cart.reducer";
import categoryReducer from "./reducers/category.reducer";

const store = configureStore({
     reducer: {
          user: userReducer,
          cart: cartReducer,
          category: categoryReducer,
     }
})


type AppDispatch = typeof store.dispatch;
type RootState = ReturnType<typeof store.getState>;

export type { AppDispatch, RootState }
export default store;