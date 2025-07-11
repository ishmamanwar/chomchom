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

  const [vaccinationForm, setVaccinationForm] = useState<Vaccination>({
    name: "",
    date: "",
  });
  const [vaccinations, setVaccinations] = useState<Vaccination[]>([]);

  const addAppointment = () => {
    if (!appointmentTime) return;
    const dateStr = selectedDate.toISOString().split("T")[0];
    setAppointments([
      ...appointments,
      { date: dateStr, time: appointmentTime },
    ]);
    setAppointmentTime("");
  };

  const addVaccination = () => {
    if (!vaccinationForm.name || !vaccinationForm.date) return;
    setVaccinations([...vaccinations, vaccinationForm]);
    setVaccinationForm({ name: "", date: "" });
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
          <button onClick={addAppointment} style={{ marginLeft: 12 }}>
            Add Appointment
          </button>
        </div>

        <h4 style={{ marginTop: 20 }}>Scheduled Appointments</h4>
        <ul>
          {appointments.map((appt, index) => (
            <li key={index}>
              {appt.date} — {appt.time}
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
          <button onClick={addVaccination}>Add</button>
        </div>

        <h4 style={{ marginTop: 20 }}>Past Vaccinations</h4>
        <ul>
          {vaccinations.map((vax, index) => (
            <li key={index}>
              {vax.date} — {vax.name}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
