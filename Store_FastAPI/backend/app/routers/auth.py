from fastapi import APIRouter, Depends, HTTPException

from app.core.auth_guard import get_current_user
from app.models.auth_models import LoginRequest
from app.core.supabase import supabase


router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post("/login")
def login(request: LoginRequest):
    """
    Authenticate the user via Supabase Auth and return JWTs plus a
    backend-defined dashboard path. The frontend must not infer roles
    or permissions on its own.
    """
    # Send email + password to Supabase Auth
    response = supabase.auth.sign_in_with_password(
        {
            "email": request.email,
            "password": request.password,
        }
    )

    print("SUPABASE RESPONSE:", response)

    # If login failed
    if not response or not response.session:
        raise HTTPException(
            status_code=401,
            detail={
                "error": "unauthorized",
                "message": "Invalid email or password",
            },
        )

    user_role = response.user.user_metadata.get("role", "employee")
    # Backend defines the dashboard path to avoid role logic in the frontend.
    dashboard_path = "/admin" if user_role == "admin" else "/employee"

    return {
        "access_token": response.session.access_token,
        "refresh_token": response.session.refresh_token,
        "role": user_role,
        "dashboard_path": dashboard_path,
        "user": response.user,
    }


@router.get("/me")
def me(user=Depends(get_current_user)):
    """
    Return the current authenticated user's identity and role based on the
    Supabase token. This endpoint lets the frontend query authoritative user
    data without trusting any local role state.
    """
    user_role = user.user_metadata.get("role", "employee")

    return {
        "id": user.id,
        "email": user.email,
        "role": user_role,
    }

