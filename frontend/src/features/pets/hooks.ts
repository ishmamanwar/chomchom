import { useEffect, useState } from "react";
import axios from "axios";
import { Pet } from "./Pet";

const API_BASE_URL = "http://127.0.0.1:5000";

export function usePets() {
  const [pets, setPets] = useState<Pet[]>([]);

  useEffect(() => {
    axios
      .get<Pet[]>(`${API_BASE_URL}/pets`)
      .then((response) => {
        setPets(response.data);
      })
      .catch((error) => console.error("Failed to fetch pets", error));
  }, []);

  const addPet = (pet: Omit<Pet, "id">) => {
    axios
      .post<Pet>(`${API_BASE_URL}/pets`, pet)
      .then((response) => {
        setPets((prev) => [...prev, response.data]);
      })
      .catch((error) => console.error("Failed to add pet", error));
  };

  const removePet = (id: string) => {
    axios
      .delete(`${API_BASE_URL}/pets/${id}`)
      .then(() => {
        setPets((prev) => prev.filter((pet) => pet.id !== id));
      })
      .catch((error) => console.error("Failed to delete pet", error));
  };

  const updatePet = (id: string, petData: Omit<Pet, "id">) => {
    axios
      .put<Pet>(`${API_BASE_URL}/pets/${id}`, petData)
      .then((response) => {
        setPets((prev) =>
          prev.map((pet) => (pet.id === id ? response.data : pet))
        );
      })
      .catch((error) => console.error("Failed to update pet", error));
  };

  return {
    pets,
    addPet,
    removePet,
    updatePet,
  };
}

export function usePetById(id: string | undefined) {
  const [pet, setPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setPet(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    axios
      .get<Pet>(`${API_BASE_URL}/pets/${id}`)
      .then((response) => {
        setPet(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch pet", error);
        setPet(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  return { pet, loading };
}
