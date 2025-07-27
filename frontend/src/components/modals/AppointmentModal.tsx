import React, { useEffect } from "react";
import { Appointment } from "../../features/vet/Appointment";

export default function AppointmentModal({
  selectedDate,
  appointments,
  onClose,
  onAdd,
  onUpdate,
  onDelete,
  editId,
  setEditId,
}: {
  selectedDate: Date;
  appointments: Appointment[];
  onClose: () => void;
  onAdd: (appointment: Omit<Appointment, "id">) => void;
  onUpdate: (id: string, appointment: { date: string; time: string }) => void;
  onDelete: (id: string) => void;
  editId: string | null;
  setEditId: (id: string | null) => void;
}) {
  const [time, setTime] = React.useState("");
  const [timeError, setTimeError] = React.useState<string>("");

  const dateStr = selectedDate.toISOString().split("T")[0];
  const dateAppointments = appointments.filter((appt) => appt.date === dateStr);

  // Auto-populate time field when editing an appointment
  useEffect(() => {
    if (editId) {
      const appointmentToEdit = appointments.find((appt) => appt.id === editId);
      if (appointmentToEdit) {
        setTime(appointmentToEdit.time);
      }
    } else {
      setTime("");
    }
  }, [editId, appointments]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!time.trim()) {
      setTimeError("* Required");
      return;
    }

    setTimeError("");

    if (editId) {
      onUpdate(editId, { date: dateStr, time });
      setEditId(null);
    } else {
      onAdd({ date: dateStr, time });
    }
    setTime("");
  };

  const startEdit = (appointment: Appointment) => {
    setTime(appointment.time);
    setEditId(appointment.id);
    setTimeError("");
  };

  const cancelEdit = () => {
    setEditId(null);
    setTime("");
    setTimeError("");
  };

  return (
    <div className="modal-overlay vet-modal">
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal-title">{selectedDate.toLocaleDateString()}</div>
          <button className="modal-close-button" onClick={onClose}>
            ✖
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <div style={{ width: "100%" }}>
            <label className="modal-label">Time</label>
            <input
              type="time"
              value={time}
              onChange={(e) => {
                setTime(e.target.value);
                if (timeError) setTimeError("");
              }}
              className={`modal-input ${timeError ? "error" : ""}`}
            />
            {timeError && <div className="validation-error">{timeError}</div>}
          </div>

          <div
            className="modal-button-container"
            style={{ textAlign: "center" }}
          >
            <button type="submit" className="modal-save-button">
              {editId ? "Update" : "Add"}
            </button>
            {editId && (
              <button
                type="button"
                onClick={cancelEdit}
                className="modal-cancel-button"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {dateAppointments.length > 0 && (
          <>
            <h4
              style={{
                marginTop: "20px",
                marginBottom: "12px",
                color: "#5c4332",
              }}
            >
              Scheduled Appointments
            </h4>
            <ul className="vet-schedule-list">
              {dateAppointments
                .slice()
                .sort((a, b) => a.time.localeCompare(b.time))
                .map((appt) => (
                  <li key={appt.id} className="vet-schedule-entry">
                    <span className="vet-time">{appt.time}</span>
                    <div className="vet-buttons">
                      <button
                        className="icon-button"
                        onClick={() => startEdit(appt)}
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
                        onClick={() => onDelete(appt.id)}
                        title="Delete"
                        aria-label="Delete appointment"
                      >
                        ✖
                      </button>
                    </div>
                  </li>
                ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
