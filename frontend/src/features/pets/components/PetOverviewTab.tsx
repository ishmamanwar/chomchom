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
    <div>
      <img
        src={pet.imageUrl}
        alt={pet.name}
        width={150}
        height={150}
        style={{ borderRadius: "50%", objectFit: "cover" }}
      />
      <p><strong>Type:</strong> {pet.type}</p>
      <p><strong>Age:</strong> {years} year(s) and {months} month(s)</p>
    </div>
  );
}