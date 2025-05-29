import { Link, Outlet } from "react-router";
import "./Layout.css";

export default function Layout() {
  return (
    <>
      <nav className="nav-bar">
        <div>
          <Link className="nav-bar-title ubuntu-bold" to="/">
            React Authentication Demo App
          </Link>
        </div>
        <div>
          <Link className="nav-bar-item ubuntu-regular" to="/login">
            Login
          </Link>
          <Link className="nav-bar-item ubuntu-regular" to="/profile">
            Profile
          </Link>
        </div>
      </nav>
      <Outlet />
    </>
  );
}
