import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useVet } from "../../features/vet/hooks";
import { useParams } from "react-router-dom";

export default function PetVetTab() {
  const { id: petId } = useParams<{ id: string }>();
  const {
    appointments,
    vaccinations,
    addAppointment,
    updateAppointment,
    deleteAppointment,
    addVaccination,
    updateVaccination,
    deleteVaccination,
  } = useVet(petId!);

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [appointmentTime, setAppointmentTime] = useState("");
  const [appointmentEditId, setAppointmentEditId] = useState<string | null>(
    null
  );

  const [vaccinationForm, setVaccinationForm] = useState({
    name: "",
    date: "",
  });
  const [vaccineEditId, setVaccineEditId] = useState<string | null>(null);

  const handleAddOrUpdateAppointment = () => {
    if (!appointmentTime) return;
    const dateStr = selectedDate.toISOString().split("T")[0];

    if (appointmentEditId) {
      updateAppointment(appointmentEditId, {
        date: dateStr,
        time: appointmentTime,
      });
      setAppointmentEditId(null);
    } else {
      addAppointment({ id: "", date: dateStr, time: appointmentTime });
    }

    setAppointmentTime("");
  };

  const editAppointment = (id: string) => {
    const appt = appointments.find((a) => a.id === id);
    if (!appt) return;
    const [year, month, day] = appt.date.split("-").map(Number);
    setSelectedDate(new Date(year, month - 1, day));
    setAppointmentTime(appt.time);
    setAppointmentEditId(id);
  };

  const handleAddOrUpdateVaccination = () => {
    const { name, date } = vaccinationForm;
    if (!name || !date) return;

    if (vaccineEditId) {
      updateVaccination(vaccineEditId, { name, date });
      setVaccineEditId(null);
    } else {
      addVaccination({ id: "", name, date });
    }

    setVaccinationForm({ name: "", date: "" });
  };

  const editVaccination = (id: string) => {
    const vax = vaccinations.find((v) => v.id === id);
    if (!vax) return;
    setVaccinationForm({ name: vax.name, date: vax.date });
    setVaccineEditId(id);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      {/* Calendar + Appointments */}
      <section>
        <h3>Vet Appointment Calendar</h3>
        <Calendar
          value={selectedDate}
          onChange={(val) => {
            if (val instanceof Date) setSelectedDate(val);
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
          <button
            onClick={handleAddOrUpdateAppointment}
            style={{ marginLeft: 12 }}
          >
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
          <button onClick={handleAddOrUpdateVaccination}>
            {vaccineEditId ? "Update" : "Add"}
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
