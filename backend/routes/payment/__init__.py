from fastapi import APIRouter

router = APIRouter()

from .test import router as test_router

router.include_router(test_router, prefix="/test", tags=["payment"])