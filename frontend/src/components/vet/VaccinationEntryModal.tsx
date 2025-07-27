import React from "react";

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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev: { name: string; date: string }) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.date) return;
    onSave();
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
                className="modal-input short"
                placeholder="e.g., Rabies, Distemper, etc."
                required
              />
            </div>

            <div style={{ flex: 1 }}>
              <label className="modal-label">Date Given</label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="modal-input short"
                required
              />
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
