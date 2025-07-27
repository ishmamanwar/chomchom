import json
import os
from app.models.feeding_entry import FeedingEntry

DATA_FILE = os.path.join(os.path.dirname(__file__), "../data/feeding.json")


def load_feeding_entries():
    if not os.path.exists(DATA_FILE):
        return []
    with open(DATA_FILE, "r") as f:
        return json.load(f)


def save_feeding_entries(data):
    with open(DATA_FILE, "w") as f:
        json.dump(data, f, indent=2)


def get_entries_for_pet(pet_id):
    return [e for e in load_feeding_entries() if e["pet_id"] == pet_id]


def add_entry(pet_id, data):
    entry = FeedingEntry(pet_id, data["time"], data["food"], data["quantity"])
    all_data = load_feeding_entries()
    all_data.append(entry.to_dict())
    save_feeding_entries(all_data)
    return entry.to_dict()


def update_entry(pet_id, entry_id, updated):
    data = load_feeding_entries()
    for e in data:
        if e["id"] == entry_id and e["pet_id"] == pet_id:
            e.update(updated)
            break
    save_feeding_entries(data)


def delete_entry(pet_id, entry_id):
    data = load_feeding_entries()
    data = [e for e in data if not (e["id"] == entry_id and e["pet_id"] == pet_id)]
    save_feeding_entries(data)