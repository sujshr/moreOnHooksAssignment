import React from "react";

export default function ListItem(props) {
  return (
    <li>
      {props.task.status === "hidden" ? `Task Hidden` : props.task.text}
      <button onClick={() => props.toggle(props.index)}>Toggle</button>
    </li>
  );
}
