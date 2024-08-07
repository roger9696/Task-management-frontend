"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { loginUser } from "../../../actions/actions";

export default function Login() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await loginUser(userData);
    console.log("submitted", res.jwt);
    localStorage.setItem("token", res.jwt);
    setUserData({
      email: "",
      password: "",
    });
    if (res.ok) {
      router.push("/profile");
      alert("Logged in successfully");
    } else {
      alert("Invalid credentials");
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <main className="container-fluid py-5 ">
      <div className="container">
        <div className="row ">
          <div className="col-7 offset-md-3 ">
            <h3 className="text-center">Login!</h3>
            <hr />
            <form onSubmit={onSubmit} className="mt-3">
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  name="email"
                  value={userData.email}
                  type="email"
                  className="form-control"
                  id="email"
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="Password" className="form-label">
                  Password
                </label>
                <input
                  name="password"
                  value={userData.password}
                  type="password"
                  className="form-control"
                  id="password"
                  onChange={handleInputChange}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
            <h3 className="text-center">
              Don't have an account? SignUp!
              <a className="text-24px" href="register">
                Here
              </a>
            </h3>
          </div>
        </div>
      </div>
    </main>
  );
}
