import uuid
from app.core.supabase_client import supabase

BUCKET = "receipts"

def upload_receipt_file(user_id: str, file_bytes: bytes, filename: str, content_type: str):
    file_id = str(uuid.uuid4())
    file_path = f"{user_id}/{file_id}-{filename}"

    supabase.storage.from_(BUCKET).upload(
        file_path,
        file_bytes,
        file_options={"content-type": content_type}
    )

    file_url = supabase.storage.from_(BUCKET).get_public_url(file_path)
    return file_url