import { useEffect, useState } from "react";
import axios from "axios";
import { Appointment } from "./Appointment";
import { Vaccination } from "./Vaccination";

const API_BASE = "http://127.0.0.1:5000";

export function useVet(petId: string) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [vaccinations, setVaccinations] = useState<Vaccination[]>([]);

  useEffect(() => {
    axios
      .get(`${API_BASE}/vet/${petId}`)
      .then((res) => {
        setAppointments(res.data.appointments);
        setVaccinations(res.data.vaccinations);
      })
      .catch((err) => console.error("Failed to load vet data", err));
  }, [petId]);

  const addAppointment = (appt: Omit<Appointment, "id">) => {
    axios
      .post(`${API_BASE}/vet/${petId}/appointments`, appt)
      .then((res) => setAppointments((prev) => [...prev, res.data]));
  };

  const updateAppointment = (id: string, updated: Partial<Appointment>) => {
    axios
      .put(`${API_BASE}/vet/${petId}/appointments/${id}`, updated)
      .then(() => {
        setAppointments((prev) =>
          prev.map((a) => (a.id === id ? { ...a, ...updated } : a))
        );
      });
  };

  const deleteAppointment = (id: string) => {
    axios
      .delete(`${API_BASE}/vet/${petId}/appointments/${id}`)
      .then(() => setAppointments((prev) => prev.filter((a) => a.id !== id)));
  };

  const addVaccination = (vax: Omit<Vaccination, "id">) => {
    axios
      .post(`${API_BASE}/vet/${petId}/vaccinations`, vax)
      .then((res) => setVaccinations((prev) => [...prev, res.data]));
  };

  const updateVaccination = (id: string, updated: Partial<Vaccination>) => {
    axios
      .put(`${API_BASE}/vet/${petId}/vaccinations/${id}`, updated)
      .then(() => {
        setVaccinations((prev) =>
          prev.map((v) => (v.id === id ? { ...v, ...updated } : v))
        );
      });
  };

  const deleteVaccination = (id: string) => {
    axios
      .delete(`${API_BASE}/vet/${petId}/vaccinations/${id}`)
      .then(() => setVaccinations((prev) => prev.filter((v) => v.id !== id)));
  };

  return {
    appointments,
    vaccinations,
    addAppointment,
    updateAppointment,
    deleteAppointment,
    addVaccination,
    updateVaccination,
    deleteVaccination,
  };
}
