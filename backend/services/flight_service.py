from serpapi import GoogleSearch
from pathlib import Path
import json
from backend.settings import get_settings
from backend.schemas import FlightSearch, FlightResult
import pprint

class FlightService:
    def __init__(self):
        self.api_key = get_settings().serpapi_api_key
        self.mock_data_path = Path(__file__).parent / "mock_flight_data.json"

    def get_flights(self, query: FlightSearch):
        USE_MOCK_DATA = True

        if USE_MOCK_DATA:
            data = self._get_mock_data()
            results = data.get('best_flights', [])
        else:
            params = {
                "api_key": self.api_key,
                "engine": "google_flights",
                "hl": "en",
                "gl": "sg",
                "departure_id": query.departure_id,
                "arrival_id": query.arrival_id,
                "outbound_date": query.outbound_date,
                "return_date": query.return_date,
                "currency": "SGD",
            }

            #TODO: Implement results=

        # search = GoogleSearch(params)
        # results = search.get_dict()

        # pprint.pprint(results)

        flights = [FlightResult(**flight) for flight in results]

        # pprint.pprint(flights)
        # pprint.pprint(flight.model_dump())
        return flights
    
    def _get_mock_data(self) -> dict:
        if self.mock_data_path.exists():
            with open(self.mock_data_path, 'r') as f:
                return json.load(f)
        return {}


flightsearchdict = {
    "departure_id": "SIN",
    "arrival_id": "KIX",
    "outbound_date": "2026-02-12",
    "return_date": "2026-02-24",
}
flight = FlightSearch(**flightsearchdict)
# get_flights(flight)
