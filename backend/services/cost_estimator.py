"""
Cost Estimator Service
Estimates construction cost based on plot size, rooms, and location
"""

def estimate_cost(plot_size, num_rooms, budget_priority="medium"):
    """
    Estimate construction cost
    
    Args:
        plot_size: Total plot size in sq ft
        num_rooms: Number of rooms
        budget_priority: "low", "medium", or "high" quality
    
    Returns:
        dict: Cost breakdown and totals
    """
    
    # Cost per sq ft based on priority
    cost_per_sqft = {
        "low": 50,      # Budget-friendly
        "medium": 100,  # Standard
        "high": 150     # Premium
    }
    
    priority = budget_priority.lower() if budget_priority.lower() in cost_per_sqft else "medium"
    rate = cost_per_sqft[priority]
    
    # Basic cost calculation
    basic_construction = plot_size * rate
    
    # Additional costs
    foundation = basic_construction * 0.10
    electrical = basic_construction * 0.08
    plumbing = basic_construction * 0.07
    finishing = basic_construction * 0.15
    contingency = basic_construction * 0.10
    
    # Total cost
    total_cost = (basic_construction + foundation + electrical + 
                  plumbing + finishing + contingency)
    
    # Cost per room
    cost_per_room = total_cost / (num_rooms + 1)  # +1 for common area
    
    return {
        "summary": {
            "total_estimated_cost": round(total_cost, 2),
            "cost_per_sqft": rate,
            "cost_per_room": round(cost_per_room, 2),
            "budget_level": priority.capitalize()
        },
        "breakdown": {
            "basic_construction": round(basic_construction, 2),
            "foundation": round(foundation, 2),
            "electrical_work": round(electrical, 2),
            "plumbing_work": round(plumbing, 2),
            "finishing_touches": round(finishing, 2),
            "contingency_10pct": round(contingency, 2)
        },
        "details": {
            "plot_size_sqft": plot_size,
            "number_of_rooms": num_rooms,
            "timeline_months": estimate_timeline(plot_size),
            "breakdown_percentage": calculate_breakdown_percentage(
                basic_construction, foundation, electrical, 
                plumbing, finishing, contingency
            )
        }
    }


def estimate_timeline(plot_size):
    """Estimate construction timeline in months"""
    # Rough estimate: 0.05 months per sq ft (adjust as needed)
    months = max(3, int(plot_size / 500))  # Minimum 3 months
    return months


def calculate_breakdown_percentage(basic, foundation, electrical, plumbing, finishing, contingency):
    """Calculate percentage breakdown of costs"""
    total = basic + foundation + electrical + plumbing + finishing + contingency
    
    return {
        "basic_construction": round((basic / total) * 100, 1),
        "foundation": round((foundation / total) * 100, 1),
        "electrical": round((electrical / total) * 100, 1),
        "plumbing": round((plumbing / total) * 100, 1),
        "finishing": round((finishing / total) * 100, 1),
        "contingency": round((contingency / total) * 100, 1)
    }
