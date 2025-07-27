import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Appointment } from "../../features/vet/Appointment";
import AppointmentModal from "./AppointmentModal";

export default function AppointmentsSection({
  appointments,
  addAppointment,
  updateAppointment,
  deleteAppointment,
}: {
  appointments: Appointment[];
  addAppointment: (appointment: Appointment) => void;
  updateAppointment: (id: string, appointment: Partial<Appointment>) => void;
  deleteAppointment: (id: string) => void;
}) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [appointmentEditId, setAppointmentEditId] = useState<string | null>(
    null
  );

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const handleAddAppointment = (appointment: {
    date: string;
    time: string;
  }) => {
    addAppointment({ id: "", ...appointment });
  };

  const handleUpdateAppointment = (
    id: string,
    appointment: { date: string; time: string }
  ) => {
    updateAppointment(id, appointment);
  };

  // Get unique dates that have appointments for calendar indicators
  const appointmentDates = new Set(appointments.map((appt) => appt.date));

  // Custom tile class to show appointment indicators
  const tileClassName = ({ date }: { date: Date }) => {
    const dateStr = date.toISOString().split("T")[0];
    const hasAppointment = appointmentDates.has(dateStr);

    return hasAppointment ? "has-appointment" : "";
  };

  return (
    <section>
      <Calendar
        value={selectedDate}
        onChange={(val) => {
          if (val instanceof Date) handleDateClick(val);
        }}
        tileClassName={tileClassName}
      />

      <h3 className="vet-schedule-title">Upcoming Appointments</h3>
      {appointments.length > 0 ? (
        <ul className="vet-schedule-list">
          {appointments
            .slice()
            .sort(
              (a, b) =>
                new Date(`${a.date}T${a.time}`).getTime() -
                new Date(`${b.date}T${b.time}`).getTime()
            )
            .map((appt) => (
              <li key={appt.id} className="vet-schedule-entry">
                <span className="vet-time">{appt.time}</span>
                <span style={{ flex: 1 }}>{appt.date}</span>
                <div className="vet-buttons">
                  <button
                    className="icon-button"
                    onClick={() => {
                      const [year, month, day] = appt.date
                        .split("-")
                        .map(Number);
                      setSelectedDate(new Date(year, month - 1, day));
                      setAppointmentEditId(appt.id);
                      setIsModalOpen(true);
                    }}
                    title="Edit"
                    aria-label="Edit appointment"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon-pencil"
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
                      fill="currentColor"
                    >
                      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1.003 1.003 0 000-1.42l-2.34-2.34a1.003 1.003 0 00-1.42 0l-1.83 1.83 3.75 3.75 1.84-1.82z" />
                    </svg>
                  </button>
                  <button
                    className="modal-close-button"
                    style={{ fontSize: "16px", padding: "2px 6px" }}
                    onClick={() => deleteAppointment(appt.id)}
                    title="Delete"
                    aria-label="Delete appointment"
                  >
                    ✖
                  </button>
                </div>
              </li>
            ))}
        </ul>
      ) : (
        <p
          style={{
            color: "#6d4c3d",
            fontStyle: "italic",
          }}
        >
          No appointments scheduled yet. Click on a date in the calendar to add
          one!
        </p>
      )}

      {isModalOpen && (
        <AppointmentModal
          selectedDate={selectedDate}
          appointments={appointments}
          onClose={() => {
            setIsModalOpen(false);
            setAppointmentEditId(null);
          }}
          onAdd={handleAddAppointment}
          onUpdate={handleUpdateAppointment}
          onDelete={deleteAppointment}
          editId={appointmentEditId}
          setEditId={setAppointmentEditId}
        />
      )}
    </section>
  );
}
