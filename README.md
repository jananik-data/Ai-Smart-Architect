# 🏗️ AI Smart Architect

> **Transform Your Ideas Into Smart Home Designs**

A full-stack web application that generates floor plans and estimates construction costs using AI.  
Perfect for architects, builders, and home design enthusiasts.

<br />

---

<br />

## 📑 Quick Navigation

| 🚀 | 📚 | 🔌 | ⚙️ | 🐛 |
|-------|-------|-------|-------|-------|
| [Quick Start](#-quick-start) | [Installation](#-installation--setup) | [API Docs](#-api-endpoints) | [Customize](#-customization) | [Help](#-troubleshooting) |

<br />

---

<br />

## ✨ Features at a Glance

<table>
<tr>
<td>
  
### 📐 Smart Floor Plans
► AI-generated layouts  
► Room by room breakdown  
► Dimension calculations  

</td>
<td>
  
### 💰 Cost Estimation  
► Total cost breakdown  
► Per sq ft pricing  
► Material details  

</td>
</tr>
<tr>
<td>
  
### 🔐 Authentication
► Gmail-style login  
► Secure signup  
► Session management  

</td>
<td>
  
### 📥 PDF Export
► Download designs  
► Print-ready format  
► High quality output  

</td>
</tr>
<tr>
<td>
  
### 🎨 Modern UI
► Responsive design  
► Smooth animations  
► Beautiful gradients  

</td>
<td>
  
### ⚡ Real-time Validation
► Instant feedback  
► Error handling  
► User guidance  

</td>
</tr>
</table>

<br />

---

<br />

## 📁 Project Structure

## 📁 Project Structure

```
AI-Smart-Architect/
├── 📂 backend/
│   ├── app.py ........................... Flask API Server
│   ├── requirements.txt ................. Python Dependencies
│   └── 📂 services/
│       ├── design_generator.py ......... Floor Plan Logic
│       └── cost_estimator.py ........... Cost Calculation
│
├── 📂 frontend/
│   ├── package.json ..................... Node Dependencies
│   ├── 📂 public/
│   │   └── 📂 assets/images/
│   │       └── house.svg ............... Logo Image
│   │
│   └── 📂 src/
│       ├── 📂 pages/
│       │   ├── Home.jsx ................ Dashboard Page
│       │   └── Home.css
│       │
│       ├── 📂 components/
│       │   ├── Welcome.jsx ............ Landing Page
│       │   ├── Login.jsx .............. Auth Form
│       │   ├── Form.jsx ............... Design Form
│       │   ├── ResultCard.jsx ......... Results Display
│       │   └── Navbar.jsx ............ Navigation
│       │
│       ├── 📂 services/
│       │   ├── api.js ................. Backend API
│       │   ├── auth.js ................ Auth API
│       │   └── pdf.js ................. PDF Export
│       │
│       └── 📂 context/
│           └── AuthContext.jsx ........ Auth State
│
├── README.md ............................ This File
└── QUICK_START.md ...................... Quick Guide
```

<br />

---

<br />

## 🚀 Quick Start

### Prerequisites

```
✓ Node.js v14+
✓ Python 3.8+
✓ Git
```

### 30-Second Setup

```bash
# Terminal 1: Backend
cd backend
pip install -r requirements.txt
python app.py

# Terminal 2: Frontend (New Terminal)
cd frontend
npm install
npm start
```

**That's it!** 🎉

✅ **Backend:** http://localhost:5000  
✅ **Frontend:** http://localhost:3000

<br />

---

<br />

## 📦 Installation & Setup

### Backend Installation (Python/Flask)

**Step 1️⃣** → Navigate to backend folder
```bash
cd backend
```

**Step 2️⃣** → Create virtual environment *(Optional)*
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS/Linux
python -m venv venv
source venv/bin/activate
```

**Step 3️⃣** → Install dependencies
```bash
pip install -r requirements.txt
```

**Step 4️⃣** → Run server
```bash
python app.py
```

✅ Server at: `http://localhost:5000`

<br />

### Frontend Installation (React)

**Step 1️⃣** → Open new terminal and navigate
```bash
cd frontend
```

**Step 2️⃣** → Install packages
```bash
npm install
```

**Step 3️⃣** → Start development server
```bash
npm start
```

✅ App at: `http://localhost:3000`

<br />

---

<br />

## 💻 How to Use

```
STEP 1️⃣  Welcome Page
   ↓
STEP 2️⃣  Signup / Login
   ↓
STEP 3️⃣  Fill Design Form
   ↓
STEP 4️⃣  View Results
   ↓
STEP 5️⃣  Download PDF
```

<br />

### Detailed Steps

**1️⃣ Welcome Page**
- See inspiring message: *"Every great home starts with a small idea"*
- Click **"Start Designing Your Home"** button

**2️⃣ Authentication**
- **New User?** → Click "Sign Up"
- **Existing User?** → Click "Sign In"
- Enter valid email & password (min 6 chars)

**3️⃣ Design Form**
- **Plot Size:** 100 - 100,000 sq ft
- **Number of Rooms:** 1 - 20
- **Budget Level:** Budget-Friendly / Standard / Premium
- Click **"Generate Design"**

**4️⃣ View Results**
- 📐 Floor plan layout
- 🏠 Room details & dimensions
- 💰 Total & per-sqft costs
- 📊 Cost breakdown chart

**5️⃣ Download & Share**
- Click **"Download as PDF"**
- Share your design
- Start over anytime

<br />

---

<br />

## 🔌 API Endpoints

### 🔐 Authentication

#### **POST** `/api/login`

Login to existing account

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "email": "user@example.com",
      "fullName": "John Doe"
    },
    "token": "token_xxx_123456"
  }
}
```

<br />

#### **POST** `/api/register`

Create new account

**Request:**
```json
{
  "email": "newuser@example.com",
  "password": "password123",
  "fullName": "Jane Smith"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "email": "newuser@example.com",
      "fullName": "Jane Smith"
    },
    "token": "token_xxx_789012"
  }
}
```

<br />

---

<br />

### 🏗️ Design Generation

#### **POST** `/api/generate`

Generate floor plan & cost estimate

**Request:**
```json
{
  "plot_size": 2500,
  "num_rooms": 4,
  "budget_level": "medium"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "floorPlan": {
      "floor_plan": "ASCII visualization",
      "room_details": [
        {
          "room_number": 1,
          "type": "Living Room",
          "area": 450,
          "dimensions": "20 x 22.5 ft"
        }
      ],
      "total_area": 2500,
      "num_rooms": 4
    },
    "costEstimate": {
      "summary": {
        "total_cost": 250000,
        "cost_per_sqft": 100,
        "cost_per_room": 62500
      },
      "breakdown": {
        "foundation": 50000,
        "structure": 75000,
        "electrical": 30000,
        "plumbing": 25000,
        "finishing": 70000
      },
      "timeline": "6-8 months"
    }
  }
}
```

<br />

---

<br />

### 🏥 Health Check

#### **GET** `/api/health`

Check if backend is running

**Response:**
```json
{
  "status": "healthy",
  "service": "AI Smart Architect Backend"
}
```

<br />

---

<br />

## 🏗️ Components

### Backend (Python)

**`design_generator.py`**
```
► generate_floor_plan() .... Creates layout
► generate_ascii_plan() .... Visualization
► calculate_room_sizes() ... Room dimensions
```

**`cost_estimator.py`**
```
► estimate_cost() ............. Total costs
► estimate_timeline() ......... Duration
► calculate_breakdown_percentage() .. Distribution
```

<br />

### Frontend (React)

**Pages**
```
► Home.jsx .......... Main dashboard
► Welcome.jsx ....... Landing page
```

**Components**
```
► Login.jsx ......... Auth form
► Form.jsx .......... Design form
► ResultCard.jsx .... Results display
► Navbar.jsx ........ Navigation bar
► Welcome.jsx ....... Welcome screen
```

**Services**
```
► auth.js ........... Authentication API
► api.js ............ Design API
► pdf.js ............ PDF generation
```

**State Management**
```
► AuthContext.jsx ... Global auth state
```

<br />

---

<br />

## ⚙️ Customization

### 1. Adjust Cost Rates

Edit `backend/services/cost_estimator.py`:

```python
cost_per_sqft = {
    "low": 50,      # Budget-Friendly ↓
    "medium": 100,  # Standard
    "high": 150     # Premium ↑
}
```

<br />

### 2. Change Colors

Update CSS in `frontend/src/components/`:
- `Login.css` ................. Auth page theme
- `Welcome.css` ............... Welcome page style
- `Home.css` .................. Dashboard colors

<br />

### 3. Modify Room Logic

Edit `backend/services/design_generator.py`:
- Room sizing algorithm
- Layout calculations
- Visualization logic

<br />

### 4. Update Port Numbers

**Backend (Flask):**
```python
# app.py line 248
app.run(debug=True, host='0.0.0.0', port=5000)
```

**Frontend (React):**
```javascript
// src/services/api.js
const API_BASE_URL = 'http://localhost:5000';
```

<br />

---

<br />

## 🐛 Troubleshooting

| Problem | Cause | Solution |
|---------|-------|----------|
| **Backend won't start** | Missing deps / Python version | `pip install -r requirements.txt` + Python 3.8+ |
| **Frontend won't load** | Missing node_modules | `npm install` then `npm start` |
| **Can't connect** | Backend offline / Port clash | Ensure backend on 5000 |
| **Port 3000 in use** | Another process running | Kill process or change port |
| **Port 5000 in use** | Flask already running | Kill process or change port |
| **CORS errors** | Backend not configured | Enabled in `app.py` |
| **PDF fails** | Missing libraries | `npm install html2canvas jspdf` |
| **Login fails** | Invalid email format | Use correct format: user@domain.com |
| **Git not found** | Not installed | Install from https://git-scm.com |
| **npm not found** | Node.js path issue | Reinstall Node.js or update PATH |

<br />

---

<br />

## 🔮 Future Enhancements

```
🎨 3D Visualization ........... Interactive 3D viewer
🗄️  Database Backend .......... User data storage
📊 Analytics Dashboard ....... Statistics & history
🏠 Design Variations ......... Multiple layouts
📱 Mobile App ............... iOS/Android native
🤖 AI Suggestions ........... Smart recommendations
💬 Chat Support ............. Live assistant
🎯 Advanced Filters ......... Style & feature search
🌍 Multi-language ........... Global support
☁️  Cloud Storage ............ Online backup
```

**Development Timeline:**
- Q2 2026: 3D visualization
- Q3 2026: Database backend
- Q4 2026: Mobile beta
- 2027: AI features

<br />

---

<br />

## 📄 License & Contributing

### 📜 License

**MIT License** © 2026 AI Smart Architect

Open source • Free to use • Modify & distribute

<br />

### 🤝 Contributing

Want to help? Here's how:

```
1. Fork repository
2. Create feature branch
   git checkout -b feature/awesome-feature
3. Commit changes
   git commit -m 'Add awesome feature'
4. Push branch
   git push origin feature/awesome-feature
5. Open Pull Request
```

<br />

---

<br />

## 📞 Support & Contact

**Need help?**

- 📧 Email: support@ai-smart-architect.com
- 🐛 Issues: [GitHub Issues](https://github.com/jananik-data/Ai-Smart-Architect/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/jananik-data/Ai-Smart-Architect/discussions)
- 📖 Docs: See [QUICK_START.md](QUICK_START.md)

<br />

---

<br />

## 🎉 Acknowledgments

```
Flask ..................... Web Framework
React ..................... UI Library
CORS ...................... Cross-origin Support
html2canvas & jsPDF ....... PDF Generation
GitHub .................... Version Control
```

<br />

---

<br />

<div align="center">

### ✨ Happy Designing! ✨

**🎨 🏗️ 💡**

<br >

**[⬆ Back to Top](#-ai-smart-architect)**

<br >

Last Updated: April 9, 2026  
Version: 1.0.0

Made with ❤️ for architects, builders & designers

</div>

## License

MIT License - Feel free to use and modify!

---

## Support

For issues or questions, check the code comments or review the project structure above.

Happy designing! 🎨🏗️
#   A i - S m a r t - A r c h i t e c t 
 
 