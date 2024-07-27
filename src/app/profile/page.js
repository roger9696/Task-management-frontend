"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { CookieJar } from "tough-cookie";

export default function Profile() {
  const [message, setMessage] = useState("");
  // const cookieJar = new CookieJar();
  // const axiosInstance = axios.create({ jar: cookieJar, withCredentials: true });
  useEffect(() => {
    (async () => {
      try {
        // const res = await axiosInstance.get("http://127.0.0.1:8000/api/user");
        // const data = await res.data;

        // console.log(data);
        // setMessage(data.first_name);
        const response = await fetch("http://127.0.0.1:8000/api/user", {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZXhwIjoxNzIxNjA4OTc0LjYxMDQ3NiwiaWF0IjoxNzIxNjA1Mzc0LjYxMDQ3Nn0.7-yiA5kn67-UU5DyMH-AI2oTsHvKKK6QqqHd344ozzw",
          },
          credentials: "include",
        });
        const data = await response.json();
        console.log(data);
        setMessage(`Hi ${data.id}`);
      } catch {
        setMessage("login failed");
      }
    })();
  }, []);

  const task = [
    {
      id: 1,
      taskName: "Attend Bootcamp",
      taskStatus: "completed",
      createdDate: "12/01/2024",
      createdBy: "Roger Naah Napuo",
    },

    {
      id: 2,
      taskName: "Finish Project",
      taskStatus: "in progress",
      createdDate: "12/05/2024",
      createdBy: "John Doe",
    },

    {
      id: 3,
      taskName: "Meet with Team",
      taskStatus: "pending",
      createdDate: "12/08/2024",
      createdBy: "Jane Smith",
    },

    {
      id: 4,
      taskName: "Submit Report",
      taskStatus: "completed",
      createdDate: "12/10/2024",
      createdBy: "Bob Johnson",
    },

    {
      id: 5,
      taskName: "Attend Meeting",
      taskStatus: "in progress",
      createdDate: "12/12/2024",
      createdBy: "Alice Brown",
    },
  ];

  return (
    <main className="container-fluid py-5 ">
      <div className="container">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>TaskName</th>
              <th>TaskStatus</th>
              <th>DateCreated</th>
              <th>CreatedBy</th>
              <th>{message}</th>
            </tr>
          </thead>
          <tbody>
            {task.map((item, index) => (
              <tr key={index}>
                <td>{item.taskName}</td>
                <td>{item.taskStatus}</td>
                <td>{item.createdDate}</td>
                <td>{item.createdBy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
