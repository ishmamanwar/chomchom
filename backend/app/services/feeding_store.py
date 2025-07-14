import json
import os
from app.models.feeding_entry import FeedingEntry

DATA_FILE = os.path.join(os.path.dirname(__file__), "../data/feeding.json")


def load_feeding_entries():
    if not os.path.exists(DATA_FILE):
        return []
    with open(DATA_FILE, "r") as f:
        return json.load(f)


def save_feeding_entries(entries):
    with open(DATA_FILE, "w") as f:
        json.dump(entries, f, indent=2)


def get_entries_for_pet(pet_id):
    return [e for e in load_feeding_entries() if e["pet_id"] == pet_id]


def add_entry(pet_id, time, food, quantity):
    entries = load_feeding_entries()
    new_entry = FeedingEntry(pet_id, time, food, quantity)
    entries.append(new_entry.to_dict())
    save_feeding_entries(entries)
    return new_entry.to_dict()


def update_entry(entry_id, pet_id, updated):
    entries = load_feeding_entries()
    for e in entries:
        if e["id"] == entry_id and e["pet_id"] == pet_id:
            e.update(updated)
            break
    save_feeding_entries(entries)


def delete_entry(entry_id, pet_id):
    entries = load_feeding_entries()
    entries = [e for e in entries if not (e["id"] == entry_id and e["pet_id"] == pet_id)]
    save_feeding_entries(entries)