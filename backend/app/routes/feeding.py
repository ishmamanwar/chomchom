from flask import Blueprint, request, jsonify
from app.services.feeding_store import (
    get_feeding_entries_by_pet,
    add_feeding_entry,
    update_feeding_entry,
    delete_feeding_entry
)

feeding_bp = Blueprint("feeding", __name__)

@feeding_bp.route("/feeding/<pet_id>", methods=["GET"])
def get_feeding(pet_id):
    entries = get_feeding_entries_by_pet(pet_id)
    return jsonify(entries)

@feeding_bp.route("/feeding", methods=["POST"])
def create_feeding():
    entry = request.json
    new_entry = add_feeding_entry(entry)
    return jsonify(new_entry), 201

@feeding_bp.route("/feeding/<entry_id>", methods=["PUT"])
def edit_feeding(entry_id):
    updates = request.json
    updated_entry = update_feeding_entry(entry_id, updates)
    return jsonify(updated_entry)

@feeding_bp.route("/feeding/<entry_id>", methods=["DELETE"])
def remove_feeding(entry_id):
    delete_feeding_entry(entry_id)
    return jsonify({"message": "Feeding entry deleted"})
