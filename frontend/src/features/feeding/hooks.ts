import { useEffect, useState } from "react";
import axios from "axios";

export interface FeedingEntry {
  id: string;
  pet_id: string;
  time: string;
  food: string;
  quantity: string;
}

const API_BASE_URL = "http://127.0.0.1:5000/api";

export function useFeeding(petId: string) {
  const [entries, setEntries] = useState<FeedingEntry[]>([]);

  useEffect(() => {
    axios
      .get<FeedingEntry[]>(`${API_BASE_URL}/pets/${petId}/feeding`)
      .then((res) => setEntries(res.data))
      .catch((err) => console.error("Failed to fetch feeding entries", err));
  }, [petId]);

  const addEntry = (entry: Omit<FeedingEntry, "id" | "pet_id">) => {
    axios
      .post<FeedingEntry>(`${API_BASE_URL}/pets/${petId}/feeding`, entry)
      .then((res) => setEntries((prev) => [...prev, res.data]));
  };

  const updateEntry = (
    id: string,
    updated: Omit<FeedingEntry, "id" | "pet_id">
  ) => {
    axios
      .put(`${API_BASE_URL}/pets/${petId}/feeding/${id}`, updated)
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
      .delete(`${API_BASE_URL}/pets/${petId}/feeding/${id}`)
      .then(() =>
        setEntries((prev) => prev.filter((entry) => entry.id !== id))
      );
  };

  return { entries, addEntry, updateEntry, deleteEntry };
}
