import os
import json
import uuid

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
    entry = {
        "id": str(uuid.uuid4()),
        "pet_id": pet_id,
        "time": data["time"],
        "med": data["med"],
        "quantity": data["quantity"],
    }
    all_data = load_medications()
    all_data.append(entry)
    save_medications(all_data)
    return entry


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