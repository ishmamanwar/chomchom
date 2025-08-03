from flask import Blueprint, request, jsonify
from app.services.vet_store import (
    get_all,
    add_appointment,
    add_vaccination,
    update_appointment,
    update_vaccination,
    delete_appointment,
    delete_vaccination
)

vet_bp = Blueprint("vet", __name__)

@vet_bp.route("/vet/<pet_id>", methods=["GET"])
def get_vet_data(pet_id):
    data = get_all(pet_id)
    return jsonify(data)

@vet_bp.route("/vet/<pet_id>/appointments", methods=["POST"])
def create_appointment(pet_id):
    appointment_data = request.json
    new_appointment = add_appointment(pet_id, appointment_data)
    return jsonify(new_appointment), 201

@vet_bp.route("/vet/<pet_id>/vaccinations", methods=["POST"])
def create_vaccination(pet_id):
    vaccination_data = request.json
    new_vaccination = add_vaccination(pet_id, vaccination_data)
    return jsonify(new_vaccination), 201

@vet_bp.route("/vet/<pet_id>/appointments/<appt_id>", methods=["PUT"])
def edit_appointment(pet_id, appt_id):
    updates = request.json
    update_appointment(pet_id, appt_id, updates)
    return jsonify({"message": "Appointment updated"})

@vet_bp.route("/vet/<pet_id>/vaccinations/<vax_id>", methods=["PUT"])
def edit_vaccination(pet_id, vax_id):
    updates = request.json
    update_vaccination(pet_id, vax_id, updates)
    return jsonify({"message": "Vaccination updated"})

@vet_bp.route("/vet/<pet_id>/appointments/<appt_id>", methods=["DELETE"])
def remove_appointment(pet_id, appt_id):
    delete_appointment(pet_id, appt_id)
    return jsonify({"message": "Appointment deleted"})

@vet_bp.route("/vet/<pet_id>/vaccinations/<vax_id>", methods=["DELETE"])
def remove_vaccination(pet_id, vax_id):
    delete_vaccination(pet_id, vax_id)
    return jsonify({"message": "Vaccination deleted"})