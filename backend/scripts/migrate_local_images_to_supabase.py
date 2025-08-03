import os
from app.supabase_client import supabase, SUPABASE_BUCKET

# Path to your old uploads folder
LOCAL_UPLOAD_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../uploads"))

def upload_existing_images():
    # Get all pets from Supabase
    pets = supabase.table("pets").select("*").execute().data
    if not pets:
        print("No pets found in Supabase.")
        return

    for pet in pets:
        image_url = pet.get("image_url")
        pet_id = pet["id"]

        relative_path = image_url.split("/uploads/")[-1]

        # Skip if no image or already Supabase URL
        if not image_url or "supabase.co/storage" in image_url:
            continue

        # Extract filename from old URL
        filename = os.path.basename(image_url)
        local_path = os.path.join(LOCAL_UPLOAD_PATH, relative_path)

        # Check if file exists locally
        if not os.path.exists(local_path):
            print(f"File not found for pet {pet_id}: {local_path}")
            continue

        # Upload to Supabase Storage
        storage_path = f"{pet_id}/{filename}"
        with open(local_path, "rb") as f:
            supabase.storage.from_(SUPABASE_BUCKET).upload(storage_path, f.read())

        # Get public URL
        public_url = supabase.storage.from_(SUPABASE_BUCKET).get_public_url(storage_path)

        # Update pet record with new URL
        supabase.table("pets").update({"image_url": public_url}).eq("id", pet_id).execute()
        print(f"Updated pet {pet_id} -> {public_url}")

if __name__ == "__main__":
    upload_existing_images()
    print("Image migration complete!")
