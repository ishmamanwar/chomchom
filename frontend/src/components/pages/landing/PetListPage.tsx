import { useState } from "react";
import { usePets } from "../../../features/pets/hooks";
import PetCard from "./PetCard";
import PetModal from "../../modals/PetModal";
import { Pet } from "../../../features/pets/Pet";

export default function PetListPage() {
  const { pets, addPet, updatePet, removePet } = usePets();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPet, setEditingPet] = useState<Pet | null>(null);

  const handleSave = (petData: Omit<Pet, "id">) => {
    if (editingPet) {
      // Update existing pet
      updatePet(editingPet.id, petData);
      setEditingPet(null);
    } else {
      // Add new pet
      const newPet = {
        id: crypto.randomUUID?.() || String(Date.now()),
        ...petData,
      };
      addPet(newPet);
    }
    setIsModalOpen(false);
  };

  const handleEdit = (pet: Pet) => {
    setEditingPet(pet);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingPet(null);
  };

  return (
    <div className="centered-container">
      <div className="content-container">
        <div className="pet-grid">
          {pets.map((pet) => (
            <PetCard
              key={pet.id}
              pet={pet}
              onRemove={removePet}
              onEdit={handleEdit}
            />
          ))}
          {pets.length < 10 && (
            <button
              className="add-pet-button-as-card"
              onClick={() => setIsModalOpen(true)}
              aria-label="Add new pet"
            >
              +
            </button>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <PetModal
            pet={editingPet}
            onSave={handleSave}
            onClose={handleCloseModal}
          />
        </div>
      )}
    </div>
  );
}
