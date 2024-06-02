import { createSlice } from "@reduxjs/toolkit";
import { assignments } from "../../Database";
const initialState = {
  assignments: assignments,
};
const modulesSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addAssignment: (state, { payload: assignment }) => {
      const newAssignment: any = {
        _id: new Date().getTime().toString(),
        title: "New Assignment",
        course: assignment.course,
        description: "New Assignment",
        points: 100,
        due_date: "2024-05-27",
        available_date : "2024-05-26"
      };
      state.assignments = [...state.assignments, newAssignment] as any;
    },
    deleteAssignment: (state, { payload: assignmentID }) => {
      state.assignments = state.assignments.filter(
        (m: any) => m._id !== assignmentID);
    },
    updateAssignment: (state, { payload: assignment }) => {
      state.assignments = state.assignments.map((m: any) =>
        m._id === assignment._id ? assignment : m
      ) as any;
    },
    editAssignment: (state, { payload: assignmentID }) => {
      state.assignments = state.assignments.map((m: any) =>
        m._id === assignmentID ? { ...m, editing: true } : m
      ) as any;
    },
  },
});
export const { addAssignment, deleteAssignment, updateAssignment, editAssignment } =
  modulesSlice.actions;
export default modulesSlice.reducer;