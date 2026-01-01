import { useState } from "react";
import api from "../api/api";

export default function PdfCompress() {
  const [file, setFile] = useState(null);
  const [quality, setQuality] = useState(70);
  const [message, setMessage] = useState("");

  const submit = async () => {
    if (!file) {
      setMessage("Please select a PDF");
      return;
    }

    const form = new FormData();
    form.append("pdf", file);
    form.append("quality", quality);

    try {
      const res = await api.post("/pdf/compress", form, {
        responseType: "blob"
      });

      const blob = new Blob([res.data], {
        type: "application/pdf"
      });

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "compressed.pdf";
      a.click();

      setMessage("PDF compressed successfully");
    } catch {
      setMessage("Compression failed");
    }
  };

  return (
    <div className="card glass-card">
      <h3>Compress PDF</h3>

      {message && <div className="info">{message}</div>}

      <input
        type="file"
        accept="application/pdf"
        onChange={e => setFile(e.target.files[0])}
      />

      <label>Quality: {quality}</label>
      <input
        type="range"
        min="30"
        max="100"
        value={quality}
        onChange={e => setQuality(e.target.value)}
      />

      <button onClick={submit}>Compress</button>
    </div>
  );
}
