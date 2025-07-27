import { useParams } from "react-router-dom";
import { useState } from "react";
import { useMedication } from "../../features/medications/hooks";
import MedicationEntryModal from "./MedicationEntryModal";
import MedicationListModal from "./MedicationListModal";

export default function PetMedicationTab() {
  const { id: petId } = useParams<{ id: string }>();
  const { entries, add, update, remove } = useMedication(petId!);

  const [editId, setEditId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isListModalOpen, setIsListModalOpen] = useState(false);
  const [form, setForm] = useState({ time: "", med: "", quantity: "" });

  const openNewModal = () => {
    setForm({ time: "", med: "", quantity: "" });
    setEditId(null);
    setIsModalOpen(true);
  };

  const startEdit = (entryId: string) => {
    const entry = entries.find((e) => e.id === entryId);
    if (entry) {
      setForm({ time: entry.time, med: entry.med, quantity: entry.quantity });
      setEditId(entryId);
      setIsModalOpen(true);
    }
  };

  const save = () => {
    if (!form.time || !form.med || !form.quantity) return;
    if (editId) {
      update(editId, form);
    } else {
      add(form);
    }
    setIsModalOpen(false);
    setForm({ time: "", med: "", quantity: "" });
  };

  return (
    <div>
      <button className="medication-add-entry-button" onClick={openNewModal}>
        + Add Medication
      </button>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <h3 className="medication-schedule-title">Medication Schedule</h3>
        {entries.length > 0 && (
          <button
            onClick={() => setIsListModalOpen(true)}
            className="modal-close-button"
            style={{
              fontSize: "12px",
              padding: "3px 5px",
              border: "1px solid #e4aeb9",
              borderRadius: "6px",
              backgroundColor: "#fdedf1ff",
              color: "#5c4332",
            }}
          >
            📋
          </button>
        )}
      </div>

      {entries.length > 0 && (
        <>
          <ul className="medication-schedule-list">
            {entries
              .slice()
              .sort((a, b) => a.time.localeCompare(b.time))
              .map((entry) => (
                <li key={entry.id} className="medication-schedule-entry">
                  <span className="medication-time">{entry.time}</span>
                  <span className="medication-med" title={entry.med}>
                    {entry.med}
                  </span>
                  <span className="medication-quantity">
                    ({entry.quantity})
                  </span>
                  <div className="medication-buttons">
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
                      onClick={() => remove(entry.id)}
                      title="Delete"
                      aria-label="Delete entry"
                    >
                      ✖
                    </button>
                  </div>
                </li>
              ))}
          </ul>
        </>
      )}

      {isModalOpen && (
        <MedicationEntryModal
          form={form}
          setForm={setForm}
          onClose={() => setIsModalOpen(false)}
          onSave={save}
          isEdit={!!editId}
        />
      )}

      {isListModalOpen && (
        <MedicationListModal
          entries={entries}
          onClose={() => setIsListModalOpen(false)}
        />
      )}
    </div>
  );
}
