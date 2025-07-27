import { useNavigate } from "react-router-dom";
import { Pet } from "../../../features/pets/Pet";

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
      <img
        src={
          pet.imageUrl
            ? pet.imageUrl
            : pet.type === "dog"
            ? "https://cdn.pixabay.com/photo/2022/01/26/02/10/dog-6967668_960_720.png"
            : "https://cdn.pixabay.com/photo/2020/11/15/18/31/cat-5746771_960_720.png"
        }
        alt={pet.name}
      />
      <h3>{pet.name}</h3>
      <p>{pet.birthDate}</p>
      <p className="sound">{pet.type === "dog" ? "~woof~" : "~meow~"}</p>
    </div>
  );
}
