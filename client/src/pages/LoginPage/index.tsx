import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";


export const authFetch = (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem("token");

  return fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    // TEMP: Auto-seed test user
    fetch(`${API_BASE_URL}/api/seed-user`, { method: "POST" })
      .then((res) => res.json())
      .then((data) => console.log("✅ Seed response:", data))
      .catch((err) => console.error("❌ Seeding error:", err));
  }, []);
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (username === "" || password === "") {
      setErrorMessage("Please enter both username and password");
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.message || "Login failed");
        return;
      }

      localStorage.setItem("token", data.token); // Save JWT!
      login(); // Still call your context or global login handler
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("Something went wrong, please try again.");
    }
  };

  return (
    <div className="login-background">
      <h1>Rockin' Records</h1>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            className="modal-input"
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            className="modal-input"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <button type="submit" className="submit-btn">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
