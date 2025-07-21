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
    <div className="centered-container">
      <button onClick={() => setIsModalOpen(true)} className="add-pet-button">
        ➕
      </button>
      <div className="pet-grid">
        {pets.map((pet) => (
          <PetCard key={pet.id} pet={pet} onRemove={removePet} />
        ))}
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
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
