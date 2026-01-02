import React, { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", form);

      toast.success("Registration successful! Please login.");

      setTimeout(() => {
       window.location.href = "/login";
      }, 1200);
    } catch (err) {
      setError(err?.response?.data?.message || "Registration failed");
    }
  };

  return (
    <form className="card" onSubmit={submit}>
      <h3>Register</h3>
      {error && <div className="error">{error}</div>}
      <input placeholder="Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
      <input placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
      <input type="password" placeholder="Password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
      <button>Signup</button>
    </form>
  );
}
