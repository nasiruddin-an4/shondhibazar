"use client";
import { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";
import { fetchProducts } from "./API_Slices/productSlice";

function DataFetcher({ children }) {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  
  return children;
}

export function Providers({ children }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <DataFetcher>
          {children}
        </DataFetcher>
      </PersistGate>
    </Provider>
  );
}
