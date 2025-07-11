import { useState } from "react";
import { Pet } from "./types";
import { mockPets } from "./mockPets";

export function usePets() {
  const [pets, setPets] = useState<Pet[]>(mockPets);

  const addPet = (pet: Pet) => setPets((prev) => [...prev, pet]);
  const removePet = (id: string) =>
    setPets((prev) => prev.filter((pet) => pet.id !== id));

  return { pets, addPet, removePet };
}