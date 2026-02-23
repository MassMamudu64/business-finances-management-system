from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from app.core.auth_guard import get_current_user
from app.services.upload_service import process_uploaded_file

router = APIRouter(prefix="/employee", tags=["Employee"])

@router.post("/upload")
async def upload_file(
    file: UploadFile = File(...),
    user = Depends(get_current_user)
):
    allowed_types = ["image/jpeg", "image/png", "application/pdf"]
    if file.content_type not in allowed_types:
        raise HTTPException(
            status_code=400,
            detail="Unsupported file type. Upload JPG, PNG, or PDF."
        )

    file_bytes = await file.read()

    result = process_uploaded_file(
        file_bytes=file_bytes,
        content_type=file.content_type,
        user=user
    )

    return result