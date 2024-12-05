import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { API_Query } from "./API_Query/APIQuery";
import AuthSlice from "./API_Slices/AuthSlice";
import productReducer from "./API_Slices/productSlice";

import commonSlice from "./API_Slices/commonSlice";
import userSlice from "./API_Slices/userSlice";

export const store = configureStore({
  reducer: {
    userSlice: AuthSlice,
    commonSlice: commonSlice,
    userSlice: userSlice,
    products: productReducer,
    [API_Query.reducerPath]: API_Query.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(API_Query.middleware),
  serializableCheck: false,
});
setupListeners(store.dispatch);
