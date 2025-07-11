import json
import os
from flask import Blueprint, request, jsonify
from app.models.pet import Pet

pets_bp = Blueprint("pets", __name__, url_prefix="/api/pets")

PETS_FILE = os.path.join(os.path.dirname(__file__), "..", "pets.json")

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

@pets_bp.route("/<pet_id>", methods=["DELETE"])
def delete_pet(pet_id):
    pets = load_pets()
    pets = [pet for pet in pets if pet["id"] != pet_id]
    save_pets(pets)
    return "", 204