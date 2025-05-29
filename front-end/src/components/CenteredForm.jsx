import "./CenteredForm.css";

export default function CenteredForm({ children }) {
  return (
    <div className="login-form d-flex align-items-center">
      <div className="container text-center">{children}</div>
    </div>
  );
}
