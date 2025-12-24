from functools import lru_cache
from typing import Annotated
from fastapi import Depends
from backend.settings import Settings, get_settings
from backend.services.flight_service import FlightService

@lru_cache
def get_flight_service(settings: Annotated[Settings, Depends(get_settings)]) -> FlightService:
    return FlightService(settings)
