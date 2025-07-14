import os
import json
from app.models.medication import Medication

DATA_FILE = os.path.join(os.path.dirname(__file__), "../data/medications.json")


def load_medications():
    if not os.path.exists(DATA_FILE):
        return []
    with open(DATA_FILE, "r") as f:
        return json.load(f)


def save_medications(data):
    with open(DATA_FILE, "w") as f:
        json.dump(data, f, indent=2)


def get_medications_for_pet(pet_id):
    return [m for m in load_medications() if m["pet_id"] == pet_id]


def add_medication_entry(pet_id, data):
    entry = Medication(pet_id, data["time"], data["med"], data["quantity"])
    all_data = load_medications()
    all_data.append(entry.to_dict())
    save_medications(all_data)
    return entry.to_dict()


def update_medication_entry(pet_id, entry_id, updated_data):
    all_data = load_medications()
    for m in all_data:
        if m["id"] == entry_id and m["pet_id"] == pet_id:
            m.update(updated_data)
            break
    save_medications(all_data)


def delete_medication_entry(pet_id, entry_id):
    all_data = load_medications()
    new_data = [m for m in all_data if not (m["id"] == entry_id and m["pet_id"] == pet_id)]
    save_medications(new_data)