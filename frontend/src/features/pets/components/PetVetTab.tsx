import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

interface VetAppointment {
  id: string;
  date: string;
  time: string;
}

interface Vaccination {
  id: string;
  name: string;
  date: string;
}

export default function PetVetTab() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [appointmentTime, setAppointmentTime] = useState("");
  const [appointments, setAppointments] = useState<VetAppointment[]>([]);
  const [appointmentEditId, setAppointmentEditId] = useState<string | null>(
    null
  );

  const [vaccinationForm, setVaccinationForm] = useState<
    Omit<Vaccination, "id">
  >({
    name: "",
    date: "",
  });
  const [vaccinations, setVaccinations] = useState<Vaccination[]>([]);
  const [vaccineEditId, setVaccineEditId] = useState<string | null>(null);

  const addOrUpdateAppointment = () => {
    if (!appointmentTime) return;

    const dateStr = selectedDate.toISOString().split("T")[0];
    const newAppt = {
      date: dateStr,
      time: appointmentTime,
    };

    if (appointmentEditId !== null) {
      setAppointments((prev) =>
        prev.map((entry) =>
          entry.id === appointmentEditId ? { ...entry, ...newAppt } : entry
        )
      );
      setAppointmentEditId(null);
    } else {
      setAppointments((prev) => [
        ...prev,
        {
          id: crypto.randomUUID?.() || String(Date.now()),
          ...newAppt,
        },
      ]);
    }

    setAppointmentTime("");
  };

  const editAppointment = (id: string) => {
    const appt = appointments.find((a) => a.id === id);
    if (appt) {
      setSelectedDate(new Date(appt.date));
      setAppointmentTime(appt.time);
      setAppointmentEditId(id);
    }
  };

  const deleteAppointment = (id: string) => {
    setAppointments((prev) => prev.filter((a) => a.id !== id));
    if (appointmentEditId === id) setAppointmentEditId(null);
  };

  const addOrUpdateVaccination = () => {
    if (!vaccinationForm.name || !vaccinationForm.date) return;

    if (vaccineEditId !== null) {
      setVaccinations((prev) =>
        prev.map((v) =>
          v.id === vaccineEditId ? { ...v, ...vaccinationForm } : v
        )
      );
      setVaccineEditId(null);
    } else {
      setVaccinations((prev) => [
        ...prev,
        {
          id: crypto.randomUUID?.() || String(Date.now()),
          ...vaccinationForm,
        },
      ]);
    }

    setVaccinationForm({ name: "", date: "" });
  };

  const editVaccination = (id: string) => {
    const vax = vaccinations.find((v) => v.id === id);
    if (vax) {
      const { id: _, ...rest } = vax;
      setVaccinationForm(rest);
      setVaccineEditId(id);
    }
  };

  const deleteVaccination = (id: string) => {
    setVaccinations((prev) => prev.filter((v) => v.id !== id));
    if (vaccineEditId === id) setVaccineEditId(null);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      {/* Calendar + Appointments */}
      <section>
        <h3>Vet Appointment Calendar</h3>
        <Calendar
          value={selectedDate}
          onChange={(value) => {
            if (value instanceof Date) setSelectedDate(value);
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
            {appointmentEditId ? "Update" : "Add"} Appointment
          </button>
        </div>

        <h4 style={{ marginTop: 20 }}>Scheduled Appointments</h4>
        <ul>
          {appointments
            .slice()
            .sort(
              (a, b) =>
                new Date(`${a.date}T${a.time}`).getTime() -
                new Date(`${b.date}T${b.time}`).getTime()
            )
            .map((appt) => (
              <li key={appt.id}>
                {appt.date} — {appt.time}
                <button
                  onClick={() => editAppointment(appt.id)}
                  style={{ marginLeft: 8 }}
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteAppointment(appt.id)}
                  style={{ marginLeft: 4 }}
                >
                  Delete
                </button>
              </li>
            ))}
        </ul>
      </section>

      {/* Vaccinations */}
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
            {vaccineEditId !== null ? "Update" : "Add"}
          </button>
        </div>

        <h4 style={{ marginTop: 20 }}>Past Vaccinations</h4>
        <ul>
          {vaccinations
            .slice()
            .sort((a, b) => a.date.localeCompare(b.date))
            .map((vax) => (
              <li key={vax.id}>
                {vax.date} — {vax.name}
                <button
                  onClick={() => editVaccination(vax.id)}
                  style={{ marginLeft: 8 }}
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteVaccination(vax.id)}
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
