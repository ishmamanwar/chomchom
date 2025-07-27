import { useState } from "react";
import { Vaccination } from "../../features/vet/Vaccination";
import VaccinationEntryModal from "./VaccinationEntryModal";

export default function VaccinationsSection({
  vaccinations,
  addVaccination,
  updateVaccination,
  deleteVaccination,
}: {
  vaccinations: Vaccination[];
  addVaccination: (vaccination: Vaccination) => void;
  updateVaccination: (id: string, vaccination: Partial<Vaccination>) => void;
  deleteVaccination: (id: string) => void;
}) {
  const [isVaccinationModalOpen, setIsVaccinationModalOpen] = useState(false);
  const [vaccineEditId, setVaccineEditId] = useState<string | null>(null);
  const [vaccinationForm, setVaccinationForm] = useState({
    name: "",
    date: "",
  });

  const handleSaveVaccination = () => {
    const { name, date } = vaccinationForm;
    if (!name || !date) return;

    if (vaccineEditId) {
      updateVaccination(vaccineEditId, { name, date });
      setVaccineEditId(null);
    } else {
      addVaccination({ id: "", name, date });
    }

    setVaccinationForm({ name: "", date: "" });
    setIsVaccinationModalOpen(false);
  };

  const editVaccination = (id: string) => {
    const vax = vaccinations.find((v) => v.id === id);
    if (!vax) return;
    setVaccinationForm({ name: vax.name, date: vax.date });
    setVaccineEditId(id);
  };

  return (
    <section>
      <button
        className="vet-add-vaccination-button"
        onClick={() => {
          setVaccinationForm({ name: "", date: "" });
          setVaccineEditId(null);
          setIsVaccinationModalOpen(true);
        }}
      >
        + Add Vaccination
      </button>

      <h3 className="vet-vaccination-title">Vaccination History</h3>
      {vaccinations.length > 0 ? (
        <ul className="vet-vaccination-list">
          {vaccinations
            .slice()
            .sort((a, b) => a.date.localeCompare(b.date))
            .map((vax) => (
              <li key={vax.id} className="vet-vaccination-entry">
                <span className="vet-vaccination-date">{vax.date}</span>
                <span className="vet-vaccination-name">{vax.name}</span>
                <div className="vet-vaccination-buttons">
                  <button
                    className="icon-button"
                    onClick={() => {
                      editVaccination(vax.id);
                      setIsVaccinationModalOpen(true);
                    }}
                    title="Edit"
                    aria-label="Edit vaccination"
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
                    onClick={() => deleteVaccination(vax.id)}
                    title="Delete"
                    aria-label="Delete vaccination"
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
          No vaccinations recorded yet. Click the button above to add one!
        </p>
      )}

      {isVaccinationModalOpen && (
        <VaccinationEntryModal
          form={vaccinationForm}
          setForm={setVaccinationForm}
          onClose={() => {
            setIsVaccinationModalOpen(false);
            setVaccineEditId(null);
            setVaccinationForm({ name: "", date: "" });
          }}
          onSave={handleSaveVaccination}
          isEdit={!!vaccineEditId}
        />
      )}
    </section>
  );
}
