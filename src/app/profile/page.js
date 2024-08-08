"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getUser, getTasks, deleteTask } from "../../../actions/actions";
import { withAuth } from "../components/withAuth";

const Profile = () => {
  const [message, setMessage] = useState("");
  const router = useRouter();
  const [refreshTasks, setRefreshTasks] = useState(0);
  const [tasks, setTask] = useState([]);
  const [display, setDisplay] = useState("");
  const [userData, setUserData] = useState({});

  const fetchUserData = async () => {
    const token = localStorage.getItem("token");
    const response = await getUser(token);
    setUserData(response);
    if (response.is_superuser) {
      setDisplay(`( 🤵 Admin )`);
    } else {
      setDisplay(`( User )`);
    }
    setMessage(`Hi ${response.first_name} ${response.last_name}`);
  };

  useEffect(() => {
    fetchUserData();
    fetchTasks();
  }, [refreshTasks]);

  async function fetchTasks() {
    const response = await getTasks();
    setTask(response);
  }

  const handleDelete = async (taskId) => {
    try {
      const result = await deleteTask(taskId);
      if (!result) {
        alert("Task deleted successfully");
        setRefreshTasks(refreshTasks + 1);
      } else {
        console.log("Deleted successfully");
        setRefreshTasks(refreshTasks + 1);
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <main className="container-fluid py-5 ">
      <div className="container">
        <div className="text-center fw-b mb-5">
          <div>
            <p>{message} welcome!</p>
            {display}
            <Link href="/createtask">
              {userData.is_superuser && (
                <>
                  <button
                    className="btn btn-dark align-center ml-5"
                    style={{ marginLeft: "20px" }}
                  >
                    Creat task
                  </button>
                </>
              )}
            </Link>
          </div>
        </div>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Task Name</th>
              <th>Task Status</th>
              <th>Date Created</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((item, index) => (
              <tr key={item.id}>
                <td>{item.task_name}</td>
                <td>{item.task_status}</td>
                <td>{item.created_date}</td>
                <td>
                  {userData.is_superuser && (
                    <>
                      <button
                        className="btn btn-dark align-center mr-5"
                        style={{ margin: "6px" }}
                        onClick={() => handleDelete(item.id)}
                      >
                        x
                      </button>
                      <button
                        onClick={() => router.push(`/updatetask/${item.id}`)}
                        className="btn btn-dark align-center ml-5"
                      >
                        Update task
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};
export default withAuth(Profile);
