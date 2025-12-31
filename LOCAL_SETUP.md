# Local Execution Report (CineVexa Movie Recommender)

This report provides a step-by-step guide to setting up and running the Movie Recommender project on your local machine for development and testing.

## 📋 Prerequisites
Before starting, ensure you have the following installed:
*   **Node.js** (v18 or higher)
*   **npm** (comes with Node.js)
*   **Git**
*   **A TMDB API Key** (Get one for free at [themoviedb.org](https://www.themoviedb.org/))

---

## 🛠 Step 1: Clone and Install
First, prepare the project folder and install all necessary dependencies for both the frontend and backend.

```bash
# Clone the repository
git clone https://github.com/Ashithjain05/cinevexa_movie_recommender-.git
cd cinevexa_movie_recommender-

# Install dependencies (Automated for all workspaces)
npm install
```

---

## ⚙️ Step 2: Environment Configuration
The backend requires an API key to fetch movie data from TMDB.

1.  Navigate to the `server` directory: `cd server`
2.  Create a file named `.env`
3.  Add your TMDB API key to the file:
    ```env
    TMDB_API_KEY=your_actual_tmdb_key_here
    ```
4.  Navigate back to the root: `cd ..`

---

## 🚀 Step 3: Running the Application
You need to run both the **Backend** and the **Frontend** simultaneously. 

### Option A: Using Helper Scripts (Recommended)
I have added shortcut scripts to the root `package.json`. Open two terminal windows:

*   **Terminal 1 (Backend):** `npm run dev:server`
*   **Terminal 2 (Frontend):** `npm run dev:client`

### Option B: Manual Execution
*   **Backend**: `cd server && npm start`
*   **Frontend**: `cd client && npm run dev`

---

## 🌐 Step 4: Accessing the App
Once both services are running:
*   **Frontend**: Open [http://localhost:5173](http://localhost:5173)
*   **Backend API**: Running at [http://localhost:3000](http://localhost:3000)

---

## 🔍 Troubleshooting
| Issue | Solution |
| :--- | :--- |
| **"vite: command not found"** | Run `npm install` in the `client` folder. |
| **"API Error"** | Verify your TMDB key in `server/.env`. |
| **CORS Errors** | Ensure the backend is running and the URL in `App.jsx` is correct. |

---
*Report generated on Dec 31, 2025.*
