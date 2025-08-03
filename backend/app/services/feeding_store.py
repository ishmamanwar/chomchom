from app.supabase_client import supabase

def get_all_feeding_entries():
    return supabase.table("feeding_entries").select("*").execute().data

def get_feeding_entries_by_pet(pet_id):
    return supabase.table("feeding_entries").select("*").eq("pet_id", pet_id).execute().data

def add_feeding_entry(entry):
    return supabase.table("feeding_entries").insert(entry).execute().data[0]

def update_feeding_entry(entry_id, updates):
    return supabase.table("feeding_entries").update(updates).eq("id", entry_id).execute().data[0]

def delete_feeding_entry(entry_id):
    supabase.table("feeding_entries").delete().eq("id", entry_id).execute()
