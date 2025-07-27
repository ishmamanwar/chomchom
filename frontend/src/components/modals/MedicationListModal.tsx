import { MedicationEntry } from "../../features/medications/MedicationEntry";

export default function MedicationListModal({
  entries,
  onClose,
}: {
  entries: MedicationEntry[];
  onClose: () => void;
}) {
  return (
    <div className="modal-overlay medication-modal">
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal-title">Medication Schedule</div>
          <button className="modal-close-button" onClick={onClose}>
            ✖
          </button>
        </div>

        <ul className="medication-schedule-list">
          {entries
            .slice()
            .sort((a, b) => a.time.localeCompare(b.time))
            .map((entry) => (
              <li
                key={entry.id}
                className="medication-schedule-entry"
                style={{ whiteSpace: "normal" }}
              >
                <span className="medication-time">{entry.time}</span>
                <span className="medication-med" style={{ flex: 1 }}>
                  {entry.med}
                </span>
                <span
                  className="medication-quantity"
                  style={{ textAlign: "right" }}
                >
                  ({entry.quantity})
                </span>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
