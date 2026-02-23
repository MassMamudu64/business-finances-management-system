from app.core.supabase_client import supabase

def save_transaction(data: dict):
    response = supabase.table("transactions").insert(data).execute()
    return response