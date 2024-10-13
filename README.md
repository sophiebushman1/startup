# if you are a TA looking for html notes scroll all the way down, thanks!
# Sophie's jewelry website: Cocojewl
### Where can you securely order stunning waterproof jewelry perfect for any occasion? At Cocojewl, you are guaranteed to find stylish and beach-ready looks from rings, bracelets, necklaces, earrings, and more! The best part is, you don't have the hassle of taking off jewelry before going for a swim. Find sustainable and affordable jewelry at Cocojewl. You can also find other accessories like tote bags and hats for your next trip to the beach. When you find the perfect products for you, feel free to add to your cart and share it with a friend! By sharing with friends, you can get a 10% discount code on your purchase. Cocojewl is your new favorite jewelry boutique!

### Design of website:
![Design of jewelry website](images/design.png)
### Diagram of user and backend interaction:
![Diagram](images/diagram.png)

## Start up details:

# Key Features:
### Secure login over HTTPS.
### Browse products by categories 
### Add items to cart and view cart.
### Share cart with a friend to receive a 10% discount.
### Checkout and payment integration with a third-party payment gateway.
### Real-time cart updates when shared with a friend.
### Data Storage of user data, product inventory, and purchase history.

# Technology:
## HTML:
### Structuring the main website: login, product listing, cart, and checkout pages.
### Update the HTML page for browsing categories and checkout.
### Links between categories, products, and account pages.

## CSS:
### Styling the website.
### Using CSS for an organized layout.
### Responsive design using media queries or layouts (maybe for different device sizes).
### CSS animations for a smooth and professional experience when shopping.

## JavaScript:
### Interactivity for actions like signing in, adding items to the cart, and checking out your cart.
### Handling cart updates when shared with a friend using JavaScript.
### Validation for the login form and client-side input checks.
### Manages interaction between backend server and database for cart interactions and login authentication.

## React:
### Creating constant components for product, cart view, and login display.
### React Router for navigating between pages (browse, login, and checkout).
### Use React to update cart items quickly.
### Showing user-specific details (like an updated cart).

## Service (Backend):
### Building an API with endpoints for:
### User authentication (login/register).
### Fetching product data from the database.
### Adding and managing cart items.
### Processing payments through a third-party service like Stripe.
### A third-party API call to provide external services, such as fetching product recommendations or payment processing.

## Authentication:
### A secure login system where users sign in to manage their carts and check out.
### Displaying the user's name and cart contents once logged in.

## Database (MongoDB or MySQL):
### Storing user data, product details, and cart info.
### Stores user transaction and order history.
### Managing product inventories.

## WebSocket:
### Updates when a cart is shared with a friend. When a friend views or likes the cart, the user can see.

## HTML Deliverable:
### HTML pages: One for browsing products, one for the cart, and one for checkout.
### Links: Each product and category is hyperlinked.
### Text: Product details (e.g., price, description) are displayed on the product page.
### Images: Product images are loaded dynamically from the database.

## CSS Deliverable:
### Header, footer, main content: Well-organized layout across all pages.
### Diverse Layout design: The layout adjusts seamlessly for mobile, tablet, and desktop views.
### Navigation elements: Styling changes for active links, hovering effects, and transitions when moving between pages.
### Application text: Consistent fonts and colors across the website.
### Images: Sizing and styling for all product images.

## React Deliverable:
### Components: Separate components for product listings, cart management, and checkout process.
### State management: Handling cart updates in real-time, using hooks like useState and useEffect.
### Routing: React Router to switch between different views (e.g., product page, cart, checkout).
### Application logic: Showing updated cart contents when a friend views the shared cart.

## Service Deliverable:
### Backend endpoints: API calls for login, cart management, and product retrieval.
### Third-party API call: [Stripe](https://stripe.com/?utm_campaign=AMER_US_en_Google_Search_Brand_Stripe_EXA-20839462206&utm_medium=cpc&utm_source=google&ad_content=683853401230&utm_term=stripe&utm_matchtype=e&utm_adposition=&utm_device=c&gad_source=1&gclid=CjwKCAjwxY-3BhAuEiwAu7Y6s5htZcPaZgYvDsHHH-PPurr-GNz9PlxloB8ozBslqcswVF59RAf2OxoCb_sQAvD_BwE) integration for payment processing.
### Frontend service calls: Using fetch or Axios to communicate with the backend.

## Database/Login Deliverable:
### Database: Stores users, cart data, and purchase history.
### User registration: Allows new users to sign up and existing users to log in.
### Persistent data storage: Cart and user data persist between sessions.
### Login restrictions: Users can’t access the cart or checkout page unless authenticated.

## WebSocket Deliverable:
### Backend listens for WebSocket connections: Real-time updates for the shared cart.
### Frontend connects via WebSocket: The shared cart is updated in real-time when the friend adds or removes items.
### Data sent over WebSocket: Updates are broadcasted between users in real-time, reflecting cart changes.

# Cocojewel Website
### This project is a jewelry e-commerce website called Cocojewel. The site features a clean and user-friendly design, allowing users to browse and purchase a variety of jewelry products.

## Key Features:
### Home Page: Welcomes users and provides links to other pages.
### Product Browsing: Users can view products organized by categories such as rings, bracelets, necklaces, and more.
### Cart Functionality: Users can add items to their cart, view their selections, and proceed to checkout.
### Share Cart: Users can share their cart with friends to receive a discount.
### WebSocket Integration: Displays the number of times carts have been shared in real-time.

## Technology Used or will be used:
### DONE - HTML: For structuring the web pages.
### NOT YET - CSS: To style the website and make it visually appealing.
### NOT YET - JavaScript: For adding interactivity and handling user actions.
### NOT YET - React: For creating reusable components and managing state (coming soon).
### NOT YET - WebSocket: For "real-time" updates when sharing carts.

## Pages:
### index.html: The main entry point of the website.
### browse.html: A page for browsing products.
### cart.html: Displays the user's cart and checkout options.
### share.html: Helps users to share their cart with friends.
### checkout.html: Allows users to finalize their purchases, enter shipping and payment information, and confirm their order.



# CSS Styling and Improvements

# 1. Global Styling
# - **Font Family**: The entire website uses the `Courier New` font or a similar monospaced font (`Courier, monospace`) to give a consistent and clean look across all pages.
# - **Body Background**: Applied a light teal background color (`#b2f2e9`) to give the site a refreshing and modern appearance.

# 2. Header Design
# - **Pastel Pink Header**: The header across all pages features a pastel bright pink background (`#ffccdd`) with a slightly darker border to enhance the visual appeal.
# - **Centered Text**: The header content is centered for a professional and clean layout.

# 3. Link Styling
# - **Custom Link Color**: Links are styled with a dark gray color (`#333`) to avoid the default blue color.
# - **Hover Effect**: When users hover over links, they become bold, providing a visual cue for interactivity.

# 4. Interactive Elements with Transition
# - **Smooth Hover Transitions**: Interactive elements such as buttons, product items, and cart items have a smooth transition effect when hovered over.
#   - **Buttons**: Change background color on hover for a more interactive feel.
#   - **Product and Cart Items**: Slight zoom-in effect (`transform: scale(1.05)`) when hovering over product or cart items, giving a polished user experience.

# 5. Responsive Design
# - The website layout adjusts based on screen size:
#   - For smaller screens, product items resize to 45% width or 100% width, ensuring a mobile-friendly design.
#   - Buttons expand to fit the screen width on smaller devices.

---

# How to Use the CSS
# - The `style.css` file is linked in all HTML files to provide consistent styling across the entire website.
# - Make sure to add the following line in the `<head>` section of each HTML file:

  ```html
  <link rel="stylesheet" href="style.css">
