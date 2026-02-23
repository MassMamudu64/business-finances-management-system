from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from app.core.supabase import supabase

security = HTTPBearer()

def get_current_user(token: HTTPAuthorizationCredentials = Depends(security)):
    try:
        data = supabase.auth.get_user(token.credentials)
        return data.user
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    
# Create admin only Guard
def require_admin(user = Depends(get_current_user)):
    role = user.user_metadata.get("role", "employee")
    if role != "admin":
        raise HTTPException(status_code=403, detail="Admins only")
    return user