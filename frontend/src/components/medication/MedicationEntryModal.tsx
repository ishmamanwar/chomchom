import React from "react";

const unitOptions = ["g", "mg", "ml", "tab"];

export default function MedicationEntryModal({
  form,
  setForm,
  onClose,
  onSave,
  isEdit,
}: {
  form: { time: string; med: string; quantity: string };
  setForm: React.Dispatch<React.SetStateAction<typeof form>>;
  onClose: () => void;
  onSave: () => void;
  isEdit: boolean;
}) {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="modal-overlay medication-modal">
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal-title">
            {isEdit ? "Edit Medication Entry" : "Add Medication Entry"}
          </div>
          <button className="modal-close-button" onClick={onClose}>
            ✖
          </button>
        </div>

        <div className="modal-input-group">
          <div style={{ flex: 1 }}>
            <label className="modal-label">Time</label>
            <input
              type="time"
              name="time"
              value={form.time}
              onChange={handleChange}
              className="modal-input short"
            />
          </div>

          <div style={{ flex: 1 }}>
            <label className="modal-label">Quantity</label>
            <div className="quantity-combo">
              <input
                type="number"
                name="quantity"
                value={form.quantity.match(/^\d+(\.\d+)?/)?.[0] || ""}
                onChange={(e) => {
                  const currentUnit =
                    form.quantity.match(/[a-zA-Z]+$/)?.[0] || "";
                  const value = e.target.value;
                  setForm((prev) => ({
                    ...prev,
                    quantity: currentUnit ? `${value} ${currentUnit}` : value,
                  }));
                }}
                className="modal-input short"
              />
              <select
                className="unit-dropdown"
                value={form.quantity.match(/[a-zA-Z]+$/)?.[0] || ""}
                onChange={(e) => {
                  const unit = e.target.value;
                  const numericPart =
                    form.quantity.match(/^\d+(\.\d+)?/)?.[0] || "";
                  setForm((prev) => ({
                    ...prev,
                    quantity: unit ? `${numericPart} ${unit}` : numericPart,
                  }));
                }}
              >
                <option value="">--</option>
                {unitOptions.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div style={{ width: "100%" }}>
          <label className="modal-label">Medication</label>
          <input
            type="text"
            name="med"
            value={form.med}
            onChange={handleChange}
            className="modal-input"
          />
        </div>

        <div className="modal-button-container">
          <button className="modal-save-button" onClick={onSave}>
            {isEdit ? "Update" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}
