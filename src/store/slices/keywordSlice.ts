import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isKeywordQuestion: false,
};

const keywordSlice = createSlice({
  name: "keyword",
  initialState,
  reducers: {
    keywordQuestionOn(state) {
      state.isKeywordQuestion = true;
    },
    keywordQuestionOff(state) {
      state.isKeywordQuestion = false;
    },
  },
});

export const { keywordQuestionOn, keywordQuestionOff } = keywordSlice.actions;
export default keywordSlice.reducer;
