import { Pet } from "../features/pets/types";

interface Props {
  pet: Pet;
  onRemove: (id: string) => void;
}

export default function PetCard({ pet, onRemove }: Props) {
  return (
    <div style={{ border: "1px solid #ccc", borderRadius: 8, padding: 16 }}>
      <img
        src={pet.imageUrl}
        alt={pet.name}
        width={100}
        height={100}
        style={{ objectFit: "cover", borderRadius: "50%" }}
      />
      <h3>{pet.name}</h3>
      <p>Type: {pet.type}</p>
      <button onClick={() => onRemove(pet.id)}>Remove</button>
    </div>
  );
}