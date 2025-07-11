import { useState } from "react";

interface MedicationEntry {
  time: string;
  medication: string;
  quantity: string;
}

export default function PetMedicationTab() {
  const [entries, setEntries] = useState<MedicationEntry[]>([]);
  const [form, setForm] = useState<MedicationEntry>({
    time: "",
    medication: "",
    quantity: "",
  });
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const saveEntry = () => {
    if (!form.time || !form.medication || !form.quantity) return;

    if (editIndex !== null) {
      const updated = [...entries];
      updated[editIndex] = form;
      setEntries(updated);
      setEditIndex(null);
    } else {
      setEntries([...entries, form]);
    }

    setForm({ time: "", medication: "", quantity: "" });
  };

  const deleteEntry = (index: number) => {
    const updated = [...entries];
    updated.splice(index, 1);
    setEntries(updated);
    if (editIndex === index) setEditIndex(null);
  };

  const editEntry = (index: number) => {
    setForm(entries[index]);
    setEditIndex(index);
  };

  return (
    <div>
      <h3>
        {editIndex !== null ? "Edit Medication Entry" : "Add Medication Entry"}
      </h3>
      <div style={{ display: "flex", gap: 8 }}>
        <input
          type="time"
          name="time"
          value={form.time}
          onChange={handleChange}
        />
        <input
          type="text"
          name="medication"
          value={form.medication}
          onChange={handleChange}
          placeholder="Medication"
        />
        <input
          type="text"
          name="quantity"
          value={form.quantity}
          onChange={handleChange}
          placeholder="Quantity"
        />
        <button onClick={saveEntry}>
          {editIndex !== null ? "Update" : "Add"}
        </button>
      </div>

      <h4 style={{ marginTop: 20 }}>Medication Schedule</h4>
      <ul>
        {entries.map((entry, index) => (
          <li key={index}>
            {entry.time} — {entry.medication} ({entry.quantity})
            <button onClick={() => editEntry(index)} style={{ marginLeft: 8 }}>
              Edit
            </button>
            <button
              onClick={() => deleteEntry(index)}
              style={{ marginLeft: 4 }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
