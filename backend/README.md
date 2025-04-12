# Forum API Backend

This is the FastAPI backend for the Forum application.

## Setup

1. Create a virtual environment:
   \`\`\`
   python -m venv venv
   \`\`\`

2. Activate the virtual environment:
   - Windows: `venv\Scripts\activate`
   - macOS/Linux: `source venv/bin/activate`

3. Install dependencies:
   \`\`\`
   pip install -r requirements.txt
   \`\`\`

4. Configure the database:
   - Edit `database.py` to set your MySQL connection string
   - Create a MySQL database named `forum_db`

5. Run the application:
   \`\`\`
   uvicorn main:app --reload
   \`\`\`

## API Documentation

Once the server is running, you can access the API documentation at:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## API Endpoints

### Authentication
- `POST /token` - Get access token (login)

### Users
- `POST /users/` - Register a new user
- `GET /users/me/` - Get current user information

### Categories
- `GET /categories/` - List all categories
- `POST /categories/` - Create a new category
- `GET /categories/{category_id}/posts/` - Get posts in a category

### Posts
- `GET /posts/` - List all posts
- `POST /posts/` - Create a new post
- `GET /posts/{post_id}` - Get a specific post
- `PUT /posts/{post_id}` - Update a post
- `DELETE /posts/{post_id}` - Delete a post

### Comments
- `GET /posts/{post_id}/comments/` - Get comments for a post
- `POST /posts/{post_id}/comments/` - Add a comment to a post
