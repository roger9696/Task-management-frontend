"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Register() {
  const [task_name, setTaskName] = useState("");
  const [task_status, setTaskStatus] = useState("");
  const [created_by, setCreatedBy] = useState("");

  const router = useRouter();

  const submit = async (e) => {
    e.preventDefault();

    await fetch("http://127.0.0.1:8000/api/createtask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        task_name,
        task_status,
        created_by,
      }),
    });

    router.push("/profile");
    alert("Task Created successfully!");
  };

  return (
    <main className="container-fluid py-5">
      <div className="container">
        <div className="row">
          <div className="col-5 offset-md-3">
            <h3 className="text-center">Create a new Task</h3>
            <hr />
            <form onSubmit={submit} className="mt-3">
              <div className="mb-3">
                <label htmlFor="TaskName" className="form-label">
                  Task Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  required
                  placeholder="Task Name"
                  onChange={(e) => setTaskName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="TaskStatus" className="form-label">
                  Task Status
                </label>
                <input
                  type="text"
                  className="form-control"
                  required
                  placeholder="Task Status"
                  onChange={(e) => setTaskStatus(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="CreatedBy" className="form-label">
                  Created By
                </label>
                <input
                  type="text"
                  className="form-control"
                  required
                  placeholder="Created By"
                  onChange={(e) => setCreatedBy(e.target.value)}
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
}
