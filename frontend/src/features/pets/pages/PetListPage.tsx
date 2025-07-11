import { useState } from "react";
import { usePets } from "../hooks";
import PetCard from "../../../components/PetCard";

export default function PetListPage() {
  const { pets, removePet } = usePets();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    type: "dog" as "dog" | "cat" | "bird" | "other",
    birthDate: "",
    imageUrl: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!form.name || !form.birthDate) return;

    const newPet = {
      id: crypto.randomUUID?.() || String(Date.now()),
      ...form,
    };

    setForm({ name: "", type: "dog", birthDate: "", imageUrl: "" });
    setIsModalOpen(false);
  };

  return (
    <div style={{ padding: 32 }}>
      <h1>Your Pets</h1>

      <button onClick={() => setIsModalOpen(true)} style={{ marginBottom: 16 }}>
        ➕ Add Pet
      </button>

      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        {pets.map((pet) => (
          <PetCard key={pet.id} pet={pet} onRemove={removePet} />
        ))}
      </div>

      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "white",
              padding: 24,
              borderRadius: 8,
              display: "flex",
              flexDirection: "column",
              gap: 12,
              width: 320,
            }}
          >
            <h2>Add New Pet</h2>

            <input
              type="text"
              name="name"
              placeholder="Pet Name"
              value={form.name}
              onChange={handleChange}
            />

            <select name="type" value={form.type} onChange={handleChange}>
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
              <option value="bird">Bird</option>
              <option value="other">Other</option>
            </select>

            <input
              type="date"
              name="birthDate"
              value={form.birthDate}
              onChange={handleChange}
            />

            <input
              type="text"
              name="imageUrl"
              placeholder="Image URL (optional)"
              value={form.imageUrl}
              onChange={handleChange}
            />

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button onClick={() => setIsModalOpen(false)}>Cancel</button>
              <button onClick={handleSubmit}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
