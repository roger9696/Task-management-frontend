import Link from "next/link";


export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary border">
        <div className="container">
            <a className="navbar-brand ml-5 text-sze-24px" href="/">Task Management</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav ms-auto">
                <a className="nav-link active" aria-current="page" href="login">Login</a>
                <a className="nav-link active" aria-current="page" href="profile">Profile</a>
              </div>
            </div>
        </div>
</nav>
    
  );
}



