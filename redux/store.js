import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { API_Query } from "./API_Query/APIQuery";
import AuthSlice from "./API_Slices/AuthSlice";
import productReducer from "./API_Slices/productSlice";
import commonSlice from "./API_Slices/commonSlice";
import userSlice from "./API_Slices/userSlice";
import { cartSyncMiddleware } from "./cartSyncMiddleware";

// Import required redux-persist dependencies
import { persistStore, persistReducer } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import { combineReducers } from "@reduxjs/toolkit";

// SSR-safe storage: noop on server, localStorage on client
const createNoopStorage = () => ({
  getItem() { return Promise.resolve(null); },
  setItem(_key, value) { return Promise.resolve(value); },
  removeItem() { return Promise.resolve(); },
});

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

// Configure persist options
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "commonSlice", "products"], // Add reducers you want to persist
};

// Combine all reducers
const rootReducer = combineReducers({
  auth: AuthSlice,
  commonSlice: commonSlice,
  userSlice: userSlice,
  products: productReducer,
  [API_Query.reducerPath]: API_Query.reducer,
});

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store with persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }).concat(API_Query.middleware, cartSyncMiddleware),
});

// Create persistor
export const persistor = persistStore(store);

setupListeners(store.dispatch);

// import { configureStore } from "@reduxjs/toolkit";
// import { setupListeners } from "@reduxjs/toolkit/query";
// import { API_Query } from "./API_Query/APIQuery";
// import AuthSlice from "./API_Slices/AuthSlice";
// import productReducer from "./API_Slices/productSlice";

// import commonSlice from "./API_Slices/commonSlice";
// import userSlice from "./API_Slices/userSlice";

// export const store = configureStore({
//   reducer: {
//     userSlice: AuthSlice,
//     commonSlice: commonSlice,
//     userSlice: userSlice,
//     products: productReducer,
//     [API_Query.reducerPath]: API_Query.reducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(API_Query.middleware),
//   serializableCheck: false,
// });
// setupListeners(store.dispatch);
