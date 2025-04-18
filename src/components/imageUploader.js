import { useState } from "react";

const ImageUploader = ({ onUpload }) => {
  const [preview, setPreview] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file)); // Temporary preview
    uploadImage(file);
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    // Replace with your backend API endpoint
    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    onUpload(data.url); // Pass uploaded URL back to parent
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {preview && <img src={preview} alt="Preview" style={{ maxWidth: "200px" }} />}
    </div>
  );
};

export default ImageUploader;
