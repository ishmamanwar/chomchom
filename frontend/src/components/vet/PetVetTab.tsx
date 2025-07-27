import { useVet } from "../../features/vet/hooks";
import { useParams } from "react-router-dom";
import AppointmentsSection from "./AppointmentsSection";
import VaccinationsSection from "./VaccinationsSection";

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

  return (
    <div>
      <AppointmentsSection
        appointments={appointments}
        addAppointment={addAppointment}
        updateAppointment={updateAppointment}
        deleteAppointment={deleteAppointment}
      />

      <VaccinationsSection
        vaccinations={vaccinations}
        addVaccination={addVaccination}
        updateVaccination={updateVaccination}
        deleteVaccination={deleteVaccination}
      />
    </div>
  );
}
