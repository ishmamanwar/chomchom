import { useNavigate } from "react-router-dom";
import { Pet } from "../features/pets/types";

interface Props {
  pet: Pet;
  onRemove: (id: string) => void;
}

export default function PetCard({ pet, onRemove }: Props) {
  const navigate = useNavigate();

  return (
    <div className="pet-card" onClick={() => navigate(`/pets/${pet.id}`)}>
      <button
        className="remove-button"
        onClick={(e) => {
          e.stopPropagation();
          onRemove(pet.id);
        }}
        aria-label="Remove pet"
      >
        🗑️
      </button>
      <img src={pet.imageUrl} alt={pet.name} />
      <h3>{pet.name}</h3>
      <p>Birthday: {pet.birthDate}</p>
      <p className="sound">{pet.type === "dog" ? "🐶 bark" : "🐱 meow"}</p>
    </div>
  );
}
