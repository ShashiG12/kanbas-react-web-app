import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  quizzes: [],
};
const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    setQuizzes: (state, action) => {
      state.quizzes = action.payload;
    },
    addQuiz: (state, { payload: quiz }) => {
      state.quizzes = [...state.quizzes, quiz] as any;
    },
    deleteQuiz: (state, { payload: quizID }) => {
      state.quizzes = state.quizzes.filter(
        (m: any) => m._id !== quizID);
    },
    updateQuiz: (state, { payload: quiz }) => {
      state.quizzes = state.quizzes.map((m: any) =>
        m._id === quiz._id ? quiz : m
      ) as any;
    },
    editQuiz: (state, { payload: quizID }) => {
      state.quizzes = state.quizzes.map((m: any) =>
        m._id === quizID ? { ...m, editing: true } : m
      ) as any;
    },
  },
});
export const { addQuiz, deleteQuiz, updateQuiz, editQuiz, setQuizzes} =
  quizzesSlice.actions;
export default quizzesSlice.reducer;