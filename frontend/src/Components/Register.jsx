import { useState } from "react";
import { registerUser } from "../api/Auth";
import "./Register.css";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await registerUser(form);

    alert("Registered Successfully 🎉");

  } catch (error) {
    if (error.response?.data?.message === "User already exists") {
      alert("⚠️ Account already exists! Please login.");
    } else {
      alert("Something went wrong");
    }
  }
};

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Create Account ✨</h2>
        <p>Join us today</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Full Name"
              required
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />
          </div>

          <div className="input-group">
            <input
              type="email"
              placeholder="Email Address"
              required
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              required
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />
          </div>

          <button type="submit">Register</button>
        </form>

        <div className="extra-text">
          <p>Already have an account? <a href="/login">Login</a></p>
        </div>
      </div>
    </div>
  );
}

export default Register;