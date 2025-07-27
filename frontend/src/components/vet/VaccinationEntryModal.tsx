import React, { useState } from "react";

export default function VaccinationEntryModal({
  form,
  setForm,
  onClose,
  onSave,
  isEdit,
}: {
  form: { name: string; date: string };
  setForm: React.Dispatch<React.SetStateAction<{ name: string; date: string }>>;
  onClose: () => void;
  onSave: () => void;
  isEdit: boolean;
}) {
  const [errors, setErrors] = useState<{ name?: string; date?: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev: { name: string; date: string }) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = () => {
    const newErrors: { name?: string; date?: string } = {};

    if (!form.name.trim()) {
      newErrors.name = "* Required";
    }

    if (!form.date) {
      newErrors.date = "* Required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSave();
    }
  };

  return (
    <div className="modal-overlay vet-modal">
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal-title">
            {isEdit ? "Edit Vaccination Record" : "Add Vaccination Record"}
          </div>
          <button className="modal-close-button" onClick={onClose}>
            ✖
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <div className="modal-input-group">
            <div style={{ flex: 1 }}>
              <label className="modal-label">Vaccine Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className={`modal-input short ${errors.name ? "error" : ""}`}
                placeholder="e.g., Rabies, Distemper, etc."
              />
              {errors.name && (
                <div className="validation-error">{errors.name}</div>
              )}
            </div>

            <div style={{ flex: 1 }}>
              <label className="modal-label">Date Given</label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className={`modal-input short ${errors.date ? "error" : ""}`}
              />
              {errors.date && (
                <div className="validation-error">{errors.date}</div>
              )}
            </div>
          </div>

          <div
            className="modal-button-container"
            style={{ textAlign: "center" }}
          >
            <button type="submit" className="modal-save-button">
              {isEdit ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
