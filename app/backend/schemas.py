from pydantic import BaseModel, Field, FutureDate

class Flight(BaseModel):
    departure_id: str
    arrival_id: str
    outbound_date: FutureDate
    inbound_date: FutureDate
