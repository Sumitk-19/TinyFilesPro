import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import api from "../api/api";

export default function ImageResize() {
  const [imageFile, setImageFile] = useState(null);
  const [imageURL, setImageURL] = useState(null);

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [unit, setUnit] = useState("px");
  const [format, setFormat] = useState("jpg");
  const [quality, setQuality] = useState(80);

  const [message, setMessage] = useState("");

  const onCropComplete = useCallback((_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const handleSubmit = async () => {
    if (!imageFile) {
      setMessage("Please select an image");
      return;
    }

    const form = new FormData();
    form.append("image", imageFile);
    form.append("width", width);
    form.append("height", height);
    form.append("unit", unit);
    form.append("format", format);
    form.append("quality", quality);

    // ✅ send crop only if valid
    if (
      croppedAreaPixels &&
      croppedAreaPixels.width > 0 &&
      croppedAreaPixels.height > 0
    ) {
      form.append("cropX", Math.round(croppedAreaPixels.x));
      form.append("cropY", Math.round(croppedAreaPixels.y));
      form.append("cropWidth", Math.round(croppedAreaPixels.width));
      form.append("cropHeight", Math.round(croppedAreaPixels.height));
    }

    try {
      const res = await api.post("/image/resize", form, {
        responseType: "blob",
      });

      // ✅ force download
      const blob = new Blob([res.data], {
        type: res.headers["content-type"],
      });

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `processed.${format}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);

      setMessage("Image processed and downloaded");
    } catch (err) {
      console.error(err);
      setMessage("Image processing failed");
    }
  };

  return (
    <div className="card glass-card">
      <h3>Crop & Resize Image</h3>

      {message && <div className="info">{message}</div>}

      {/* File input */}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files[0];
          if (!file) return;

          setImageFile(file);
          setImageURL(URL.createObjectURL(file));
          setCrop({ x: 0, y: 0 });
          setZoom(1);
        }}
      />

      {/* Cropper */}
      {imageURL && (
        <>
          <div className="crop-container">
            <Cropper
              image={imageURL}
              crop={crop}
              zoom={zoom}
              aspect={undefined}   // free crop
              cropShape="rect"
              showGrid={true}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>

          {/* Zoom slider */}
          <label>Zoom</label>
          <input
            type="range"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
          />
        </>
      )}

      {/* Resize inputs */}
      <div className="row">
        <input
          placeholder="Width"
          value={width}
          onChange={(e) => setWidth(e.target.value)}
        />
        <input
          placeholder="Height"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
      </div>

      <select value={unit} onChange={(e) => setUnit(e.target.value)}>
        <option value="px">Pixels (px)</option>
        <option value="cm">Centimeters (cm)</option>
        <option value="in">Inches (in)</option>
      </select>

      <select value={format} onChange={(e) => setFormat(e.target.value)}>
        <option value="jpg">JPG</option>
        <option value="png">PNG</option>
        <option value="webp">WEBP</option>
      </select>

      {(format === "jpg" || format === "webp") && (
        <>
          <label>Quality: {quality}</label>
          <input
            type="range"
            min={30}
            max={100}
            value={quality}
            onChange={(e) => setQuality(e.target.value)}
          />
        </>
      )}

      <button onClick={handleSubmit}>Crop & Resize</button>
    </div>
  );
}
