from serpapi import GoogleSearch
from settings import get_settings
from schemas import FlightSearch

#outbound_date, return_date is str in YYYY-MM-DD
def get_flight_data(flight: FlightSearch):
    api_key = get_settings().serpapi_api_key

    params = {
        "api_key": api_key,
        "engine": "google_flights",
        "hl": "en",
        "gl": "sg",
        "departure_id": flight.departure_id,
        "arrival_id": flight.arrival_id,
        "outbound_date": flight.outbound_date,
        "return_date": flight.return_date,
        "currency": "SGD",
    }

    search = GoogleSearch(params)
    results = search.get_dict()

    return results

flight = FlightSearch("SIN", "KIX", "2026-02-12", "2026-02-24")
print(flight)
# print(get_flight_data(FlightSearch()))
