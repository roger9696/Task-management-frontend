"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Profile() {
  const [message, setMessage] = useState("");
  const [token, setToken] = useState(null);
  const router = useRouter();
  const [refreshTasks, setRefreshTasks] = useState(false);

  const [tasks, setTask] = useState([]);
  const [auth, setAuth] = useState(false);
  const [display, setDisplay] = useState(``);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    setToken(localToken);
  }, []);

  useEffect(() => {
    if (token) {
      (async function fetchUserData() {
        try {
          const response = await fetch("http://127.0.0.1:8000/api/user", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            credentials: "include",
          });
          const data = await response.json();
          setUserData(data);
          if (data.is_superuser) {
            setDisplay(data.last_name);
          } else {
            setDisplay(data.id);
          }

          console.log("This is the token" + token);
          console.log(data.is_superuser);
          console.log(data);
          setMessage(`Hi ${data.first_name} ${data.last_name}`);
          setAuth(true);
        } catch (error) {
          setAuth(false);
          console.error(error);
          setMessage("login failed");
        }
      })();
    }
  }, [token]);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch("http://127.0.0.1:8000/api/createtask");
      const taskdata = await response.json();
      setTask(taskdata);
    };
    fetchTasks();
  }, [refreshTasks]);

  useEffect(() => {
    console.log(tasks);
  }, [tasks]);

  const handleDelete = (taskId) => {
    fetch(`http://127.0.0.1:8000/api/createtask/${taskId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text();
      })
      .then((data) => {
        if (!data) {
          console.log(" Deleted successfully");
          alert("Task deleted successfully");
          setRefreshTasks(!refreshTasks);
          return;
        }
        try {
          const jsonData = JSON.parse(data);
          setTask(tasks.filter((task) => task.id !== taskId));
        } catch (error) {
          console.error("Invalid JSON response:", error);
        }
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
      });
  };

  return (
    <main className="container-fluid py-5 ">
      <div className="container">
        <div className="text-center fw-b mb-5">
          <p>
            {message} welcome {display}
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
          </p>
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
              <tr key={index}>
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
}
