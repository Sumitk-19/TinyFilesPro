import { useState } from "react";
import api from "../api/api";

export default function ImageSize() {
  const [imageFile, setImageFile] = useState(null);
  const [targetKB, setTargetKB] = useState(20);
  const [format, setFormat] = useState("jpg");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    if (!imageFile) {
      setMessage("Please select an image");
      return;
    }

    const form = new FormData();
    form.append("image", imageFile);
    form.append("targetKB", targetKB);
    form.append("format", format);

    try {
      const res = await api.post("/image/target-size", form, {
        responseType: "blob",
      });

      const blob = new Blob([res.data], {
        type: res.headers["content-type"],
      });

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `compressed-${targetKB}kb.${format}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);

      setMessage("Image resized to target size and downloaded");
    } catch (err) {
      console.error(err);
      setMessage("Image compression failed");
    }
  };

  return (
    <div className="card glass-card">
      <h3>Resize Image by Size</h3>

      {message && <div className="info">{message}</div>}

      {/* File input */}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImageFile(e.target.files[0])}
      />

      {/* Target size */}
      <label>Target Size: {targetKB} KB</label>
      <input
        type="range"
        min={10}
        max={500}
        step={5}
        value={targetKB}
        onChange={(e) => setTargetKB(Number(e.target.value))}
      />

      <input
        type="number"
        min={10}
        max={500}
        value={targetKB}
        onChange={(e) => setTargetKB(Number(e.target.value))}
        placeholder="Target size in KB"
      />

      {/* Format */}
      <select value={format} onChange={(e) => setFormat(e.target.value)}>
        <option value="jpg">JPG</option>
        <option value="webp">WEBP</option>
      </select>

      <button onClick={handleSubmit}>Compress Image</button>
    </div>
  );
}
