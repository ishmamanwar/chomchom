import { useState } from "react";

interface MedicationEntry {
  id: string;
  time: string;
  medication: string;
  quantity: string;
}

export default function PetMedicationTab() {
  const [entries, setEntries] = useState<MedicationEntry[]>([]);
  const [form, setForm] = useState<Omit<MedicationEntry, "id">>({
    time: "",
    medication: "",
    quantity: "",
  });
  const [editId, setEditId] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const saveEntry = () => {
    if (!form.time || !form.medication || !form.quantity) return;

    if (editId !== null) {
      setEntries((prev) =>
        prev.map((entry) =>
          entry.id === editId ? { ...entry, ...form } : entry
        )
      );
      setEditId(null);
    } else {
      setEntries((prev) => [
        ...prev,
        {
          id: crypto.randomUUID?.() || String(Date.now()),
          ...form,
        },
      ]);
    }

    setForm({ time: "", medication: "", quantity: "" });
  };

  const deleteEntry = (id: string) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
    if (editId === id) setEditId(null);
  };

  const editEntry = (id: string) => {
    const entry = entries.find((e) => e.id === id);
    if (entry) {
      const { id: _, ...rest } = entry;
      setForm(rest);
      setEditId(id);
    }
  };

  return (
    <div>
      <h3>
        {editId !== null ? "Edit Medication Entry" : "Add Medication Entry"}
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
          {editId !== null ? "Update" : "Add"}
        </button>
      </div>

      <h4 style={{ marginTop: 20 }}>Medication Schedule</h4>
      <ul>
        {entries
          .slice()
          .sort((a, b) => a.time.localeCompare(b.time))
          .map((entry) => (
            <li key={entry.id}>
              {entry.time} — {entry.medication} ({entry.quantity})
              <button
                onClick={() => editEntry(entry.id)}
                style={{ marginLeft: 8 }}
              >
                Edit
              </button>
              <button
                onClick={() => deleteEntry(entry.id)}
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
