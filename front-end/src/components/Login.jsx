import { useState } from "react";
import CenteredForm from "./CenteredForm";
import { useNavigate } from "react-router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <CenteredForm>
      <form className="form">
        <div className="ubuntu-light form-field">
          <label htmlFor="email">Email</label>
          <input
            className="ubuntu-light"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="ubuntu-light form-field">
          <label htmlFor="password">Password</label>
          <input
            className="ubuntu-light"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="button-group">
          <button className="ubuntu-light" type="submit">
            Login
          </button>
          <button
            className="ubuntu-light"
            type="submit"
            onClick={() => navigate("/create-account")}
          >
            Sign Up
          </button>
        </div>
      </form>
    </CenteredForm>
  );
}
