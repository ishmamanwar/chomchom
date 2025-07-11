import { useParams } from "react-router-dom";
import { useState } from "react";
import { mockPets } from "../mockPets";
import { Pet } from "../types";
import PetOverviewTab from "../components/PetOverviewTab";
import PetFeedingTab from "../components/PetFeedingTab";
import PetMedicationTab from "../components/PetMedicationTab";
import PetVetTab from "../components/PetVetTab";

const tabs = ["Overview", "Feeding", "Medication", "Vet"];

export default function PetDetailsPage() {
  const { id } = useParams();
  const pet: Pet | undefined = mockPets.find((p) => p.id === id);
  const [activeTab, setActiveTab] = useState("Overview");

  if (!pet) return <p>Pet not found</p>;

  return (
    <div style={{ padding: 32 }}>
      <h1>{pet.name}’s Profile</h1>
      <div style={{ display: "flex", gap: 16 }}>
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: 8,
              borderBottom: activeTab === tab ? "2px solid black" : "none",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      <div style={{ marginTop: 24 }}>
        {activeTab === "Overview" && <PetOverviewTab pet={pet} />}
        {activeTab === "Feeding" && <PetFeedingTab />}
        {activeTab === "Medication" && <PetMedicationTab />}
        {/* {activeTab === "Vet" && <PetVetTab />} */}
      </div>
    </div>
  );
}