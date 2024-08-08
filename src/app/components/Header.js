"use client";

import { useRouter } from "next/navigation";
import { logoutUser } from "../../../actions/actions";

export default function Header({ auth }) {
  let menu;
  const router = useRouter();

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
          <div className="navbar-nav ms-auto">
            <a
              className="nav-link active"
              aria-current="page"
              onClick={() => logoutUser(router)}
            >
              Logout
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
