"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

function EditTask({}) {
  const router = useRouter();
  const params = useParams();
  const taskId = params.updatetaskid ?? null;
  console.log(taskId);
  console.log(params);
  const [taskName, setTaskName] = useState("");
  const [taskStatus, setTaskStatus] = useState("");

  useEffect(() => {
    if (taskId) {
      fetch(`http://127.0.0.1:8000/api/createtask/${taskId}/`)
        .then((response) => response.json())
        .then((data) => {
          setTaskName(data.task_name);
          setTaskStatus(data.task_status);
        });
    }
  }, [taskId]);
  console.log(taskId);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/createtask/${taskId}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            task_name: taskName,
            task_status: taskStatus,
          }),
        }
      );

      const data = await response.json();
      console.log(data);
      router.push("/profile");
    } catch (error) {
      console.error(error);
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
                type="text"
                className="form-control"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
              />
              <br />
              <label>Task Status:</label>
              <input
                type="text"
                className="form-control"
                value={taskStatus}
                onChange={(e) => setTaskStatus(e.target.value)}
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
