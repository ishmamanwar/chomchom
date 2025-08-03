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
  const [birth_date, setBirthDate] = useState(pet?.birth_date || "");
  const [image_url, setImageUrl] = useState(pet?.image_url || "");
  const [fileUploading, setFileUploading] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    type?: string;
    birth_date?: string;
  }>({});

  useEffect(() => {
    setName(pet?.name || "");
    setType(pet?.type || "");
    setBirthDate(pet?.birth_date || "");
    setImageUrl(pet?.image_url || "");
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
    const newErrors: { name?: string; type?: string; birth_date?: string } = {};

    if (!name.trim()) {
      newErrors.name = "* Required";
    }

    if (!type) {
      newErrors.type = "* Required";
    }

    if (!birth_date) {
      newErrors.birth_date = "* Required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const petData = { name, type, birth_date, image_url };
      onSave(petData);
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
            className={`modal-input ${errors.birth_date ? "error" : ""}`}
            value={birth_date}
            onChange={(e) => {
              setBirthDate(e.target.value);
              if (errors.birth_date)
                setErrors((prev) => ({ ...prev, birth_date: undefined }));
            }}
          />
          {errors.birth_date && (
            <div className="validation-error">{errors.birth_date}</div>
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

      {image_url && (
        <div className="modal-preview-container">
          <img
            src={image_url}
            alt="Pet preview"
            className="modal-preview-img"
          />
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
