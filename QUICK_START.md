# Quick Start Guide - AI Smart Architect

## ⚡ 5-Minute Setup

### Terminal 1 - Backend (Flask)

```bash
cd backend
pip install -r requirements.txt
python app.py
```

Expected output:
```
 * Running on http://127.0.0.1:5000
```

### Terminal 2 - Frontend (React)

```bash
cd frontend
npm install
npm start
```

Expected output:
```
Compiled successfully!
You can now view ai-smart-architect in the browser.
```

### ✅ Done!

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000

---

## Test the Application

1. Go to http://localhost:3000
2. Enter:
   - Plot Size: `2000` sq ft
   - Rooms: `3`
   - Budget: `Standard`
3. Click "Generate Design"
4. See the floor plan and cost estimate!

---

## File Summary

| File | Purpose |
|------|---------|
| `backend/app.py` | Main Flask API with `/api/generate` route |
| `backend/services/design_generator.py` | Generates floor plans |
| `backend/services/cost_estimator.py` | Calculates costs |
| `frontend/src/pages/Home.jsx` | Main React page |
| `frontend/src/components/Form.jsx` | Input form |
| `frontend/src/components/ResultCard.jsx` | Results display |
| `frontend/src/services/api.js` | API client |

---

## Common Issues

**"Cannot find module 'flask'"**
- Run: `pip install -r requirements.txt`

**"Port 3000 already in use"**
- Edit `frontend/src/services/api.js` and change `'http://localhost:5000'` to your preferred port
- Or: Kill existing process on port 3000

**"Cannot reach backend"**
- Make sure backend is running: `python app.py`
- Check `frontend/src/services/api.js` has correct API URL

---

Happy building! 🚀
