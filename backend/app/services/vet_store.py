import json
import os
from app.models.vet import Appointment, Vaccination

DATA_FILE = os.path.join(os.path.dirname(__file__), "../data/vet.json")


def read_data():
    with open(DATA_FILE, "r") as f:
        return json.load(f)


def write_data(data):
    with open(DATA_FILE, "w") as f:
        json.dump(data, f, indent=2)


def get_vet_data(pet_id):
    data = read_data()
    return data.get(pet_id, {"appointments": [], "vaccinations": []})


def add_appointment(pet_id, appointment_data):
    data = read_data()
    pet_data = data.get(pet_id, {"appointments": [], "vaccinations": []})
    appointment = Appointment(**appointment_data)
    pet_data["appointments"].append(appointment.to_dict())
    data[pet_id] = pet_data
    write_data(data)
    return appointment.to_dict()


def add_vaccination(pet_id, vaccination_data):
    data = read_data()
    pet_data = data.get(pet_id, {"appointments": [], "vaccinations": []})
    vaccination = Vaccination(**vaccination_data)
    pet_data["vaccinations"].append(vaccination.to_dict())
    data[pet_id] = pet_data
    write_data(data)
    return vaccination.to_dict()

def update_appointment(pet_id, appt_id, updated_data):
    data = read_data()
    pet_data = data.get(pet_id, {"appointments": [], "vaccinations": []})
    for appt in pet_data["appointments"]:
        if appt["id"] == appt_id:
            appt.update(updated_data)
            break
    data[pet_id] = pet_data
    write_data(data)

def update_vaccination(pet_id, vax_id, updated_data):
    data = read_data()
    pet_data = data.get(pet_id, {"appointments": [], "vaccinations": []})
    for vax in pet_data["vaccinations"]:
        if vax["id"] == vax_id:
            vax.update(updated_data)
            break
    data[pet_id] = pet_data
    write_data(data)


def get_all(pet_id):
    return get_vet_data(pet_id)


def delete_appointment(pet_id, appt_id):
    data = read_data()
    pet_data = data.get(pet_id, {"appointments": [], "vaccinations": []})
    pet_data["appointments"] = [a for a in pet_data["appointments"] if a["id"] != appt_id]
    data[pet_id] = pet_data
    write_data(data)


def delete_vaccination(pet_id, vax_id):
    data = read_data()
    pet_data = data.get(pet_id, {"appointments": [], "vaccinations": []})
    pet_data["vaccinations"] = [v for v in pet_data["vaccinations"] if v["id"] != vax_id]
    data[pet_id] = pet_data
    write_data(data)