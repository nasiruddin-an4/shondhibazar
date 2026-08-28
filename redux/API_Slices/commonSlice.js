import { createSlice } from "@reduxjs/toolkit";

const commonSlice = createSlice({
  name: "common",
  initialState: {
    viewQuiz: false,
    isQuizStart: false,
  },
  reducers: {
    handleQuizStart: (state, action) => {
      state.isQuizStart = true;
      state.viewQuiz = false;
    },
  },
});

export const { handleQuizStart } = commonSlice.actions;

export default commonSlice.reducer;
