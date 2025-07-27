import { useState, useEffect } from "react";
import { Pet } from "../../features/pets/Pet";
import { uploadFile } from "../../features/upload/hooks";

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
  const [errors, setErrors] = useState<{
    name?: string;
    type?: string;
    birthDate?: string;
  }>({});

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
    const newErrors: { name?: string; type?: string; birthDate?: string } = {};

    if (!name.trim()) {
      newErrors.name = "* Required";
    }

    if (!type) {
      newErrors.type = "* Required";
    }

    if (!birthDate) {
      newErrors.birthDate = "* Required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSave({ name, type, birthDate, imageUrl });
    }
  };

  return (
    <div className="modal-content">
      <div className="modal-header">
        <div className="modal-title">{pet ? "Edit Pet" : "Add New Pet"}</div>
        <button
          className="modal-close-button"
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>
      </div>

      <div>
        <label className="modal-label">
          Name:
          <input
            type="text"
            className={`modal-input ${errors.name ? "error" : ""}`}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name)
                setErrors((prev) => ({ ...prev, name: undefined }));
            }}
          />
          {errors.name && <div className="validation-error">{errors.name}</div>}
        </label>

        <label className="modal-label">
          Type:
          <select
            className={`modal-input ${errors.type ? "error" : ""}`}
            value={type}
            onChange={(e) => {
              setType(e.target.value);
              if (errors.type)
                setErrors((prev) => ({ ...prev, type: undefined }));
            }}
          >
            <option value="" disabled hidden>
              Select Type
            </option>
            <option value="cat">Cat</option>
            <option value="dog">Dog</option>
          </select>
          {errors.type && <div className="validation-error">{errors.type}</div>}
        </label>

        <label className="modal-label">
          Birth Date:
          <input
            type="date"
            className={`modal-input ${errors.birthDate ? "error" : ""}`}
            value={birthDate}
            onChange={(e) => {
              setBirthDate(e.target.value);
              if (errors.birthDate)
                setErrors((prev) => ({ ...prev, birthDate: undefined }));
            }}
          />
          {errors.birthDate && (
            <div className="validation-error">{errors.birthDate}</div>
          )}
        </label>

        <label className="modal-label">
          Image:
          <input
            type="file"
            className="modal-input"
            onChange={handleFileChange}
          />
        </label>
      </div>

      {fileUploading && <p>Uploading image...</p>}

      {imageUrl && (
        <div className="modal-preview-container">
          <img src={imageUrl} alt="Pet preview" className="modal-preview-img" />
        </div>
      )}

      <div className="modal-button-container">
        <button className="modal-save-button" onClick={handleSubmit}>
          Save
        </button>
      </div>
    </div>
  );
}
