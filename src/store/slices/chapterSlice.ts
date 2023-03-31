import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChapterState } from "../../types/chapterTypes";

const initialState: ChapterState = {
  currentChapterTitle: null,
  currentChapterNumber: null,
};

const chapterSlice = createSlice({
  name: "chapter",
  initialState,
  reducers: {
    setChapter: (
      state,
      action: PayloadAction<{ title: string; number: number }>
    ) => {
      state.currentChapterTitle = action.payload.title;
      state.currentChapterNumber = action.payload.number;
    },
  },
});

export const { setChapter } = chapterSlice.actions;

export default chapterSlice.reducer;
