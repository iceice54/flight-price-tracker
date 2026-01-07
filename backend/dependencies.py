from functools import lru_cache
from backend.services.flight_service import FlightService

@lru_cache
def get_flight_service() -> FlightService:
    return FlightService()
