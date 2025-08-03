from flask import Blueprint, request, jsonify
from app.services.medications_store import (
    get_medications_by_pet,
    add_medication,
    update_medication,
    delete_medication
)

medications_bp = Blueprint("medications", __name__)

@medications_bp.route("/medications/<pet_id>", methods=["GET"])
def get_medications(pet_id):
    meds = get_medications_by_pet(pet_id)
    return jsonify(meds)

@medications_bp.route("/medications", methods=["POST"])
def create_medication():
    entry = request.json
    new_med = add_medication(entry)
    return jsonify(new_med), 201

@medications_bp.route("/medications/<entry_id>", methods=["PUT"])
def edit_medication(entry_id):
    updates = request.json
    updated_med = update_medication(entry_id, updates)
    return jsonify(updated_med)

@medications_bp.route("/medications/<entry_id>", methods=["DELETE"])
def remove_medication(entry_id):
    delete_medication(entry_id)
    return jsonify({"message": "Medication deleted"})