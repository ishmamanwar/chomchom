import json
import os
import uuid
from datetime import datetime
from app.supabase_client import supabase

BASE_DIR = os.path.join(os.path.dirname(__file__), "../app/data")

# Load JSON helper
def load_json(filename):
    with open(os.path.join(BASE_DIR, filename), "r") as f:
        return json.load(f)

# Ensure UUID exists
def ensure_id(entry):
    if "id" not in entry or not entry["id"]:
        entry["id"] = str(uuid.uuid4())
    return entry

def migrate_pets():
    pets = load_json("pets.json")
    pets_to_insert = []

    # If pets.json is a list
    if isinstance(pets, list):
        for pet in pets:
            pet = ensure_id(pet)
            pets_to_insert.append({
                "id": pet["id"],
                "name": pet.get("name"),
                "type": pet.get("type"),
                # Handle both camelCase and snake_case
                "birth_date": pet.get("birth_date") or pet.get("birthDate") or datetime.now().date().isoformat(),
                "image_url": pet.get("image_url") or pet.get("imageUrl", "")
            })
    # If pets.json is a dict
    elif isinstance(pets, dict):
        for pet_id, pet_data in pets.items():
            pet_data = ensure_id({"id": pet_id, **pet_data})
            pets_to_insert.append({
                "id": pet_data["id"],
                "name": pet_data.get("name"),
                "type": pet_data.get("type"),
                "birth_date": pet_data.get("birth_date") or pet_data.get("birthDate") or datetime.now().date().isoformat(),
                "image_url": pet_data.get("image_url") or pet_data.get("imageUrl", "")
            })

    if pets_to_insert:
        supabase.table("pets").insert(pets_to_insert).execute()
    print(f"Migrated {len(pets_to_insert)} pets")



def migrate_feeding():
    feeding_data = load_json("feeding.json")
    entries_to_insert = []

    # If feeding.json is a list
    if isinstance(feeding_data, list):
        for entry in feeding_data:
            entry = ensure_id(entry)
            entries_to_insert.append(entry)
    # If feeding.json is a dict
    elif isinstance(feeding_data, dict):
        for pet_id, entries in feeding_data.items():
            for entry in entries:
                entry = ensure_id(entry)
                entry["pet_id"] = pet_id
                entries_to_insert.append(entry)

    if entries_to_insert:
        supabase.table("feeding_entries").insert(entries_to_insert).execute()
    print(f"Migrated {len(entries_to_insert)} feeding entries")


def migrate_medications():
    medications_data = load_json("medications.json")
    meds_to_insert = []

    # If medications.json is a list
    if isinstance(medications_data, list):
        for entry in medications_data:
            entry = ensure_id(entry)
            meds_to_insert.append(entry)
    # If medications.json is a dict
    elif isinstance(medications_data, dict):
        for pet_id, entries in medications_data.items():
            for entry in entries:
                entry = ensure_id(entry)
                entry["pet_id"] = pet_id
                meds_to_insert.append(entry)

    if meds_to_insert:
        supabase.table("medications").insert(meds_to_insert).execute()
    print(f"Migrated {len(meds_to_insert)} medications")


def migrate_vet():
    vet_data = load_json("vet.json")
    vaccinations_to_insert = []
    appointments_to_insert = []

    # If vet.json is a list
    if isinstance(vet_data, list):
        for record in vet_data:
            pet_id = record.get("pet_id") or record.get("id")
            # Vaccinations
            for vax in record.get("vaccinations", []):
                vax = ensure_id(vax)
                vax["pet_id"] = pet_id
                vaccinations_to_insert.append(vax)
            # Appointments
            for appt in record.get("appointments", []):
                appt = ensure_id(appt)
                appt["pet_id"] = pet_id
                appointments_to_insert.append(appt)
    # If vet.json is a dict
    elif isinstance(vet_data, dict):
        for pet_id, data in vet_data.items():
            for vax in data.get("vaccinations", []):
                vax = ensure_id(vax)
                vax["pet_id"] = pet_id
                vaccinations_to_insert.append(vax)
            for appt in data.get("appointments", []):
                appt = ensure_id(appt)
                appt["pet_id"] = pet_id
                appointments_to_insert.append(appt)

    if vaccinations_to_insert:
        supabase.table("vaccinations").insert(vaccinations_to_insert).execute()

    if appointments_to_insert:
        supabase.table("vet_appointments").insert(appointments_to_insert).execute()

    print(f"Migrated {len(vaccinations_to_insert)} vaccinations and {len(appointments_to_insert)} appointments")


if __name__ == "__main__":
    migrate_pets()
    migrate_feeding()
    migrate_medications()
    migrate_vet()
    print("Migration complete!")
