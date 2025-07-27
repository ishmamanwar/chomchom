import { Pet } from "../../features/pets/Pet";
import { differenceInMonths, parseISO } from "date-fns";

interface Props {
  pet: Pet;
}

export default function PetOverviewTab({ pet }: Props) {
  const birthDate = parseISO(pet.birthDate);
  const ageInMonths = differenceInMonths(new Date(), birthDate);
  const years = Math.floor(ageInMonths / 12);
  const months = ageInMonths % 12;

  return (
    <div className="pet-overview-container">
      <div className="pet-image-frame">
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
      </div>
      <div className="pet-info-sticky">
        <h3>{pet.name}</h3>
        <p>
          <strong>Type:</strong>{" "}
          {pet.type.charAt(0).toUpperCase() + pet.type.slice(1)}
        </p>
        <p>
          <strong>Birth Date:</strong> {pet.birthDate}
        </p>
        <p>
          <strong>Age:</strong> {years} year(s) and {months} month(s)
        </p>
      </div>
    </div>
  );
}
