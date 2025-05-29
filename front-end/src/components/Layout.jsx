import { Link, Outlet } from "react-router";

export default function Layout() {
  return (
    <>
      <nav className="navbar bg-black text-white">
        <div className="container-fluid">
          <Link to="/" className="nav-link text-white fw-bold">
            React Authentication App
          </Link>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/login">
                Login
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <Outlet />
    </>
  );
}
