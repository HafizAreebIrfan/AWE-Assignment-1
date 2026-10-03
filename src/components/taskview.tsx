import { useEffect, useState } from "react";
import type { Task } from "../utils/types/task";
import TaskCard from "./taskboard";
import styles from "../styles/taskview.module.css";

const TaskView: React.FC<{}> = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Complete React Assignment",
      category: "University",
    },
    {
      id: 2,
      title: "Prepare Database Presentation",
      category: "Presentation",
    },
    {
      id: 3,
      title: "Submit Software Engineering Report",
      category: "Report",
    },
  ]);

  const [newTask, setNewTask] = useState<string>("");
  const [category, setCategory] = useState<string>("University");

  useEffect(() => {
    console.log("Task list updated!");
    console.log("Total number of tasks:", tasks.length);
  }, [tasks]);

  const addTask = (): void => {
    const trimmedTask = newTask.trim();

    if (trimmedTask === "") {
      return;
    }

    const task: Task = {
      id: Date.now(),
      title: trimmedTask,
      category: category,
    };

    setTasks((previousTasks) =>
      [...previousTasks, task].sort((a, b) => b.id - a.id),
    );

    setNewTask("");
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    addTask();
  };
  return (
    <section className={styles.board}>
      <header className={styles.boardHeader}>
        <div>
          <p className={styles.eyebrow}>Campus Productivity</p>
          <h1 className={styles.h1}>Campus Task Board</h1>
          <p className={styles.subtitle}>
            Keep track of your university tasks in one place.
          </p>
        </div>

        <div className={styles.taskCount}>
          <strong>{tasks.length}</strong>
          <span>Tasks</span>
        </div>
      </header>

      <form className={styles.taskForm} onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label htmlFor="task">New Task</label>

          <input
            id="task"
            type="text"
            value={newTask}
            onChange={(event) => setNewTask(event.target.value)}
            placeholder="e.g. Complete HCI Lab"
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="category">Category</label>

          <select
            id="category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            <option value="University">University</option>
            <option value="Assignment">Assignment</option>
            <option value="Presentation">Presentation</option>
            <option value="Project">Project</option>
            <option value="Personal">Personal</option>
          </select>
        </div>

        <button type="submit">Add Task</button>
      </form>

      <section className={styles.taskList}>
        <div className={styles.sectionHeading}>
          <h2>Your Tasks</h2>
          <span>{tasks.length} total</span>
        </div>

        {tasks.length > 0 ? (
          <div className={styles.tasks}>
            {tasks.map((task: Task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        ) : (
          <p className={styles.emptyMessage}>
            No tasks available. Add your first campus task.
          </p>
        )}
      </section>
    </section>
  );
};

export default TaskView;
