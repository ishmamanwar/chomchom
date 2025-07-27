import React, { useState } from "react";

const unitOptions = ["g", "mg", "ml", "can", "pk"];

export default function FeedingEntryModal({
  form,
  setForm,
  onClose,
  onSave,
  isEdit,
}: {
  form: { time: string; food: string; quantity: string };
  setForm: React.Dispatch<React.SetStateAction<typeof form>>;
  onClose: () => void;
  onSave: () => void;
  isEdit: boolean;
}) {
  const [errors, setErrors] = useState<{
    time?: string;
    food?: string;
    quantity?: string;
  }>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className="modal-overlay feeding-modal">
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal-title">
            {isEdit ? "Edit Feeding Entry" : "Add Feeding Entry"}
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
              className={`modal-input short ${errors.time ? "error" : ""}`}
            />
            {errors.time && (
              <div className="validation-error">{errors.time}</div>
            )}
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
                  if (errors.quantity) {
                    setErrors((prev) => ({ ...prev, quantity: undefined }));
                  }
                }}
                className={`modal-input short ${
                  errors.quantity ? "error" : ""
                }`}
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
            {errors.quantity && (
              <div className="validation-error">{errors.quantity}</div>
            )}
          </div>
        </div>

        <div style={{ width: "100%" }}>
          <label className="modal-label">Food</label>
          <input
            type="text"
            name="food"
            value={form.food}
            onChange={handleChange}
            className={`modal-input ${errors.food ? "error" : ""}`}
          />
          {errors.food && <div className="validation-error">{errors.food}</div>}
        </div>

        <div className="modal-button-container">
          <button
            className="modal-save-button"
            onClick={(e) => {
              e.preventDefault();
              const newErrors: {
                time?: string;
                food?: string;
                quantity?: string;
              } = {};

              if (!form.time.trim()) {
                newErrors.time = "* Required";
              }

              if (!form.food.trim()) {
                newErrors.food = "* Required";
              }

              if (!form.quantity.trim()) {
                newErrors.quantity = "* Required";
              }

              setErrors(newErrors);

              if (Object.keys(newErrors).length === 0) {
                onSave();
              }
            }}
          >
            {isEdit ? "Update" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}
