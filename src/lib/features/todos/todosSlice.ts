import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Todo = {
  id: number;
  name: string;
  completed: boolean;
};

type TodoState = {
  list: Todo[];
  user: string;
};

const initialState: TodoState = {
  list: [],
  user: "todo",
};

export const todo = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.list.push(action.payload);
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      state.list = state.list.filter((todo) => todo.id !== action.payload);
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.list.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    modifyTodo: (
      state,
      action: PayloadAction<{ id: number; name: string }>
    ) => {
      const todo = state.list.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.name = action.payload.name;
      }
    },
    initializeTodos: (state, action: PayloadAction<Todo[]>) => {
      state.list = action.payload;
    },
  },
});

export const { addTodo, removeTodo, toggleTodo, modifyTodo, initializeTodos } =
  todo.actions;

export default todo.reducer;
