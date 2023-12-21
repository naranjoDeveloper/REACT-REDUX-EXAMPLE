import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: "1",
    title: "Task A",
    description: "This is task A",
    completed: false,
  },
  {
    id: "2",
    title: "Task B",
    description: "This is task B",
    completed: false,
  },
];

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.push(action.payload);
    },
    deleteTask: (state, action) => {
      //se filtra la lista de tareas a partir del id que recibimos en el payload
      return state.filter((task) => task.id !== action.payload);
    },
    updateTask: (state, action) => {
      const task = state.find((task) => task.id === action.payload.id);
      task.title = action.payload.title;
      task.description = action.payload.description;
    },
  },
});

export const { addTask, deleteTask, updateTask } = taskSlice.actions;

export default taskSlice.reducer;
