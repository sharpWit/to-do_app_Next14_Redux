"use client";

import {
  addTodo,
  removeTodo,
  toggleTodo,
  modifyTodo,
  initializeTodos,
  Todo,
} from "@/lib/features/todos/todosSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useState, useEffect } from "react";

// save to localStorage
const saveTodosToLocalStorage = (todos: Todo[]) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

// load from localStorage
const loadTodosFromLocalStorage = () => {
  const todos = localStorage.getItem("todos");
  return todos ? JSON.parse(todos) : [];
};

export const TodosForm = () => {
  const todoList = useAppSelector((state) => state.todos.list);
  const dispatch = useAppDispatch();
  const [todo, setTodo] = useState("");
  const [editingTodo, setEditingTodo] = useState<number | null>(null);

  useEffect(() => {
    const savedTodos = loadTodosFromLocalStorage();
    if (savedTodos.length > 0) {
      dispatch(initializeTodos(savedTodos));
    }
  }, [dispatch]);

  useEffect(() => {
    saveTodosToLocalStorage(todoList);
  }, [todoList]);

  const handleSubmit = () => {
    if (editingTodo !== null) {
      dispatch(modifyTodo({ id: editingTodo, name: todo }));
      setEditingTodo(null);
    } else {
      dispatch(
        addTodo({
          id: Date.now(),
          name: todo,
          completed: false,
        })
      );
    }
    setTodo("");
  };

  const handleDelete = (id: number) => {
    dispatch(removeTodo(id));
  };

  const handleToggle = (id: number) => {
    dispatch(toggleTodo(id));
  };

  const handleEdit = (todo: { id: number; name: string }) => {
    setTodo(todo.name);
    setEditingTodo(todo.id);
  };

  return (
    <div className="flex flex-col gap-3 bg-white text-black p-3 rounded-md">
      <input
        type="text"
        onChange={(e) => setTodo(e.target.value)}
        value={todo}
        placeholder={
          editingTodo !== null ? "Edit ToDo..." : "Add a new ToDo..."
        }
        className="rounded-md h-8 p-2 bg-indigo-100"
      />
      <button className="bg-indigo-400 rounded-md p-2" onClick={handleSubmit}>
        {editingTodo !== null ? "Update" : "Add"}
      </button>

      {todoList.length > 0 && (
        <div className="flex flex-col gap-2 mt-4">
          <h3>To Do List</h3>
          {todoList.map((todo) => {
            return (
              <div key={todo.id} className="flex items-center">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggle(todo.id)}
                  className="mr-2"
                />
                <span
                  style={{
                    textDecoration: todo.completed ? "line-through" : "none",
                  }}
                  className="mr-4"
                >
                  {todo.name}
                </span>

                <button
                  onClick={() => handleEdit(todo)}
                  className="bg-blue-400 p-2 rounded-md text-white mr-2"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDelete(todo.id)}
                  className="bg-red-400 p-2 rounded-md text-white"
                >
                  🗑️ Delete
                </button>
              </div>
            );
          })}
        </div>
      )}

      {todoList.some((todo) => todo.completed) && (
        <div className="mt-4">
          <h3>Completed ToDos</h3>
          {todoList
            .filter((todo) => todo.completed)
            .map((todo) => (
              <div key={todo.id} className="flex items-center">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggle(todo.id)}
                  className="mr-2"
                />
                <span style={{ textDecoration: "line-through" }}>
                  {todo.name}
                </span>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};
