import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

interface VetAppointment {
  date: string;
  time: string;
}

interface Vaccination {
  name: string;
  date: string;
}

export default function PetVetTab() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [appointmentTime, setAppointmentTime] = useState("");
  const [appointments, setAppointments] = useState<VetAppointment[]>([]);
  const [appointmentEditIndex, setAppointmentEditIndex] = useState<
    number | null
  >(null);

  const [vaccinationForm, setVaccinationForm] = useState<Vaccination>({
    name: "",
    date: "",
  });
  const [vaccinations, setVaccinations] = useState<Vaccination[]>([]);
  const [vaccineEditIndex, setVaccineEditIndex] = useState<number | null>(null);

  const addOrUpdateAppointment = () => {
    if (!appointmentTime) return;
    const dateStr = selectedDate.toISOString().split("T")[0];
    const newEntry = { date: dateStr, time: appointmentTime };

    if (appointmentEditIndex !== null) {
      const updated = [...appointments];
      updated[appointmentEditIndex] = newEntry;
      setAppointments(updated);
      setAppointmentEditIndex(null);
    } else {
      setAppointments([...appointments, newEntry]);
    }

    setAppointmentTime("");
  };

  const editAppointment = (index: number) => {
    const appt = appointments[index];
    setSelectedDate(new Date(appt.date));
    setAppointmentTime(appt.time);
    setAppointmentEditIndex(index);
  };

  const deleteAppointment = (index: number) => {
    const updated = [...appointments];
    updated.splice(index, 1);
    setAppointments(updated);
    if (appointmentEditIndex === index) setAppointmentEditIndex(null);
  };

  const addOrUpdateVaccination = () => {
    if (!vaccinationForm.name || !vaccinationForm.date) return;

    if (vaccineEditIndex !== null) {
      const updated = [...vaccinations];
      updated[vaccineEditIndex] = vaccinationForm;
      setVaccinations(updated);
      setVaccineEditIndex(null);
    } else {
      setVaccinations([...vaccinations, vaccinationForm]);
    }

    setVaccinationForm({ name: "", date: "" });
  };

  const editVaccination = (index: number) => {
    setVaccinationForm(vaccinations[index]);
    setVaccineEditIndex(index);
  };

  const deleteVaccination = (index: number) => {
    const updated = [...vaccinations];
    updated.splice(index, 1);
    setVaccinations(updated);
    if (vaccineEditIndex === index) setVaccineEditIndex(null);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      {/* Calendar + Time Scheduler */}
      <section>
        <h3>Vet Appointment Calendar</h3>
        <Calendar
          value={selectedDate}
          onChange={(value) => {
            if (value instanceof Date) {
              setSelectedDate(value);
            }
          }}
        />
        <div style={{ marginTop: 16 }}>
          <label>
            Appointment time:
            <input
              type="time"
              value={appointmentTime}
              onChange={(e) => setAppointmentTime(e.target.value)}
              style={{ marginLeft: 8 }}
            />
          </label>
          <button onClick={addOrUpdateAppointment} style={{ marginLeft: 12 }}>
            {appointmentEditIndex !== null ? "Update" : "Add"} Appointment
          </button>
        </div>

        <h4 style={{ marginTop: 20 }}>Scheduled Appointments</h4>
        <ul>
          {appointments.map((appt, index) => (
            <li key={index}>
              {appt.date} — {appt.time}
              <button
                onClick={() => editAppointment(index)}
                style={{ marginLeft: 8 }}
              >
                Edit
              </button>
              <button
                onClick={() => deleteAppointment(index)}
                style={{ marginLeft: 4 }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* Vaccination History */}
      <section>
        <h3>Vaccination History</h3>
        <div style={{ display: "flex", gap: 8 }}>
          <input
            type="text"
            placeholder="Vaccine Name"
            value={vaccinationForm.name}
            onChange={(e) =>
              setVaccinationForm({ ...vaccinationForm, name: e.target.value })
            }
          />
          <input
            type="date"
            value={vaccinationForm.date}
            onChange={(e) =>
              setVaccinationForm({ ...vaccinationForm, date: e.target.value })
            }
          />
          <button onClick={addOrUpdateVaccination}>
            {vaccineEditIndex !== null ? "Update" : "Add"}
          </button>
        </div>

        <h4 style={{ marginTop: 20 }}>Past Vaccinations</h4>
        <ul>
          {vaccinations.map((vax, index) => (
            <li key={index}>
              {vax.date} — {vax.name}
              <button
                onClick={() => editVaccination(index)}
                style={{ marginLeft: 8 }}
              >
                Edit
              </button>
              <button
                onClick={() => deleteVaccination(index)}
                style={{ marginLeft: 4 }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
