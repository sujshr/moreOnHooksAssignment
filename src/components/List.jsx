import React, { useReducer, useState, useRef } from "react";
import "./List.css";
import ListItem from "./ListItem";

export default function List() {
  const reducer = (tasks, action) => {
    switch (action.type) {
      case "ADD_TASK":
        return [...tasks, { text: action.text, status: "visible" }];
      case "TOGGLE_TASK":
        return tasks.map((task, index) =>
          index === action.index
            ? {
                ...task,
                status: task.status === "visible" ? "hidden" : "visible",
              }
            : task
        );
      default:
        return tasks;
    }
  };

  const [tasks, dispatch] = useReducer(reducer, []);

  const [taskText, setTaskText] = useState("");

  const handleSubmit = () => {
    if (taskText.trim() !== "") {
      dispatch({ type: "ADD_TASK", text: taskText });
      setTaskText("");
    }
  };

  const handleToggle = (index) => {
    dispatch({ type: "TOGGLE_TASK", index });
  };

  const inputRef = useRef(null);
  return (
    <div id="div">
      <div>
        <input
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          ref={inputRef}
        />
        <button onClick={handleSubmit}>Add</button>
      </div>

      <ul>
        {tasks.map((task, index) => (
          <ListItem
            key={index}
            task={task}
            index={index}
            toggle={handleToggle}
          />
        ))}
      </ul>
      <button
        onClick={() => {
          inputRef.current.focus();
        }}
      >
        Go to Input
      </button>
    </div>
  );
}
