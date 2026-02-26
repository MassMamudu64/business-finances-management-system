from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

from app.core.supabase import supabase


security = HTTPBearer()


def get_current_user(token: HTTPAuthorizationCredentials = Depends(security)):
    """
    Resolve the current authenticated Supabase user from the Bearer token.

    All protected routes must depend on this function (directly or via
    role-specific guards) so that the backend remains the single source of
    truth for identity.
    """
    try:
        data = supabase.auth.get_user(token.credentials)
        return data.user
    except Exception:
        # Explicit, structured unauthorized error for the frontend.
        raise HTTPException(
            status_code=401,
            detail={
                "error": "unauthorized",
                "message": "Invalid or expired token",
            },
        )


def require_admin(user=Depends(get_current_user)):
    """
    Guard that enforces admin-only access based on Supabase user metadata.
    All admin-only routes should depend on this function, not on any
    frontend-supplied role state.
    """
    role = user.user_metadata.get("role", "employee")
    if role != "admin":
        # Explicit forbidden error shape for consistent handling on the frontend.
        raise HTTPException(
            status_code=403,
            detail={
                "error": "forbidden",
                "message": "Admin role required",
            },
        )
    return user
