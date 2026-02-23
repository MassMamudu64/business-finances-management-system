from fastapi import APIRouter, Depends
from app.core.auth_guard import get_current_user
from app.services.admin_service import (
    get_summary,
    get_monthly_report,
    get_employee_activity,
    get_top_stores
)

router = APIRouter(prefix="/admin", tags=["Admin"])

@router.get("/summary")
def admin_summary(user = Depends(get_current_user)):
    return get_summary()

@router.get("/monthly")
def admin_monthly(user = Depends(get_current_user)):
    return get_monthly_report()

@router.get("/employees")
def admin_employees(user = Depends(get_current_user)):
    return get_employee_activity()

@router.get("/stores")
def admin_stores(user = Depends(get_current_user)):
    return get_top_stores()