import { createSlice } from "@reduxjs/toolkit";

// Client-side UI state: controls modals, drawers, and transient UI flags.
// Replaces the old commonSlice that held irrelevant quiz state.
const uiSlice = createSlice({
  name: "ui",
  initialState: {
    cartDrawerOpen: false,
    authModalOpen: false,
    authModalMode: "login", // "login" | "register"
  },
  reducers: {
    openCartDrawer: (state) => {
      state.cartDrawerOpen = true;
    },
    closeCartDrawer: (state) => {
      state.cartDrawerOpen = false;
    },
    toggleCartDrawer: (state) => {
      state.cartDrawerOpen = !state.cartDrawerOpen;
    },
    openAuthModal: (state, action) => {
      state.authModalOpen = true;
      state.authModalMode = action.payload || "login";
    },
    closeAuthModal: (state) => {
      state.authModalOpen = false;
    },
  },
});

export const {
  openCartDrawer,
  closeCartDrawer,
  toggleCartDrawer,
  openAuthModal,
  closeAuthModal,
} = uiSlice.actions;

export default uiSlice.reducer;
