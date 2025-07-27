from flask import Blueprint, request, jsonify
from app.services import medications_store

medications_bp = Blueprint("medications", __name__, url_prefix="/api/pets/<pet_id>/medications")

@medications_bp.route("", methods=["GET"])
def get_medications(pet_id):
    meds = medications_store.get_medications_for_pet(pet_id)
    return jsonify(meds)

@medications_bp.route("", methods=["POST"])
def add_medication(pet_id):
    data = request.json
    new_entry = medications_store.add_medication_entry(pet_id, data)
    return jsonify(new_entry), 201

@medications_bp.route("/<entry_id>", methods=["PUT"])
def update_medication(pet_id, entry_id):
    data = request.json
    medications_store.update_medication_entry(pet_id, entry_id, data)
    return "", 204

@medications_bp.route("/<entry_id>", methods=["DELETE"])
def delete_medication(pet_id, entry_id):
    medications_store.delete_medication_entry(pet_id, entry_id)
    return "", 204