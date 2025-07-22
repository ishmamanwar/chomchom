import { useParams } from "react-router-dom";
import { useFeeding } from "../../feeding/hooks";
import { useState } from "react";
import FeedingEntryModal from "./FeedingEntryModal";
import FeedingListModal from "./FeedingListModal";

export default function PetFeedingTab() {
  const { id: petId } = useParams<{ id: string }>();
  const { entries, addEntry, updateEntry, deleteEntry } = useFeeding(petId!);

  const [editId, setEditId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isListModalOpen, setIsListModalOpen] = useState(false);
  const [form, setForm] = useState({ time: "", food: "", quantity: "" });

  const openNewModal = () => {
    setForm({ time: "", food: "", quantity: "" });
    setEditId(null);
    setIsModalOpen(true);
  };

  const startEdit = (entryId: string) => {
    const entry = entries.find((e) => e.id === entryId);
    if (entry) {
      setForm({ time: entry.time, food: entry.food, quantity: entry.quantity });
      setEditId(entryId);
      setIsModalOpen(true);
    }
  };

  const save = () => {
    if (!form.time || !form.food || !form.quantity) return;
    if (editId) {
      updateEntry(editId, form);
    } else {
      addEntry(form);
    }
    setIsModalOpen(false);
    setForm({ time: "", food: "", quantity: "" });
  };

  return (
    <div>
      <button className="add-entry-button" onClick={openNewModal}>
        + Add Food
      </button>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <h3 className="feeding-schedule-title">Feeding Schedule</h3>
        <button
          onClick={() => setIsListModalOpen(true)}
          className="modal-close-button"
          style={{
            fontSize: "12px",
            padding: "3px 5px",
            border: "1px solid #e7d968",
            borderRadius: "6px",
            backgroundColor: "#fffbe6",
            color: "#5c4332",
          }}
        >
          📋
        </button>
      </div>

      <ul className="feeding-schedule-list">
        {entries
          .slice()
          .sort((a, b) => a.time.localeCompare(b.time))
          .map((entry) => (
            <li key={entry.id} className="feeding-schedule-entry">
              <span className="feeding-time">{entry.time}</span>
              <span className="feeding-food" title={entry.food}>
                {entry.food}
              </span>
              <span className="feeding-quantity">({entry.quantity})</span>
              <div className="feeding-buttons">
                <button
                  className="icon-button"
                  onClick={() => startEdit(entry.id)}
                  title="Edit"
                  aria-label="Edit entry"
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
                  onClick={() => deleteEntry(entry.id)}
                  title="Delete"
                  aria-label="Delete entry"
                >
                  ✖
                </button>
              </div>
            </li>
          ))}
      </ul>

      {isModalOpen && (
        <FeedingEntryModal
          form={form}
          setForm={setForm}
          onClose={() => setIsModalOpen(false)}
          onSave={save}
          isEdit={!!editId}
        />
      )}

      {isListModalOpen && (
        <FeedingListModal
          entries={entries}
          onClose={() => setIsListModalOpen(false)}
        />
      )}
    </div>
  );
}
