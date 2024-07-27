"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const submit = async (e) => {
    e.preventDefault();

    await fetch("http://127.0.0.1:8000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },

      body: JSON.stringify({
        email,
        password,
      }),
    });

    router.push("/profile");
  };

  return (
    <main className="container-fluid py-5 ">
      <div className="container">
        <div className="row ">
          <div className="col-7 offset-md-3 ">
            <h3 className="text-center">Login!</h3>
            <hr />
            <form onSubmit={submit} className="mt-3">
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
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
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
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
