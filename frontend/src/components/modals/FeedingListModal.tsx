import { FeedingEntry } from "../../features/feeding/FeedingEntry";

export default function FeedingListModal({
  entries,
  onClose,
}: {
  entries: FeedingEntry[];
  onClose: () => void;
}) {
  return (
    <div className="modal-overlay feeding-modal">
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal-title">Feeding Schedule</div>
          <button className="modal-close-button" onClick={onClose}>
            ✖
          </button>
        </div>

        <ul
          className="feeding-schedule-list"
          style={{ maxHeight: "70vh", overflowY: "auto" }}
        >
          {entries
            .slice()
            .sort((a, b) => a.time.localeCompare(b.time))
            .map((entry) => (
              <li
                key={entry.id}
                className="feeding-schedule-entry"
                style={{ whiteSpace: "normal" }}
              >
                <span className="feeding-time">{entry.time}</span>
                <span className="feeding-food" style={{ flex: 1 }}>
                  {entry.food}
                </span>
                <span
                  className="feeding-quantity"
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
