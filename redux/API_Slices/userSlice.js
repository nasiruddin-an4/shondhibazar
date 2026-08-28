import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userReview: [],
  },
  reducers: {
    handleUserReviews: (state, action) => {
      state.userReview = action.payload;
    },
  },
});

export const { handleUserReviews } = userSlice.actions;

export default userSlice.reducer;
