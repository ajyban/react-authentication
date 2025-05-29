import { useState } from "react";
import CenteredForm from "./CenteredForm";

export default function CreateAcccount() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <CenteredForm>
      <form>
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="row mb-3">
              <label htmlFor="email" className="col-sm-2 col-form-label">
                Email
              </label>
              <div className="col-sm-10">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="password" className="col-sm-2 col-form-label">
                Password
              </label>
              <div className="col-sm-10">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="row mb-3">
              <label
                htmlFor="confirmPassword"
                className="col-sm-2 col-form-label"
              >
                Confirm Password
              </label>
              <div className="col-sm-10">
                <input
                  type="password"
                  className="form-control"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Create Account
        </button>
      </form>
    </CenteredForm>
  );
}
