import React from "react";

function TaskList() {
  const [tasks, setTask] = useState([]);

  useEffect(() => {
    (async function fetchTask() {
      const response = await fetch("http://127.0.0.1:8000/api/createtask");
      const taskdata = await response.json();
      setTask(taskdata);
    })();
  }, []);

  return (
    <div>
      {tasks.map((task, index) => (
        <div key={index}>
          <h2>{task.task_name}</h2>
          <p>Status: {task.task_status}</p>
          <p>Created by: {task.created_by}</p>
        </div>
      ))}
    </div>
  );
}

export default TaskList;
