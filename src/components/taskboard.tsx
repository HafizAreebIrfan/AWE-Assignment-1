import React from "react";
import type { TaskCardProps } from "../utils/interfaces/taskcardprops";

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  return (
    <div>
      {" "}
      <h3>{task.title}</h3>{" "}
      <p>
        <strong>Category:</strong> {task.category}
      </p>{" "}
    </div>
  );
};
export default TaskCard;
