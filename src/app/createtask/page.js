"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createTask } from "../../../actions/actions";

const Register = () => {
  const [taskData, setTaskData] = useState({
    task_name: "",
    task_status: "",
    created_by: "",
  });

  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await createTask(taskData);
    console.log(res);

    router.push("/profile");
    alert("Task Created successfully!");
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  return (
    <main className="container-fluid py-5">
      <div className="container">
        <div className="row">
          <div className="col-5 offset-md-3">
            <h3 className="text-center">Create a new Task</h3>
            <hr />
            <form onSubmit={onSubmit} className="mt-3">
              <div className="mb-3">
                <label htmlFor="TaskName" className="form-label">
                  Task Name
                </label>
                <input
                  name="task_name"
                  value={taskData.task_name}
                  type="text"
                  className="form-control"
                  required
                  placeholder="Task Name"
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="TaskStatus" className="form-label">
                  Task Status
                </label>
                <input
                  type="text"
                  name="task_status"
                  value={taskData.task_status}
                  className="form-control"
                  required
                  placeholder="Task Status"
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="CreatedBy" className="form-label">
                  Created By
                </label>
                <input
                  name="created_by"
                  value={taskData.created_by}
                  type="text"
                  className="form-control"
                  required
                  placeholder="Created By"
                  onChange={handleInputChange}
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};
export default Register;
