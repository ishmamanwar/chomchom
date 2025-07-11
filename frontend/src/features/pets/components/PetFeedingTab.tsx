import { useState } from "react";

interface FeedingEntry {
  time: string;
  food: string;
  quantity: string;
}

export default function PetFeedingTab() {
  const [entries, setEntries] = useState<FeedingEntry[]>([]);
  const [form, setForm] = useState<FeedingEntry>({
    time: "",
    food: "",
    quantity: "",
  });
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const saveEntry = () => {
    if (!form.time || !form.food || !form.quantity) return;

    if (editIndex !== null) {
      const updated = [...entries];
      updated[editIndex] = form;
      setEntries(updated);
      setEditIndex(null);
    } else {
      setEntries([...entries, form]);
    }

    setForm({ time: "", food: "", quantity: "" });
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
      <h3>{editIndex !== null ? "Edit Feeding Entry" : "Add Feeding Entry"}</h3>
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
        <button onClick={saveEntry}>
          {editIndex !== null ? "Update" : "Add"}
        </button>
      </div>

      <h4 style={{ marginTop: 20 }}>Feeding Schedule</h4>
      <ul>
        {entries.map((entry, index) => (
          <li key={index}>
            {entry.time} — {entry.food} ({entry.quantity})
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
