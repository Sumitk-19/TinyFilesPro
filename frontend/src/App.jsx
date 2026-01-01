import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ImageResize from "./pages/ImageResize";
import ImageSize from "./pages/ImageSize";
import PdfMerge from "./pages/PdfMerge";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import PdfCompress from "./pages/PdfCompress";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/image" element={<ImageResize />} />
          <Route path="/image-size" element={<ImageSize />} />
          <Route path="/pdf" element={<PdfMerge />} />
          <Route path="/pdf-compress" element={<PdfCompress />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
