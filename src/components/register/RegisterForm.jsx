import { useState } from "react";
import api from "../../api/axiosConfig";

export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", { username, password });
      setSuccess("Account created successfully! You can now log in.");
    } catch {
      setSuccess("Error registering user.");
    }
  };

  return (
    <form onSubmit={handleRegister} className="register-form">
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Register</button>
      {success && <p>{success}</p>}
    </form>
  );
}