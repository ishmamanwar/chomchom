from app.supabase_client import supabase
from app.models.vet import Appointment, Vaccination

def _combine_vet_data(appointments, vaccinations):
    return {
        "appointments": appointments,
        "vaccinations": vaccinations
    }

def get_vet_data(pet_id):
    appointments = supabase.table("vet_appointments").select("*").eq("pet_id", pet_id).execute().data
    vaccinations = supabase.table("vaccinations").select("*").eq("pet_id", pet_id).execute().data
    return _combine_vet_data(appointments, vaccinations)

def get_all(pet_id):
    return get_vet_data(pet_id)

def add_appointment(pet_id, appointment_data):
    appointment_data_with_pet_id = {
        **appointment_data,
        "pet_id": pet_id
    }
    appointment = Appointment(**appointment_data_with_pet_id)
    record = supabase.table("vet_appointments").insert(appointment.to_dict()).execute().data
    return record[0] if record else None

def add_vaccination(pet_id, vaccination_data):
    vaccination_data_with_pet_id = {
        **vaccination_data,
        "pet_id": pet_id
    }
    vaccination = Vaccination(**vaccination_data_with_pet_id)
    record = supabase.table("vaccinations").insert(vaccination.to_dict()).execute().data
    return record[0] if record else None

def update_appointment(pet_id, appt_id, updated_data):
    supabase.table("vet_appointments").update(updated_data).eq("id", appt_id).execute()

def update_vaccination(pet_id, vax_id, updated_data):
    supabase.table("vaccinations").update(updated_data).eq("id", vax_id).execute()

def delete_appointment(pet_id, appt_id):
    supabase.table("vet_appointments").delete().eq("id", appt_id).execute()
    
def delete_vaccination(pet_id, vax_id):
    supabase.table("vaccinations").delete().eq("id", vax_id).execute()
