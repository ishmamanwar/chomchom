import { usePets } from "../hooks";
import PetCard from "../../../components/PetCard";

export default function PetListPage() {
  const { pets, removePet } = usePets();

  return (
    <div style={{ padding: 32 }}>
      <h1>Your Pets</h1>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        {pets.map((pet) => (
          <PetCard key={pet.id} pet={pet} onRemove={removePet} />
        ))}
      </div>
    </div>
  );
}