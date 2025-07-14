from flask import Blueprint, request, jsonify
from app.services import vet_store

vet_bp = Blueprint("vet", __name__, url_prefix="/api/pets/<pet_id>/vet")

@vet_bp.route("", methods=["GET"])
def get_vet(pet_id):
    return jsonify(vet_store.get_all(pet_id))

@vet_bp.route("/appointments", methods=["POST"])
def add_appointment(pet_id):
    appt = request.json
    result = vet_store.add_appointment(pet_id, appt)
    return jsonify(result), 201

@vet_bp.route("/vaccinations", methods=["POST"])
def add_vaccination(pet_id):
    vax = request.json
    result = vet_store.add_vaccination(pet_id, vax)
    return jsonify(result), 201

@vet_bp.route("/appointments/<appt_id>", methods=["PUT"])
def update_appointment(pet_id, appt_id):
    data = request.json
    vet_store.update_appointment(pet_id, appt_id, data)
    return jsonify({"message": "Appointment updated"}), 200

@vet_bp.route("/vaccinations/<vax_id>", methods=["PUT"])
def update_vaccination(pet_id, vax_id):
    data = request.json
    vet_store.update_vaccination(pet_id, vax_id, data)
    return jsonify({"message": "Vaccination updated"}), 200

@vet_bp.route("/appointments/<appt_id>", methods=["DELETE"])
def delete_appointment(pet_id, appt_id):
    vet_store.delete_appointment(pet_id, appt_id)
    return "", 204

@vet_bp.route("/vaccinations/<vax_id>", methods=["DELETE"])
def delete_vaccination(pet_id, vax_id):
    vet_store.delete_vaccination(pet_id, vax_id)
    return "", 204