from fastapi import FastAPI
from pydantic import BaseModel
from typing import Dict, Any, List

app = FastAPI()

class TripRequest(BaseModel):
    destination: str
    startDate: str
    endDate: str
    travelers: int
    budget: str
    totalBudget: int = 50000
    diffDays: int = 5
    interests: List[str] = []


@app.post("/generate")
async def generate_itinerary(request: TripRequest) -> Dict[str, Any]:
    print(f"Generating realistic itinerary for {request.destination} for {request.diffDays} days...")
    
    # Calculate detailed budget breakdown
    stays_budget = int(request.totalBudget * 0.45)
    transport_budget = int(request.totalBudget * 0.25)
    food_budget = int(request.totalBudget * 0.20)
    activities_budget = int(request.totalBudget * 0.10)
    
    budget_breakdown = {
        "total": request.totalBudget,
        "stays": stays_budget,
        "transport": transport_budget,
        "food": food_budget,
        "activities": activities_budget
    }
    
    days = []
    
    # Procedurally generate exact number of days
    for day in range(1, request.diffDays + 1):
        if day == 1:
            title = "Arrival & Settling In"
            activities = [
                {"time": "10:00 AM", "title": f"Arrive in {request.destination}", "type": "transport", "description": "Reach destination and transfer to hotel.", "cost": int(transport_budget * 0.2)},
                {"time": "12:30 PM", "title": "Check-in & Rest", "type": "hotel", "description": "Settle into your accommodation.", "cost": 0},
                {"time": "02:00 PM", "title": "Welcome Lunch", "type": "meal", "description": "Try local delicacies nearby.", "cost": int(food_budget / request.diffDays * 0.4)},
                {"time": "05:00 PM", "title": "Evening Walk", "type": "activity", "description": "Explore the immediate surroundings.", "cost": 0}
            ]
        elif day == request.diffDays:
            title = "Departure & Souvenirs"
            activities = [
                {"time": "09:00 AM", "title": "Breakfast & Packing", "type": "meal", "description": "Final breakfast at the hotel.", "cost": int(food_budget / request.diffDays * 0.3)},
                {"time": "11:00 AM", "title": "Souvenir Shopping", "type": "activity", "description": "Pick up memories to take home.", "cost": int(activities_budget * 0.2)},
                {"time": "02:00 PM", "title": "Departure", "type": "transport", "description": "Head back home.", "cost": int(transport_budget * 0.2)}
            ]
        else:
            title = f"Exploring {request.destination} - Day {day}"
            activities = [
                {"time": "09:00 AM", "title": "Morning Excursion", "type": "activity", "description": "Visit a top-rated local attraction.", "cost": int(activities_budget / request.diffDays)},
                {"time": "01:00 PM", "title": "Lunch Break", "type": "meal", "description": "Refuel with some good food.", "cost": int(food_budget / request.diffDays * 0.4)},
                {"time": "03:00 PM", "title": "Afternoon Sightseeing", "type": "activity", "description": "Continue exploring.", "cost": int(activities_budget / request.diffDays)},
                {"time": "07:30 PM", "title": "Dinner", "type": "meal", "description": "Relaxing dinner experience.", "cost": int(food_budget / request.diffDays * 0.5)}
            ]
            
        days.append({
            "day": day,
            "title": title,
            "activities": activities
        })

    mock_itinerary = {
        "overview": f"A carefully planned {request.diffDays}-day {request.budget} trip to {request.destination} for {request.travelers} people.",
        "budgetBreakdown": budget_breakdown,
        "days": days
    }
    
    return {"itinerary": mock_itinerary}
