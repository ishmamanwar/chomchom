import { useState, useEffect } from "react";
import { Pet } from "../features/pets/types";
import { uploadFile } from "../features/upload/hooks";

interface PetModalProps {
  pet?: Pet | null;
  onSave: (petData: Omit<Pet, "id">) => void;
  onClose: () => void;
}

export default function PetModal({ pet, onSave, onClose }: PetModalProps) {
  const [name, setName] = useState(pet?.name || "");
  const [type, setType] = useState(pet?.type || "");
  const [birthDate, setBirthDate] = useState(pet?.birthDate || "");
  const [imageUrl, setImageUrl] = useState(pet?.imageUrl || "");
  const [fileUploading, setFileUploading] = useState(false);

  useEffect(() => {
    setName(pet?.name || "");
    setType(pet?.type || "");
    setBirthDate(pet?.birthDate || "");
    setImageUrl(pet?.imageUrl || "");
  }, [pet]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setFileUploading(true);
      const uploadedUrl = await uploadFile(file);
      setImageUrl(uploadedUrl);
    } catch (err: any) {
      alert("Upload failed: " + (err?.response?.data?.error || err.message));
    } finally {
      setFileUploading(false);
    }
  };

  const handleSubmit = () => {
    if (!name || !type || !birthDate) return;
    onSave({ name, type, birthDate, imageUrl });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        width: "100%",
        alignItems: "center",
      }}
    >
      <h2 style={{ textAlign: "center", margin: 0 }}>
        {pet ? "Edit Pet" : "Add New Pet"}
      </h2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          maxWidth: 300,
        }}
      >
        <label style={{ marginBottom: 8 }}>
          Name:
          <input
            style={{ width: "100%", marginTop: 4 }}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label style={{ marginBottom: 8 }}>
          Type:
          <input
            style={{ width: "100%", marginTop: 4 }}
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
        </label>

        <label style={{ marginBottom: 8 }}>
          Birth Date:
          <input
            type="date"
            style={{ width: "100%", marginTop: 4 }}
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
          />
        </label>

        <label style={{ marginBottom: 8 }}>
          Image:
          <input
            type="file"
            onChange={handleFileChange}
            style={{ marginTop: 4 }}
          />
        </label>
      </div>

      {fileUploading && <p>Uploading image...</p>}
      {imageUrl && (
        <div style={{ marginTop: 8 }}>
          <img
            src={imageUrl}
            alt="Pet preview"
            style={{ maxWidth: "150px", borderRadius: "8px" }}
          />
        </div>
      )}

      <div style={{ marginTop: 16 }}>
        <button onClick={handleSubmit}>Save</button>
        <button onClick={onClose} style={{ marginLeft: 8 }}>
          Cancel
        </button>
      </div>
    </div>
  );
}
