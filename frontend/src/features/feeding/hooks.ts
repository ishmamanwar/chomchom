import { useEffect, useState } from "react";
import axios from "axios";
import { FeedingEntry } from "./FeedingEntry";

const API_BASE_URL = "https://chomchom-backend.onrender.com";

export function useFeeding(petId: string) {
  const [entries, setEntries] = useState<FeedingEntry[]>([]);

  useEffect(() => {
    axios
      .get<FeedingEntry[]>(`${API_BASE_URL}/feeding/${petId}`)
      .then((res) => setEntries(res.data))
      .catch((err) => console.error("Failed to fetch feeding entries", err));
  }, [petId]);

  const addEntry = (entry: Omit<FeedingEntry, "id" | "pet_id">) => {
    const entryWithPetId = {
      ...entry,
      pet_id: petId,
    };

    axios
      .post<FeedingEntry>(`${API_BASE_URL}/feeding`, entryWithPetId)
      .then((res) => setEntries((prev) => [...prev, res.data]));
  };

  const updateEntry = (
    id: string,
    updated: Omit<FeedingEntry, "id" | "pet_id">
  ) => {
    axios
      .put(`${API_BASE_URL}/feeding/${id}`, updated)
      .then(() =>
        setEntries((prev) =>
          prev.map((entry) =>
            entry.id === id ? { ...entry, ...updated } : entry
          )
        )
      );
  };

  const deleteEntry = (id: string) => {
    axios
      .delete(`${API_BASE_URL}/feeding/${id}`)
      .then(() =>
        setEntries((prev) => prev.filter((entry) => entry.id !== id))
      );
  };

  return { entries, addEntry, updateEntry, deleteEntry };
}
