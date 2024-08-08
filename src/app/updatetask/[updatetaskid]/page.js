"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getTask, updateTask } from "../../../../actions/actions";

function EditTask({}) {
  const router = useRouter();
  const params = useParams();
  const taskId = params.updatetaskid ?? null;
  const [taskData, setTaskData] = useState({
    task_name: "",
    task_status: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  useEffect(() => {
    if (taskId) {
      async function fetchtask() {
        const res = await getTask(taskId);
        console.log(res);
        setTaskData({ task_name: res.task_name, task_status: res.task_status });
      }
      fetchtask();
    }
  }, [taskId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      async function updatetask() {
        const response = await updateTask(taskData, taskId);
        console.log(`Task ${taskId} updated successfully`);
        // console.log(`Task ${taskId} updated successfully`, response);
        router.push("/profile");
      }
      updatetask();
      router.push("/profile");
    } catch (error) {
      console.error(error);
      console.log("Failed to update task");
    }
  };

  return (
    <main className="container-fluid py-5 ">
      <div className="container">
        <div className="row ">
          <div className="col-7 offset-md-3 ">
            <h2 className="text-center">Edit Task</h2>
            <form onSubmit={handleSubmit}>
              <label>Task Name:</label>
              <input
                name="task_name"
                value={taskData.task_name}
                type="text"
                className="form-control"
                onChange={handleInputChange}
              />
              <br />
              <label>Task Status:</label>
              <input
                name="task_status"
                value={taskData.task_status}
                type="text"
                className="form-control"
                onChange={handleInputChange}
              />
              <br />
              <button className="btn btn-primary" type="submit">
                Update Task
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

export default EditTask;
