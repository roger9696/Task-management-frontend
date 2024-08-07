"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { registerUser } from "../../../actions/actions";

export default function Register() {
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const router = useRouter();

  async function onSubmit(e) {
    e.preventDefault();
    const res = await registerUser(userData);
    console.log("submitted", res.data);
    console.log("submitted");
    setUserData({
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    });
    // Check if registration is successful
    if (res.success || res.message === "User created successfully") {
      router.push("/login");
    } else {
      console.log("Registration failed");
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <main className="container-fluid py-5">
      <div className="container">
        <div className="row">
          <div className="col-5 offset-md-3">
            <h3 className="text-center">Register!</h3>
            <hr />

            <form onSubmit={onSubmit} className="mt-3">
              <div className="mb-3">
                <label htmlFor="FirstName" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  name="first_name"
                  className="form-control"
                  required
                  value={userData.first_name}
                  placeholder="First Name"
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="LastName" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  required
                  value={userData.last_name}
                  name="last_name"
                  placeholder="Last Name"
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  required
                  name="email"
                  value={userData.email}
                  placeholder="Email"
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="Password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  required
                  name="password"
                  value={userData.password}
                  placeholder="Password"
                  onChange={handleInputChange}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
            <h3 className="text-center">
              <p>
                Already have an account? Login!
                <a className="text-24px" href="login">
                  Login
                </a>{" "}
              </p>
            </h3>
          </div>
        </div>
      </div>
    </main>
  );
}
