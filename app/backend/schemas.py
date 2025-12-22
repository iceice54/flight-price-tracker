from pydantic import BaseModel, Field, FutureDate

class FlightSearch(BaseModel):
    departure_id: str
    arrival_id: str
    outbound_date: FutureDate
    return_date: FutureDate
