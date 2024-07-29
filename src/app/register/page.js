"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const submit = async (e) => {
    e.preventDefault();

    // await fetch("http://127.0.0.1:8000/api/register", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     first_Name,
    //     last_Name,
    //     email,
    //     password,
    //   }),
    // });
    const axios = require("axios");
    let data = JSON.stringify({
      first_name,
      last_name,
      email,
      password,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://127.0.0.1:8000/api/register",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });

    router.push("/login");
  };

  return (
    <main className="container-fluid py-5">
      <div className="container">
        <div className="row">
          <div className="col-5 offset-md-3">
            <h3 className="text-center">Register!</h3>
            <hr />

            <form onSubmit={submit} className="mt-3">
              <div className="mb-3">
                <label htmlFor="FirstName" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  required
                  placeholder="First Name"
                  onChange={(e) => setFirstName(e.target.value)}
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
                  placeholder="Last Name"
                  onChange={(e) => setLastName(e.target.value)}
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
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
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
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
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
