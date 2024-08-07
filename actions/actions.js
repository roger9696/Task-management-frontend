import axios from "axios";

const apiUrl = "http://127.0.0.1:8000/api";

async function registerUser(userData) {
  try {
    const res = await axios.post(`${apiUrl}/register`, userData);
    return res.data;
  } catch (error) {
    console.log("Failed to register the user");
    console.error(error);
    return null;
  }
}

async function loginUser(userData) {
  try {
    const res = await axios.post(`${apiUrl}/login`, userData);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log("Failed to login the user");
    console.error(error);
    return null;
  }
}

async function getUser(token) {
  try {
    const res = await axios.get(`${apiUrl}/user`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.data;
  } catch (error) {
    console.log("failed to get the user");
    console.error(error);
    return null;
  }
}

async function logoutUser(router) {
  let token = localStorage.getItem("token");
  console.log("Before logout, token is:", token);

  try {
    const res = await axios.post(`${apiUrl}/logout`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    console.log(res.data.message);
    localStorage.removeItem("token");
    token = null;
    console.log(token);
    console.log("After logout, token is:", localStorage.getItem("token"));
    if (res.data.message === "success") {
      await router.push("/login");
    }

    return res.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function getTasks() {
  try {
    const res = await axios.get(`${apiUrl}/createtask`);
    return res.data;
  } catch (error) {
    console.log("failed to get the tasks");
    console.error(error);
    return null;
  }
}

async function createTask(taskData) {
  try {
    const res = await axios.post(`${apiUrl}/createtask`, taskData);
    return res.data;
  } catch (error) {
    console.log("failed to create the task");
    console.error(error);
    return null;
  }
}

async function updateTask(taskData, taskId) {
  try {
    const res = await axios.patch(`${apiUrl}/createtask/${taskId}/`, taskData);
    return res.data;
  } catch (error) {
    console.log("failed to update the task");
    console.error(error);
    return null;
  }
}

async function deleteTask(taskId) {
  try {
    const res = await axios.delete(`${apiUrl}/createtask/${taskId}`);
    return res.data;
  } catch (error) {
    console.log("failed to delete the task");
    console.error(error);
    return null;
  }
}
async function getTask(taskId) {
  try {
    const res = await axios.get(`${apiUrl}/createtask/${taskId}`);
    return res.data;
  } catch (error) {
    console.log("failed to get the task");
    console.error(error);
    return null;
  }
}

export {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getTask,
};
