import { useParams } from "react-router-dom";
import { useState } from "react";
import { usePetById } from "../features/pets/hooks";
import PetOverviewTab from "./overview/PetOverviewTab";
import PetFeedingTab from "./feeding/PetFeedingTab";
import PetMedicationTab from "./medication/PetMedicationTab";
import PetVetTab from "./vet/PetVetTab";

const tabs = ["Overview", "Feeding", "Medication", "Vet"];

export default function PetDetailsPage() {
  const { id } = useParams();
  const { pet, loading } = usePetById(id);
  const [activeTab, setActiveTab] = useState("Overview");

  if (loading) return <p>Loading...</p>;
  if (!pet) return <p>Pet not found</p>;

  return (
    <div className="pet-details-container">
      <div className="pet-tab-container">
        <div className="pet-tab-row">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pet-tab-new ${
                activeTab === tab ? "active" : ""
              } tab-${tab.toLowerCase()}`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div
          className={`pet-tab-content ${activeTab.toLocaleLowerCase()}-content`}
        >
          {activeTab === "Overview" && <PetOverviewTab pet={pet} />}
          {activeTab === "Feeding" && <PetFeedingTab />}
          {activeTab === "Medication" && <PetMedicationTab />}
          {activeTab === "Vet" && <PetVetTab />}
        </div>
      </div>
    </div>
  );
}
