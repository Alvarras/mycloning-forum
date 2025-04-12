
# Forum Application Documentation

## Frontend: React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

### Setup Frontend

1. **Install dependencies**:
   First, navigate to your `frontend` directory and install the required dependencies:
   ```bash
   npm install
   ```

2. **Start the development server**:
   To start the Vite development server, run the following command in your `frontend` directory:
   ```bash
   npm run dev
   ```

   This will start the development server at [http://localhost:5173](http://localhost:5173).

3. **ESLint Configuration**:
   If you are developing a production application, we recommend using TypeScript and enabling type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

---

## Backend: FastAPI (Forum API)

This is the FastAPI backend for the Forum application.

### Setup Backend

1. **Create a virtual environment**:
   Navigate to your `backend` directory and create a virtual environment:
   ```bash
   python -m venv venv
   ```

2. **Activate the virtual environment**:
   - **Windows**: `venv\Scripts\activate`
   - **macOS/Linux**: `source venv/bin/activate`

3. **Install dependencies**:
   Install the necessary dependencies for FastAPI:
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure the database**:
   - Edit `database.py` to set your MySQL connection string.
   - Create a MySQL database named `forum_db`.

5. **Run the application**:
   To start the FastAPI backend, run:
   ```bash
   uvicorn main:app --reload
   ```

   This will start the backend server at [http://localhost:8000](http://localhost:8000).

### API Documentation

Once the server is running, you can access the API documentation at:

- **Swagger UI**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **ReDoc**: [http://localhost:8000/redoc](http://localhost:8000/redoc)

### API Endpoints

#### Authentication
- `POST /token` - Get access token (login)

#### Users
- `POST /users/` - Register a new user
- `GET /users/me/` - Get current user information

#### Categories
- `GET /categories/` - List all categories
- `POST /categories/` - Create a new category
- `GET /categories/{category_id}/posts/` - Get posts in a category

#### Posts
- `GET /posts/` - List all posts
- `POST /posts/` - Create a new post
- `GET /posts/{post_id}` - Get a specific post
- `PUT /posts/{post_id}` - Update a post
- `DELETE /posts/{post_id}` - Delete a post

#### Comments
- `GET /posts/{post_id}/comments/` - Get comments for a post
- `POST /posts/{post_id}/comments/` - Add a comment to a post

---

## Project Structure

### Frontend (React + Vite)
The frontend is located in the `frontend` directory. It uses React and Vite for development and bundling.

- **Development Server**: [http://localhost:5173](http://localhost:5173)
- **Main Components**:
  - `src/` - The source code for the frontend.
  - `index.html` - Main HTML file.
  - `src/index.css` - Global CSS.
  
### Backend (FastAPI)
The backend is located in the `backend` directory. It uses FastAPI for the API layer.

- **API Documentation**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **Main Components**:
  - `main.py` - The FastAPI application and routing.
  - `models.py` - Database models.
  - `database.py` - Database connection setup.
  - `schemas.py` - Pydantic schemas for data validation.

---

## Running Both Servers

1. **Start the Frontend**:
   Navigate to your `frontend` directory and run:
   ```bash
   npm run dev
   ```

2. **Start the Backend**:
   Navigate to your `backend` directory and run:
   ```bash
   uvicorn main:app --reload
   ```

This will run both the backend and frontend servers simultaneously:
- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend: [http://localhost:8000](http://localhost:8000)

Now, you can interact with both the React frontend and the FastAPI backend.
