import { useNavigate } from "react-router-dom";
import { Pet } from "../../../features/pets/Pet";

interface Props {
  pet: Pet;
  onRemove: (id: string) => void;
  onEdit: (pet: Pet) => void;
}

export default function PetCard({ pet, onRemove, onEdit }: Props) {
  const navigate = useNavigate();

  return (
    <div className="pet-card" onClick={() => navigate(`/pets/${pet.id}`)}>
      <button
        className="edit-button"
        onClick={(e) => {
          e.stopPropagation();
          onEdit(pet);
        }}
        aria-label="Edit pet"
        title="Edit pet"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon-pencil"
          viewBox="0 0 24 24"
          width="16"
          height="16"
          fill="currentColor"
        >
          <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1.003 1.003 0 000-1.42l-2.34-2.34a1.003 1.003 0 00-1.42 0l-1.83 1.83 3.75 3.75 1.84-1.82z" />
        </svg>
      </button>
      <button
        className="remove-button"
        onClick={(e) => {
          e.stopPropagation();
          onRemove(pet.id);
        }}
        aria-label="Remove pet"
        title="Remove pet"
      >
        ✖
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
