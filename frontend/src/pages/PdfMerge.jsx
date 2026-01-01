import React, { useState } from "react";
import api from "../api/api";

export default function PdfMerge() {
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    if (!files.length) return setMessage("Select at least one PDF");

    const form = new FormData();
    for (const f of files) form.append("pdfs", f);

    try {
      const res = await api.post("/pdf/merge", form, { responseType: "blob" });
      const blob = new Blob([res.data], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
      setMessage("Merged PDF opened in new tab.");
    } catch (err) {
      setMessage(err?.response?.data?.message || "Merge failed");
    }
  };

  return (
    <form className="card" onSubmit={submit}>
      <h3>Merge PDFs</h3>
      {message && <div className="info">{message}</div>}
      <input type="file" accept="application/pdf" multiple onChange={e => setFiles(Array.from(e.target.files))} />
      <button>Merge</button>
      <small>Tip: You can merge up to 10 PDFs (server limit).</small>
    </form>
  );
}
