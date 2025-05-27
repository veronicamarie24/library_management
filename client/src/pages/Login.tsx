import "../styles/Login.css";

export default function Login() {
  return (
    <div className="login-container">
      <h1>Login</h1>
      <div className="login-buttons">
        <button>Login as Admin</button>
        <button>Login as User</button>
      </div>
    </div>
  );
}
