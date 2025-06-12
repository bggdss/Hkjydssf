# Children's Clothing Co. - Mockup Website

This project is a client-side JavaScript-driven mockup of a children's clothing e-commerce website. It demonstrates common e-commerce functionalities like browsing products, viewing product details, adding items to a cart, user registration, and login. All data is stored and managed locally using JSON files and browser `localStorage`/`sessionStorage`.

## Features

*   Product catalog display from `data/products.json`.
*   Product detail pages.
*   Shopping cart functionality using `localStorage`.
*   User registration and login simulation using `data/users.json` and `sessionStorage`.
*   Dynamic navigation bar that updates based on user login state.
*   Basic HTML structure and CSS styling.

## How to Run Locally

1.  **Get the Files:**
    *   Ensure you have all the files from this repository/project directory. This includes:
        *   All `.html` files (e.g., `index.html`, `products.html`, etc.)
        *   `style.css`, `theme.css`
        *   `main.js`
        *   The `data/` directory containing `products.json` and `users.json`.

2.  **Navigate to Project Directory:**
    *   Open your terminal or file explorer and navigate to the root directory where you have saved these files.

3.  **Open in Browser:**
    *   Simply open the `index.html` file in your preferred web browser (e.g., Chrome, Firefox, Edge, Safari).

4.  **Understanding Mocked Features:**
    *   **User System:** User registration and login are mocked. User data is initially read from `data/users.json`. New registrations are added to a temporary in-memory list for the duration of the session and user sessions are managed using `sessionStorage`. No actual backend database is used.
    *   **Product Data:** Product information is loaded from `data/products.json`.
    *   **Shopping Cart:** The shopping cart state is saved in your browser's `localStorage`.

5.  **For a More Robust Experience (Optional - Using a Local HTTP Server):**
    *   Modern web browsers have security restrictions when running web pages directly from the local file system (`file:///...` protocol), especially for features like the `fetch()` API used to load JSON files. While this mockup is designed to work reasonably well via `file:///`, some browsers might be stricter.
    *   For the most reliable experience and to avoid potential `fetch` API issues with local files:
        *   It's recommended to serve the files using a simple local HTTP server.
        *   If you have Python installed, you can run a server easily:
            1.  Navigate to the project's root directory in your terminal.
            2.  Run the command: `python -m http.server` (for Python 3) or `python -m SimpleHTTPServer` (for Python 2).
            3.  Open your browser and go to `http://localhost:8000/` (or the port number shown in the terminal).
        *   Alternatively, tools like VS Code's "Live Server" extension can also be used.

## Project Structure

*   `*.html`: HTML files for various pages of the website.
*   `style.css`: General CSS styles.
*   `theme.css`: Theme-specific styles (colors, fonts).
*   `main.js`: Core JavaScript logic for interactivity, product handling, cart, and user authentication.
*   `data/products.json`: Mock database for product listings.
*   `data/users.json`: Mock database for user accounts.

Enjoy browsing the mockup!
