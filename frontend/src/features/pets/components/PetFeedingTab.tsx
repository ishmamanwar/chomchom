import { useState } from "react";

interface FeedingEntry {
  id: string;
  time: string;
  food: string;
  quantity: string;
}

export default function PetFeedingTab() {
  const [entries, setEntries] = useState<FeedingEntry[]>([]);
  const [form, setForm] = useState<Omit<FeedingEntry, "id">>({
    time: "",
    food: "",
    quantity: "",
  });
  const [editId, setEditId] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const saveEntry = () => {
    if (!form.time || !form.food || !form.quantity) return;

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

    setForm({ time: "", food: "", quantity: "" });
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
      <h3>{editId !== null ? "Edit Feeding Entry" : "Add Feeding Entry"}</h3>
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
          {editId !== null ? "Update" : "Add"}
        </button>
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
