import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { persistStore, persistReducer } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

import { API_Query } from "./API_Query/APIQuery";
import AuthSlice from "./API_Slices/AuthSlice";
import productReducer from "./API_Slices/productSlice";
import uiReducer from "./API_Slices/uiSlice";
import userSlice from "./API_Slices/userSlice";
import { cartSyncMiddleware } from "./cartSyncMiddleware";
import { rtkErrorMiddleware } from "./rtkErrorMiddleware";

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
  whitelist: ["auth", "products"], // Auth tokens + local cart survive reloads
};

// Combine all reducers
const rootReducer = combineReducers({
  auth: AuthSlice,
  ui: uiReducer,
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
    }).concat(API_Query.middleware, cartSyncMiddleware, rtkErrorMiddleware),
});

// Create persistor
export const persistor = persistStore(store);

setupListeners(store.dispatch);
