import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="page">
    <div className="hero-box">
      <h1>Welcome to TinyFiles</h1>
      <p>Resize images, merge PDFs, and track usage (with a free account).</p>
      <div className="actions">
        <Link className="btn" to="/image">Resize Image</Link>
        <Link className="btn" to="/pdf">Merge PDFs</Link>
      </div>
    </div>
    </div>
  );
}
