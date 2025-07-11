import { useEffect, useState } from "react";
import axios from "axios";
import { Pet } from "./types";

const API_BASE_URL = "http://127.0.0.1:5000/api";

export function usePets() {
  const [pets, setPets] = useState<Pet[]>([]);

  useEffect(() => {
    axios
      .get<Pet[]>(`${API_BASE_URL}/pets`)
      .then((response) => setPets(response.data))
      .catch((error) => console.error("Failed to fetch pets", error));
  }, []);

  const removePet = (id: string) => {
    axios
      .delete(`${API_BASE_URL}/pets/${id}`)
      .then(() => {
        setPets((prev) => prev.filter((pet) => pet.id !== id));
      })
      .catch((error) => console.error("Failed to delete pet", error));
  };

  return {
    pets,
    removePet,
  };
}
