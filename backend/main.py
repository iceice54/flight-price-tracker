from typing import Annotated
from fastapi import FastAPI, Query, Depends
from backend.schemas import FlightSearch, FlightResult
from backend.dependencies import FlightService, get_flight_service

app = FastAPI()

@app.get("/")
async def root():
    return {"message" : "Hello"}

@app.get("/search")
async def search_flights(
    search_query: Annotated[FlightSearch, Query()],
    service: Annotated[FlightService, Depends(get_flight_service)]
) -> list[FlightResult]:
    results = service.get_flights(search_query)
    return results
    
