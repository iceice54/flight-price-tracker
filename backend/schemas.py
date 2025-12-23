from pydantic import BaseModel, FutureDate
from datetime import datetime

class FlightSearch(BaseModel):
    departure_id: str
    arrival_id: str
    outbound_date: FutureDate
    return_date: FutureDate

# https://serpapi.com/playground?engine=google_flights&departure_id=SIN&arrival_id=KIX&gl=sg&hl=en&currency=SGD&outbound_date=2026-02-12&return_date=2026-02-24

class AirportInfo(BaseModel):
    name: str
    id: str
    time: datetime

class FlightSegment(BaseModel):
    departure_airport: AirportInfo
    arrival_airport: AirportInfo
    duration: int
    airplane: str
    airline: str
    travel_class: str
    flight_number: str

class FlightResult(BaseModel):
    flights: list[FlightSegment]
    price: int
    total_duration: int
    type: str

