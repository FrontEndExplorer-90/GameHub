# GameHub – The Universe of Games

GameHub is a dynamic and responsive game store concept built as part of the Noroff Front-End Development course. The project showcases my ability to build structured, accessible, and visually engaging web applications using HTML, CSS, and JavaScript.

---

## Live Site  
 [View GameHub on Netlify](https://majestic-basbousa-0d0c9b.netlify.app)

---

## Project Structure

The project follows a clear and organized folder structure:
GameHub/
 - css/ # Stylesheets
   - main.css
   - index.css
   - products.css
   - purchase.css

 - images/ # Optimized assets (WebP)

 - js/ # Modular JavaScript files
   - main.js # Global functionality (loading, cart)
   - index.js # Homepage logic
   - purchase.js # Confirmation page logic
   - other-pages.js # Additional page logic (optional)

 - pages/ # Subpages
   - about.html
   - cart.html
   - community.html
   - login.html
   - products.html
   - purchase.html
   - under-construction.html

 - index.html # Landing page
 - README.md

## Features

### Clean, Responsive UI
- Fully responsive layout across devices and browsers
- Accessible navigation and alt text on images

### Dynamic Carousel
- Auto and manual slide switching on homepage
- Fully responsive and mobile-friendly

### Loading Indicators
- A consistent loading spinner (`Laster ...`) is present on all pages
- Smooth fade-in/fade-out during async data loads (e.g., product listings)

### Confirmation Page
The `purchase.html` confirmation page:
- Shows order summary with item titles and total
- Generates a mock order ID
- Clears the cart automatically after purchase

### LocalStorage Integration
- Cart stored persistently in `localStorage`
- Cart count updates across pages
- Data reset after confirmation

---

## Technologies Used

- HTML
- CSS (Flexbox, Grid, Media Queries)
- JavaScript 
- Git & GitHub
- Netlify (deployment)

---

## Improvements Since Feedback

- **Folder structure reorganized** for clarity and modularity  
- **Loading indicators** now present and consistent across pages  
- **Confirmation page** upgraded to show purchased items and totals  
- **Media queries refined** for better mobile experience  
- **Assets optimized** to WebP format to improve performance  

