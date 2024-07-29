"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header({ auth }) {
  let menu;
  const router = useRouter();
  const [token, setToken] = useState(null);

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    setToken(localToken);
  }, []);

  const logout = async () => {
    await fetch("http://127.0.0.1:8000/api/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });
    localStorage.removeItem("token");
    await router.push("/login");
  };

  // if (auth) {
  //   menu = (
  //     <div>
  //       <a className="nav-link active" aria-current="page" href="login">
  //         Login
  //       </a>
  //     </div>
  //   );
  // } else {
  //   menu = (
  //     <div>
  //       <a className="nav-link active" aria-current="page" onClick={logout}>
  //         Logout
  //       </a>
  //     </div>
  //   );
  // }
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary border">
      <div className="container">
        <a className="navbar-brand ml-5 text-sze-24px" href="/">
          Task Management
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ms-auto">{menu}</div>
        </div>
      </div>
    </nav>
  );
}
