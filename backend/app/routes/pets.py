import json
import os
from flask import Blueprint, request, jsonify
from app.models.pet import Pet

pets_bp = Blueprint("pets", __name__, url_prefix="/api/pets")

PETS_FILE = os.path.join(os.path.dirname(__file__), "../data", "pets.json")

def load_pets():
    if os.path.exists(PETS_FILE):
        with open(PETS_FILE, "r") as f:
            return json.load(f)
    return []

def save_pets(pets):
    with open(PETS_FILE, "w") as f:
        json.dump(pets, f, indent=2)

@pets_bp.route("", methods=["GET"])
def get_pets():
    pets = load_pets()
    return jsonify(pets)

@pets_bp.route("/<pet_id>", methods=["GET"])
def get_pet_by_id(pet_id):
    pets = load_pets()
    pet = next((p for p in pets if p["id"] == pet_id), None)
    if pet:
        return jsonify(pet)
    return jsonify({"error": "Pet not found"}), 404

@pets_bp.route("", methods=["POST"])
def add_pet():
    pets = load_pets()
    data = request.json
    new_pet = Pet(
        name=data["name"],
        pet_type=data["type"],
        birth_date=data["birthDate"],
        image_url=data.get("imageUrl", "")
    )
    pets.append(new_pet.to_dict())
    save_pets(pets)
    return jsonify(new_pet.to_dict()), 201

@pets_bp.route("/<pet_id>", methods=["PUT"])
def update_pet(pet_id):
    pets = load_pets()
    pet_to_update = next((pet for pet in pets if pet["id"] == pet_id), None)

    if not pet_to_update:
        return jsonify({"error": "Pet not found"}), 404

    data = request.json
    
    # Update the pet with new data
    pet_to_update["name"] = data["name"]
    pet_to_update["type"] = data["type"]
    pet_to_update["birthDate"] = data["birthDate"]
    pet_to_update["imageUrl"] = data.get("imageUrl", "")

    save_pets(pets)
    return jsonify(pet_to_update)

@pets_bp.route("/<pet_id>", methods=["DELETE"])
def delete_pet(pet_id):
    pets = load_pets()
    pet_to_delete = next((pet for pet in pets if pet["id"] == pet_id), None)

    if not pet_to_delete:
        return jsonify({"error": "Pet not found"}), 404

    # Remove from pets list
    pets = [pet for pet in pets if pet["id"] != pet_id]
    save_pets(pets)

    # Attempt to delete local image if it's from uploads folder
    image_url = pet_to_delete.get("imageUrl", "")
    if image_url.startswith("http://127.0.0.1:5000/uploads/"):
        filename = image_url.split("/uploads/")[-1]
        file_path = os.path.join(os.path.dirname(__file__), "../../../uploads", filename)
        try:
            if os.path.exists(file_path):
                os.remove(file_path)
        except Exception as e:
            print(f"Failed to delete image file: {e}")

    return "", 204