
### Design of website:
![Design of jewelry website](images/design.png)
### Diagram of user and backend interaction:
![Diagram](images/diagram.png)

# Cocojewel - Jewelry E-commerce Website

### Where can you securely order stunning waterproof jewelry perfect for any occasion? At Cocojewel, you are guaranteed to find stylish and beach-ready looks from rings, bracelets, necklaces, earrings, and more! The best part is, you don't have the hassle of taking off jewelry before going for a swim. Find sustainable and affordable jewelry at Cocojewel. You can also find other accessories like tote bags and hats for your next trip to the beach.

### Design of Website:
![Design of jewelry website](images/design.png)

### Diagram of User and Backend Interaction:
![Diagram](images/diagram.png)

---

## Startup Details

### Key Features:
- **Secure login** over HTTPS with email and password authentication.
- **Browse products** organized into categories (currently not implemented in full, but ready for future use).
- **User authentication** with JWT tokens for secure access to personalized cart data.
- **Real-time updates** using WebSockets for cart sharing (planned for future).
- **MongoDB integration** for storing user data, session data, and other necessary business info.

---

### Technology Used

#### HTML:
- The website structure is created with **HTML**.
- Key pages: login, create account, product browsing, and cart.
- Links are dynamically updated to connect different views and user actions.

#### CSS:
- Custom **CSS** styles the website, providing a responsive, clean, and professional look.
- Mobile-friendly design using media queries for different device sizes.
- Smooth transitions and hover effects for interactive elements (buttons, cart items, etc.).
- Background colors, fonts, and other UI elements are styled for a pleasant user experience.

#### JavaScript:
- **Interactivity**: Handles user actions like logging in, submitting forms, and interacting with the cart.
- **Form Validation**: Client-side checks on the login form and account creation.
- **API Integration**: Fetches data from the backend (e.g., user authentication, product retrieval).
- **WebSocket**: (Planned for future) Real-time updates when a cart is shared with a friend.

#### React:
- **Components**: Reusable components for user authentication, product display, and cart management.
- **State Management**: Uses **`useState`** and **`useEffect`** hooks to update cart contents and user details dynamically.
- **React Router**: Handles navigation between different pages like login, create account, and product browsing.

#### Service (Backend):
- **Node.js** and **Express.js** for the backend server.
- **MongoDB** stores user data (email, password) and authentication tokens.
- **JWT Authentication** for secure login and maintaining user sessions.
- **API Endpoints**:
  - `/api/auth/login` and `/api/auth/create` for user authentication.
  - `/api/auth/logout` to log the user out and clear the session.
  - Future routes planned for retrieving product data and managing carts.

#### Database (MongoDB):
- **MongoDB** is used for storing user data (authentication credentials, session tokens).
- Future integration plans include storing product data, cart information, and user purchase history.

#### WebSocket:
- **WebSocket** integration for real-time updates (e.g., shared cart updates with friends), although this feature is planned for future development.

---

### Features Implemented

1. **User Authentication**:
   - **Login and Account Creation**: Users can register and log in 
