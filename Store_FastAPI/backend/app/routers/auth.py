from fastapi import APIRouter, HTTPException
from app.models.auth_models import LoginRequest
from app.core.supabase import supabase

router = APIRouter(prefix="/auth", tags=["Auth"])

@router.post("/login")
def login(request: LoginRequest):
    # Send email + password to Supabase Auth
    response = supabase.auth.sign_in_with_password({
        "email": request.email,
        "password": request.password
    })

    print("SUPABASE RESPONSE:", response)

    # If login failed
    if not response or not response.session:
        raise HTTPException(status_code=401, detail="Invalid email or password")
    # add a user.user_metadata to the response like user.user_metadata = {"role": "admin"} for testing purposes

    user_role = response.user.user_metadata.get("role", "employee")  # Default to "user" if no role is set
    return {
        "access_token": response.session.access_token,
        "refresh_token": response.session.refresh_token,
        "role": user_role,
        "user": response.user
    }
