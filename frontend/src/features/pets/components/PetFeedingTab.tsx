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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addEntry = () => {
    if (!form.time || !form.food || !form.quantity) return;
    setEntries([...entries, form]);
    setForm({ time: "", food: "", quantity: "" });
  };

  return (
    <div>
      <h3>Add Feeding Entry</h3>
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
        <button onClick={addEntry}>Add</button>
      </div>

      <h4 style={{ marginTop: 20 }}>Feeding Schedule</h4>
      <ul>
        {entries.map((entry, index) => (
          <li key={index}>
            {entry.time} — {entry.food} ({entry.quantity})
          </li>
        ))}
      </ul>
    </div>
  );
}