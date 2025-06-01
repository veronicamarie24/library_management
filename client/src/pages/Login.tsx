import { useState } from "react";
import type { LoginForm, LoginResponse } from "../types/login";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";
import { CLIENT_ROUTES } from "../routes/clientRoutes";
import type { ErrorResponse } from "../types/api";
import { AUTH_ROUTES } from "../routes/serverRoutes";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginForm>({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleClickSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log("submitting form", JSON.stringify(formData));
      const response = await fetch(AUTH_ROUTES.LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Debug logging
      console.log("response status:", response.status);
      console.log("response ok:", response.ok);
      console.log("bodyUsed BEFORE reading:", response.bodyUsed);
      console.log("response headers:", [...response.headers.entries()]);

      const responseText = await response.text();
      console.log("bodyUsed AFTER reading:", response.bodyUsed);
      console.log("response text:", responseText);

      if (!response.ok) {
        const errorData = JSON.parse(responseText) as ErrorResponse;
        const errorMessage = errorData.errorMessage || "Error logging in.";

        throw new Error(`${response.status}: ${errorMessage}`);
      }

      const data = JSON.parse(responseText) as LoginResponse;

      if (data.token) {
        localStorage.setItem("jwt", data.token);
      }

      if (data.user?.role === "admin") {
        navigate(CLIENT_ROUTES.ADMIN_DASHBOARD);
      } else {
        navigate(CLIENT_ROUTES.USER_DASHBOARD);
      }
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Error logging in."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      {errorMessage && <div>{errorMessage}</div>}
      <form onSubmit={handleClickSubmit}>
        <div className="login-form">
          <div className="login-fields">
            <input
              className="login-field-input"
              id="email"
              name="email"
              type="text"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <input
              className="login-field-input"
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <button
            className="button-primary"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
}
