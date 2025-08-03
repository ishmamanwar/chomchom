import os
from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
from app.supabase_client import supabase, SUPABASE_BUCKET
import uuid

upload_bp = Blueprint("upload", __name__)

ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif"}

def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

@upload_bp.route("/upload", methods=["POST"])
def upload_file():
    if "file" not in request.files:
        return jsonify({"error": "No file provided"}), 400

    file = request.files["file"]
    if file.filename == "" or not allowed_file(file.filename):
        return jsonify({"error": "Invalid file type"}), 400

    filename = secure_filename(file.filename)
    
    # Generate a unique filename to avoid conflicts
    file_id = str(uuid.uuid4())
    file_extension = filename.rsplit(".", 1)[1].lower() if "." in filename else ""
    unique_filename = f"{file_id}.{file_extension}" if file_extension else file_id
    
    file_path = f"uploads/{unique_filename}"

    # Upload to Supabase Storage
    try:
        supabase.storage.from_(SUPABASE_BUCKET).upload(file_path, file.read(), {"content-type": file.content_type})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    # Get public URL
    public_url = supabase.storage.from_(SUPABASE_BUCKET).get_public_url(file_path)

    return jsonify({"message": "File uploaded", "url": public_url})
