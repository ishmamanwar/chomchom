import { useParams } from "react-router-dom";
import { useFeeding } from "../../feeding/hooks";
import { useState } from "react";

export default function PetFeedingTab() {
  const { id: petId } = useParams<{ id: string }>();
  const { entries, addEntry, updateEntry, deleteEntry } = useFeeding(petId!);

  const [form, setForm] = useState({
    time: "",
    food: "",
    quantity: "",
  });
  const [editId, setEditId] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const save = () => {
    if (!form.time || !form.food || !form.quantity) return;

    if (editId) {
      updateEntry(editId, form);
      setEditId(null);
    } else {
      addEntry(form);
    }

    setForm({ time: "", food: "", quantity: "" });
  };

  const startEdit = (entryId: string) => {
    const entry = entries.find((e) => e.id === entryId);
    if (entry) {
      setForm({ time: entry.time, food: entry.food, quantity: entry.quantity });
      setEditId(entryId);
    }
  };

  return (
    <div>
      <h3>{editId ? "Edit Feeding Entry" : "Add Feeding Entry"}</h3>
      <div style={{ display: "flex", gap: 8 }}>
        <input
          type="time"
          name="time"
          value={form.time}
          onChange={handleChange}
        />
        <input
          type="text"
          name="food"
          value={form.food}
          onChange={handleChange}
          placeholder="Food"
        />
        <input
          type="text"
          name="quantity"
          value={form.quantity}
          onChange={handleChange}
          placeholder="Quantity"
        />
        <button onClick={save}>{editId ? "Update" : "Add"}</button>
      </div>

      <h4 style={{ marginTop: 20 }}>Feeding Schedule</h4>
      <ul>
        {entries
          .slice()
          .sort((a, b) => a.time.localeCompare(b.time))
          .map((entry) => (
            <li key={entry.id}>
              {entry.time} — {entry.food} ({entry.quantity})
              <button
                onClick={() => startEdit(entry.id)}
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
