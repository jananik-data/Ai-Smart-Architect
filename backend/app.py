"""
AI Smart Architect Backend
Flask API for generating floor plans and cost estimates
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
from services.design_generator import generate_floor_plan
from services.cost_estimator import estimate_cost
import json
from datetime import datetime

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

# Simple in-memory user storage (in production, use a database)
users_db = {}


@app.route('/api/login', methods=['POST'])
def login():
    """
    Login endpoint
    
    Expected JSON payload:
    {
        "email": "user@example.com",
        "password": "password123"
    }
    """
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({
                "success": False,
                "message": "No data provided"
            }), 400
        
        email = data.get('email', '').strip()
        password = data.get('password', '')
        
        if not email or not password:
            return jsonify({
                "success": False,
                "message": "Email and password are required"
            }), 400
        
        if not email.endswith('@') and '@' in email:
            # For demo, accept any email/password combination
            # In production, verify against database
            user_key = email.lower()
            
            if user_key in users_db and users_db[user_key]['password'] == password:
                user = users_db[user_key]
            else:
                # Demo: create user on first login
                users_db[user_key] = {
                    'email': email,
                    'password': password,
                    'fullName': email.split('@')[0].title(),
                    'created_at': datetime.now().isoformat()
                }
                user = users_db[user_key]
            
            return jsonify({
                "success": True,
                "data": {
                    "user": {
                        "email": user['email'],
                        "fullName": user.get('fullName', email.split('@')[0].title())
                    },
                    "token": f"token_{user_key}_{datetime.now().timestamp()}"
                }
            }), 200
        else:
            return jsonify({
                "success": False,
                "message": "Invalid email format"
            }), 400
    
    except Exception as e:
        return jsonify({
            "success": False,
            "message": f"Server error: {str(e)}"
        }), 500


@app.route('/api/register', methods=['POST'])
def register():
    """
    Register endpoint
    
    Expected JSON payload:
    {
        "email": "user@example.com",
        "password": "password123",
        "fullName": "John Doe"
    }
    """
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({
                "success": False,
                "message": "No data provided"
            }), 400
        
        email = data.get('email', '').strip().lower()
        password = data.get('password', '')
        full_name = data.get('fullName', '').strip()
        
        if not email or not password or not full_name:
            return jsonify({
                "success": False,
                "message": "Email, password, and full name are required"
            }), 400
        
        if len(password) < 6:
            return jsonify({
                "success": False,
                "message": "Password must be at least 6 characters"
            }), 400
        
        if '@' not in email:
            return jsonify({
                "success": False,
                "message": "Invalid email format"
            }), 400
        
        if email in users_db:
            return jsonify({
                "success": False,
                "message": "Email already registered"
            }), 400
        
        # Create new user
        users_db[email] = {
            'email': email,
            'password': password,
            'fullName': full_name,
            'created_at': datetime.now().isoformat()
        }
        
        return jsonify({
            "success": True,
            "data": {
                "user": {
                    "email": email,
                    "fullName": full_name
                },
                "token": f"token_{email}_{datetime.now().timestamp()}"
            }
        }), 201
    
    except Exception as e:
        return jsonify({
            "success": False,
            "message": f"Server error: {str(e)}"
        }), 500


@app.route('/api/generate', methods=['POST'])
def generate_design():
    """
    Main API endpoint that generates floor plan and cost estimate
    
    Expected JSON payload:
    {
        "plot_size": 2000,
        "num_rooms": 3,
        "budget_level": "medium"
    }
    
    Response:
    {
        "success": true,
        "data": {
            "floorPlan": {...},
            "costEstimate": {...}
        }
    }
    """
    
    try:
        # Get data from request
        data = request.get_json()
        
        # Validate input
        if not data:
            return jsonify({
                "success": False,
                "error": "No data provided"
            }), 400
        
        plot_size = data.get('plot_size')
        num_rooms = data.get('num_rooms')
        budget_level = data.get('budget_level', 'medium')
        
        # Validate required fields
        if not plot_size or not num_rooms:
            return jsonify({
                "success": False,
                "error": "Missing required fields: plot_size, num_rooms"
            }), 400
        
        # Validate data types
        try:
            plot_size = float(plot_size)
            num_rooms = int(num_rooms)
        except ValueError:
            return jsonify({
                "success": False,
                "error": "Invalid data types: plot_size must be number, num_rooms must be integer"
            }), 400
        
        # Validate ranges
        if plot_size <= 0 or plot_size > 100000:
            return jsonify({
                "success": False,
                "error": "Plot size must be between 1 and 100000 sq ft"
            }), 400
        
        if num_rooms <= 0 or num_rooms > 20:
            return jsonify({
                "success": False,
                "error": "Number of rooms must be between 1 and 20"
            }), 400
        
        # Generate floor plan
        floor_plan_data = generate_floor_plan(plot_size, num_rooms)
        
        # Generate cost estimate
        cost_estimate_data = estimate_cost(plot_size, num_rooms, budget_level)
        
        # Return response
        return jsonify({
            "success": True,
            "data": {
                "floorPlan": floor_plan_data,
                "costEstimate": cost_estimate_data
            }
        }), 200
    
    except Exception as e:
        return jsonify({
            "success": False,
            "error": f"Server error: {str(e)}"
        }), 500


@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        "status": "healthy",
        "service": "AI Smart Architect Backend"
    }), 200


@app.route('/', methods=['GET'])
def index():
    """Root endpoint"""
    return jsonify({
        "message": "AI Smart Architect API is running",
        "endpoints": {
            "health": "/api/health",
            "generate": "/api/generate (POST)"
        }
    }), 200


if __name__ == '__main__':
    # Run Flask development server
    app.run(debug=True, host='0.0.0.0', port=5000)
