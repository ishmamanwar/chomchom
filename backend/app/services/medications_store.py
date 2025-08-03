from app.supabase_client import supabase

def get_medications_by_pet(pet_id):
    return supabase.table("medications").select("*").eq("pet_id", pet_id).execute().data

def add_medication(entry):
    return supabase.table("medications").insert(entry).execute().data[0]

def update_medication(entry_id, updates):
    return supabase.table("medications").update(updates).eq("id", entry_id).execute().data[0]

def delete_medication(entry_id):
    supabase.table("medications").delete().eq("id", entry_id).execute()