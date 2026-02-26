from fastapi import APIRouter, Depends

from app.core.auth_guard import require_admin
from app.services.admin_service import (
    get_summary,
    get_monthly_report,
    get_employee_activity,
    get_top_stores,
)


router = APIRouter(prefix="/admin", tags=["Admin"])


@router.get("/summary")
def admin_summary(user=Depends(require_admin)):
    return get_summary()


@router.get("/monthly")
def admin_monthly(user=Depends(require_admin)):
    return get_monthly_report()


@router.get("/employees")
def admin_employees(user=Depends(require_admin)):
    return get_employee_activity()


@router.get("/stores")
def admin_stores(user=Depends(require_admin)):
    return get_top_stores()
