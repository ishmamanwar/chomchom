from flask import Blueprint, request, jsonify
from app.supabase_client import supabase

pets_bp = Blueprint("pets", __name__)

@pets_bp.route("/pets", methods=["GET"])
def get_pets():
    pets = supabase.table("pets").select("*").execute().data
    return jsonify(pets)

@pets_bp.route("/pets/<pet_id>", methods=["GET"])
def get_pet(pet_id):
    pet = supabase.table("pets").select("*").eq("id", pet_id).execute().data
    return jsonify(pet[0] if pet else {})

@pets_bp.route("/pets", methods=["POST"])
def create_pet():
    pet_data = request.json
    new_pet = supabase.table("pets").insert(pet_data).execute().data
    return jsonify(new_pet[0]), 201

@pets_bp.route("/pets/<pet_id>", methods=["PUT"])
def edit_pet(pet_id):
    updates = request.json
    updated_pet = supabase.table("pets").update(updates).eq("id", pet_id).execute().data
    return jsonify(updated_pet[0])

@pets_bp.route("/pets/<pet_id>", methods=["DELETE"])
def remove_pet(pet_id):
    supabase.table("pets").delete().eq("id", pet_id).execute()
    return jsonify({"message": "Pet deleted"})