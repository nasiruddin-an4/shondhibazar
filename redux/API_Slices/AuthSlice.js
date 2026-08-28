import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  signin: false,
};

const authSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    handleQuestion: (state, action) => {
      state.signin = action.payload;
    },
  },
});

export const { handleQuestion } = authSlice.actions;

export default authSlice.reducer;
