import { useEffect, useState } from "react";
import axios from "axios";
import { MedicationEntry } from "./MedicationEntry";

const API_BASE_URL = "https://chomchom-backend.onrender.com";

export function useMedication(petId: string) {
  const [entries, setEntries] = useState<MedicationEntry[]>([]);

  useEffect(() => {
    if (!petId) return;

    axios
      .get<MedicationEntry[]>(`${API_BASE_URL}/medications/${petId}`)
      .then((res) => setEntries(res.data))
      .catch((err) => console.error("Failed to fetch medication entries", err));
  }, [petId]);

  const add = (entry: Omit<MedicationEntry, "id">) => {
    const entryWithPetId = {
      ...entry,
      pet_id: petId,
    };

    axios
      .post<MedicationEntry>(`${API_BASE_URL}/medications`, entryWithPetId)
      .then((res) => setEntries((prev) => [...prev, res.data]))
      .catch((err) => console.error("Failed to add medication entry", err));
  };

  const remove = (id: string) => {
    axios
      .delete(`${API_BASE_URL}/medications/${id}`)
      .then(() => setEntries((prev) => prev.filter((e) => e.id !== id)))
      .catch((err) => console.error("Failed to delete medication entry", err));
  };

  const update = (id: string, updated: Omit<MedicationEntry, "id">) => {
    axios
      .put(`${API_BASE_URL}/medications/${id}`, updated)
      .then(() =>
        setEntries((prev) =>
          prev.map((e) => (e.id === id ? { ...e, ...updated } : e))
        )
      )
      .catch((err) => console.error("Failed to update medication entry", err));
  };

  return {
    entries,
    add,
    remove,
    update,
  };
}
