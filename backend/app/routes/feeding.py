from flask import Blueprint, request, jsonify
from app.services import feeding_store

feeding_bp = Blueprint("feeding", __name__, url_prefix="/api/pets/<pet_id>/feeding")

@feeding_bp.route("", methods=["GET"])
def get_feeding(pet_id):
    return jsonify(feeding_store.get_entries_for_pet(pet_id))

@feeding_bp.route("", methods=["POST"])
def post_feeding(pet_id):
    data = request.json
    new_entry = feeding_store.add_entry(
        pet_id,
        time=data["time"],
        food=data["food"],
        quantity=data["quantity"]
    )
    return jsonify(new_entry), 201

@feeding_bp.route("/<entry_id>", methods=["PUT"])
def put_feeding(pet_id, entry_id):
    data = request.json
    feeding_store.update_entry(entry_id, pet_id, data)
    return "", 204

@feeding_bp.route("/<entry_id>", methods=["DELETE"])
def delete_feeding(pet_id, entry_id):
    feeding_store.delete_entry(entry_id, pet_id)
    return "", 204