import { useParams } from "react-router-dom";
import { useMedication } from "../../medications/hooks";
import { useState } from "react";

export default function PetMedicationTab() {
  const { id: petId } = useParams();
  const { entries, add, remove, update } = useMedication(petId || "");

  const [form, setForm] = useState({
    time: "",
    med: "",
    quantity: "",
  });

  const [editId, setEditId] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const saveEntry = () => {
    if (!form.time || !form.med || !form.quantity) return;

    if (editId !== null) {
      update(editId, form);
      setEditId(null);
    } else {
      add(form);
    }

    setForm({ time: "", med: "", quantity: "" });
  };

  const editEntry = (entryId: string) => {
    const entry = entries.find((e) => e.id === entryId);
    if (entry) {
      setForm({ time: entry.time, med: entry.med, quantity: entry.quantity });
      setEditId(entryId);
    }
  };

  return (
    <div>
      <h3>{editId ? "Edit Medication Entry" : "Add Medication Entry"}</h3>
      <div style={{ display: "flex", gap: 8 }}>
        <input
          type="time"
          name="time"
          value={form.time}
          onChange={handleChange}
        />
        <input
          type="text"
          name="med"
          placeholder="Medication"
          value={form.med}
          onChange={handleChange}
        />
        <input
          type="text"
          name="quantity"
          placeholder="Quantity"
          value={form.quantity}
          onChange={handleChange}
        />
        <button onClick={saveEntry}>{editId ? "Update" : "Add"}</button>
      </div>

      <h4 style={{ marginTop: 20 }}>Medication Schedule</h4>
      <ul>
        {entries
          .slice()
          .sort((a, b) => a.time.localeCompare(b.time))
          .map((entry) => (
            <li key={entry.id}>
              {entry.time} — {entry.med} ({entry.quantity})
              <button
                onClick={() => editEntry(entry.id)}
                style={{ marginLeft: 8 }}
              >
                Edit
              </button>
              <button
                onClick={() => remove(entry.id)}
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
