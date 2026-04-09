"""
Design Generator Service
Generates simple floor plans based on plot size and number of rooms
"""

def generate_floor_plan(plot_size, num_rooms):
    """
    Generate a simple ASCII floor plan
    
    Args:
        plot_size: Total plot size in sq ft
        num_rooms: Number of rooms to include
    
    Returns:
        dict: Contains floor plan text, room details, and metrics
    """
    
    # Calculate room size based on plot and number of rooms
    room_size = plot_size // (num_rooms + 1)  # +1 for common area
    common_area = plot_size - (room_size * num_rooms)
    
    # Create ASCII floor plan
    floor_plan = generate_ascii_plan(num_rooms, room_size, common_area)
    
    # Generate room details
    room_details = []
    for i in range(num_rooms):
        room_details.append({
            "name": f"Room {i+1}",
            "size": f"{room_size} sq ft",
            "dimensions": f"{int(room_size**0.5)}x{int(room_size**0.5)} ft"
        })
    
    room_details.append({
        "name": "Common Area (Living/Kitchen)",
        "size": f"{common_area} sq ft",
        "dimensions": f"{int(common_area**0.5)}x{int(common_area**0.5)} ft"
    })
    
    return {
        "floor_plan": floor_plan,
        "room_details": room_details,
        "total_area": plot_size,
        "num_rooms": num_rooms,
        "description": f"Generated a {plot_size} sq ft layout with {num_rooms} rooms"
    }


def generate_ascii_plan(num_rooms, room_size, common_area):
    """Generate ASCII representation of floor plan"""
    
    plan = "\n" + "=" * 50 + "\n"
    plan += "             FLOOR PLAN LAYOUT\n"
    plan += "=" * 50 + "\n\n"
    
    # Room layout
    plan += "+---+---+---+---+---+\n"
    
    # Display rooms
    for i in range(0, num_rooms, 3):
        plan += "|"
        for j in range(3):
            if i + j < num_rooms:
                plan += f" R{i+j+1} |"
            else:
                plan += "     |"
        plan += "\n+---+---+---+---+---+\n"
    
    # Common area
    plan += "|       LIVING/KITCHEN      |\n"
    plan += "+---+---+---+---+---+\n\n"
    
    plan += f"Layout breakdown:\n"
    plan += f"  • Common Area: {common_area} sq ft\n"
    plan += f"  • {num_rooms} Bedrooms: {room_size} sq ft each\n"
    plan += f"  • Total: {num_rooms * room_size + common_area} sq ft\n"
    
    return plan
