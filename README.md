# OneBitFlix API

This is a RESTful API for an online course platform, inspired by streaming services. It allows users to register, authenticate, browse courses, favorite and like courses, track their progress, and manage their profiles. The API also includes an admin panel for managing platform data.

---

## Features

-   **User Authentication:** Register, login, and JWT-based authentication.
-   **Course Management:** List, search, and view featured, newest, and popular courses.
-   **Favorites:** Add or remove courses from user favorites.
-   **Likes:** Like or unlike courses.
-   **Episodes:** Track watch time for course episodes.
-   **User Profile:** View and update user information and password.
-   **Admin Panel:** Manage users, courses, and other resources via AdminJS.

---

## Technologies Used

-   **Node.js** & **Express**: Web server and routing.
-   **Sequelize**: ORM for PostgreSQL/MySQL/SQLite database management.
-   **JWT (jsonwebtoken)**: Authentication and authorization.
-   **AdminJS**: Admin dashboard for managing data.
-   **TypeScript**: Type safety and better code maintainability.
-   **CORS**: Cross-origin resource sharing.
-   **dotenv**: Environment variable management.

---

## Project Structure

```
src/
├── adminjs/                # AdminJS configuration
├── controllers/            # Route controllers (business logic)
├── database/               # Sequelize database setup
├── middlewares/            # Express middlewares (auth, etc.)
├── models/                 # Sequelize models (User, Course, Like, Favorite, etc.)
├── routes.ts               # API route definitions
├── server.ts               # App entry point
└── services/               # Business logic and database queries
```

---

## API Endpoints (Examples)

-   `POST   /auth/register` — Register a new user
-   `POST   /auth/login` — Authenticate and receive a JWT
-   `GET    /categories` — List all categories (auth required)
-   `GET    /courses/featured` — List featured courses (auth required)
-   `POST   /favorites` — Add a course to favorites (auth required)
-   `DELETE /favorites/:id` — Remove a course from favorites (auth required)
-   `POST   /likes` — Like a course (auth required)
-   `DELETE /likes/:id` — Unlike a course (auth required)
-   `GET    /users/current` — Get current user profile (auth required)
-   `PUT    /users/current` — Update user profile (auth required)
-   `PUT    /users/current/password` — Change password (auth required)
-   `GET    /episodes/:id/watchTime` — Get watch time for an episode (auth required)
-   `POST   /episodes/:id/watchTime` — Set watch time for an episode (auth required)

---

## Getting Started

1. **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/onebitflix-api.git
    cd onebitflix-api
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Configure environment variables:**

    - Create a `.env` file based on `.env.example` and set your database and JWT secrets.

4. **Run database migrations (if any):**

    ```bash
    npx sequelize-cli db:migrate
    ```

5. **Start the server:**
    ```bash
    npm run dev
    ```
    The API will be available at `http://localhost:3000`.

---

## Admin Panel

-   Access the AdminJS dashboard at `/admin` (e.g., `http://localhost:3000/admin`).
-   Use your admin credentials to log in and manage users, courses, and other resources.

---

## Author

Developed by Alizon Kingslen and contributors.
