import "../styles/Login.css";

export default function Login() {
  return (
    <div className="login-container">
      <h1>Login</h1>
      Choose your role
      <div className="login-buttons">
        <button className="button-secondary">Login as Admin</button>
        <button className="button-primary">Login as User</button>
      </div>
    </div>
  );
}
