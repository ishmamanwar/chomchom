import { useState } from "react";
import { usePets } from "../hooks";
import PetCard from "../../../components/PetCard";
import PetModal from "../../../components/PetModal";
import { Pet } from "../../../features/pets/types";

export default function PetListPage() {
  const { pets, addPet, removePet } = usePets();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSave = (petData: Omit<Pet, "id">) => {
    const newPet = {
      id: crypto.randomUUID?.() || String(Date.now()),
      ...petData,
    };
    addPet(newPet);
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
              width: 400,
              boxShadow: "0 0 12px rgba(0, 0, 0, 0.2)", // shadow here only
            }}
          >
            <PetModal
              pet={null}
              onSave={handleSave}
              onClose={() => setIsModalOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
