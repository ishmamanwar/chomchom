import { Pet } from "../types";
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
        <img src={pet.imageUrl} alt={pet.name} />
      </div>
      <div className="pet-info-sticky">
        <h3>{pet.name}</h3>
        <p>
          <strong>Type:</strong> {pet.type}
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
