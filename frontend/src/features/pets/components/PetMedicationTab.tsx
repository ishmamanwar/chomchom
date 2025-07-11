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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addEntry = () => {
    if (!form.time || !form.medication || !form.quantity) return;
    setEntries([...entries, form]);
    setForm({ time: "", medication: "", quantity: "" });
  };

  return (
    <div>
      <h3>Add Medication Entry</h3>
      <div style={{ display: "flex", gap: 8 }}>
        <input
          type="time"
          name="time"
          value={form.time}
          onChange={handleChange}
          placeholder="Time"
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
        <button onClick={addEntry}>Add</button>
      </div>

      <h4 style={{ marginTop: 20 }}>Medication Schedule</h4>
      <ul>
        {entries.map((entry, index) => (
          <li key={index}>
            {entry.time} — {entry.medication} ({entry.quantity})
          </li>
        ))}
      </ul>
    </div>
  );
}