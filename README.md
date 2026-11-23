# KOCHA | Online Beverage Ordering Web Application

**Course:** Web Programming  
**University:** Seoul National University of Science & Technology  

---

## 1. Group Members & Student IDs

| Name | Student ID | Role |
| :--- | :--- | :--- |
| **Yu Shen** | `ID` | HTML Structure & CSS Styling |
| **Mariana Portillo Hernandez** | `26170195` | HTML Structure & CSS Styling |
| **Cheau Si** | `ID` | JavaScript Functionality & Testing |
| **Iida** | `26170209` | JavaScript Functionality & Testing |
| **Ji min** | `ID` | JavaScript Functionality & Testing |

---

## 2. Project Overview

**KOCHA ("Sip Good. Feel Good.")** is our group project for an Online Beverage Ordering website. We created a virtual tea house focused on matcha, hojicha, and milk teas. On the page, users can check out our most popular drinks, search through the full menu of 7 beverages, click to read more details about each drink, choose how many cups they want, add them to a shopping cart, and send us a message using the contact form.

---

## 3. File Structure

```text
Project/
├── index.html       # Main HTML5 structure and page content
├── styles.css       # Custom CSS stylesheet for layout, colors, and responsive design
├── script.js        # JavaScript file for interactive features and form validation
├── README.md        # Project explanation, features list, and team responsibilities
└── images/          # Folder with the logo and all beverage photos
    ├── logo.png
    ├── Matcha Latte.png
    ├── Signature Milk Tea.png
    ├── Signature Coco.png
    ├── Taro Milk Tea.png
    ├── Black Sesame.png
    ├── Matcha Mousse.png
    └── Hojicha Mousse.png
```

---

## 4. Description of Features

### A. HTML5 Structure, Content Organization & Accessibility

1. **Semantic HTML5 Elements**:
   Instead of only using generic `<div>` tags, we organized the page using semantic HTML5 tags so the code is easy to read and well-structured:
   - `<header class="site-header">`: Holds our store logo (`logo.png`), the main `<h1>KOCHA</h1>` title, and the navigation bar at the top of the screen.
   - `<nav>`: Used in both the top header and the bottom footer. It has anchor links (`#home`, `#menu`, `#product`, `#cart`, `#contact`, `#about`) that jump smoothly to each section of the page.
   - `<main>`: Wraps all the main sections of our website:
     - **Welcome / Hero Section (`#home`)**: The first banner the user sees, featuring our slogan (*"Sip Good. Feel Good."*), a short introduction, an `Explore Menu` button, and a featured image.
     - **Benefits Section (`.benefits`)**: Three small `<article>` cards explaining what makes our drinks special (*Premium Ingredients*, *Freshly Prepared*, and *Great Taste*).
     - **Best Sellers Section (`.featured`)**: Shows our top 3 most popular drinks so users can quickly jump to their details.
     - **Full Beverage Menu (`#menu`)**: Displays all 7 drinks using `<article class="product-card">`. Each card includes the drink photo inside a `<figure>`, the name (`<h3>`), the price in KRW, a hidden description (`hidden` attribute) that appears when clicking `View Description`, and an `Order Now` button.
     - **Product Detail Section (`#product`)**: Works as a dynamic preview box. When a user clicks on any drink from the menu, this section updates to show that drink's photo, price, full description, customer rating (`★★★★★ 4.8/5`), a quantity selector, and the `Add to Cart` button.
     - **Shopping Cart (`#cart`)**: Divided into two parts: a container (`#cartItems`) where selected drinks appear, and an `<aside class="order-summary">` box that shows the Subtotal, Delivery Fee, and Total price.
     - **Contact Section (`#contact`)**: Includes our store contact info inside an `<address>` tag and a contact form with inputs for `Name`, `Email`, `Message`, and a `Send Message` button.
     - **About Us & Mission/Vision (`#about`, `.mission-section`)**: Explains the story behind KOCHA and our brand's mission and vision using `<section>` and `<article>` tags.
   - `<footer>`: Contains the brand name, quick links, copyright text, and an empty `<p id="datetime">` where JavaScript inserts the current date and time.

2. **Accessibility Features**:
   - Every form input (`#searchInput`, `#quantity`, `#name`, `#email`, `#message`) is properly connected to a `<label for="...">` tag so screen readers know what each box is for.
   - All images have clear `alt` text describing the drink or logo.
   - We added helpful attributes like `aria-labelledby` on sections and `aria-live="polite"` on the cart and form message areas so users get notified when content changes dynamically.
   - We included `:focus-visible` outlines for keyboard navigation (Tab key) and `@media (prefers-reduced-motion: reduce)` for users who prefer less animation.

---

### B. CSS Design & User Interface Development
1. **Color Palette (`:root` Variables)**:
   We stored all our colors in CSS variables at the top of `styles.css` so the whole website matches a cozy matcha café theme:
   - **Matcha & Forest Greens:** `--green-dark`, `--green`, `--green-mid`, `--green-light`, and `--green-tint` for headers, buttons, and soft section backgrounds.
   - **Cream & White Backgrounds:** `--cream` and `--surface` so the text is clean and easy to read.
   - **Warm Accent:** `--accent` (light brown/gold) for small section labels.

2. **Fonts & Text Styling**:
   - We imported two Google Fonts: **DM Serif Display** for main section titles (`<h2>`) to give it an elegant café menu style, and **Plus Jakarta Sans** for paragraphs, prices, and buttons so they look clean and modern.
   - We used `clamp()` on large titles so the text size adjusts automatically on smaller screens.

3. **Page Layout (Flexbox & CSS Grid)**:
   - **Flexbox**: Used to align items in a row or column—such as the sticky header, the Hero banner, the Product Detail box, the About section, and the drink cards container (`.product-container` with `flex-wrap: wrap` and `justify-content: center` so the 3 Best Sellers and 7 Menu cards stay centered on any screen).
   - **CSS Grid**: Used for multi-column sections like the 3-column Benefits section, the `2fr 1fr` Shopping Cart layout, the 2-column Contact section, and the Mission/Vision cards.

4. **Hover Effects & Responsive Design**:
   - **Hover animations**: When you move the mouse over a drink card, the card lifts up slightly (`translateY(-7px)`) and the drink image zooms in (`scale(1.06)`), making it feel interactive. Buttons and navigation links also change color smoothly on hover.
   - **Mobile-friendly (`@media` queries)**: We added two breakpoints (`768px` for tablets and `540px` for phones) that change the multi-column grids into a single vertical column so everything fits nicely on a phone screen.

---

### C. JavaScript Functionality & Interactivity

1.1. **Show/Hide Product Description on Click**:
   - Uses the `toggleDescription(descId)` function to control visibility: checks if the drink description attribute is hidden, toggles it on click, and dynamically updates the button text between `View Description` and `Hide Description`.

1.2. **Best Seller View Details**:
   - Uses the `selectProduct(productName)` function to instantly fetch product data and update the dynamic preview box (`#detailName`, `#detailPrice`, `#detailDescription`, `#detailImage`) when users click view details on featured best sellers or menu items order now button.
   - Automatically triggers a smooth scroll (`scrollIntoView`) down to the `#product` section for a seamless user experience.

4.1. **Search Menu Items and Count Found Results**:
   - An event listener on `#searchInput` captures user input in real-time, matching drink titles against the query, hiding non-matching cards, and updating the `#searchResultCount` text dynamically (*"1 drink found!"*, *"X drinks found!"*, or *"No drinks found."*).

4.4 **Food Item Rating System & Average Calculator**:
   - Implements interactive star buttons (`rateProduct(stars)`) that allow users to submit ratings from 1 to 5 stars, pushing scores into a dynamic data array per product.
   - The `updateRatingDisplay(productName)` function automatically calculates the running average score, lights up the corresponding star buttons (`★` vs `☆`), and updates the review count display (`#detailRating`) in real-time.
---

## 5. Division of Tasks

| Team Member | Assigned Responsibilities |
| :--- | :--- |
| **Yu Shen and Mariana** | • Planned website structure, user flow, and section organization.<br>• Built and refined semantic HTML5 markup (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<figure>`, `<address>`, `<footer>`) and accessibility attributes.<br>• Designed the complete CSS stylesheet (`styles.css`), including color palette variables, typography, Flexbox/Grid layouts, hover animations, and mobile responsiveness. |
| **Iida** | • Implemented JavaScript functionality and interactivity, including the menu show/hide description (`toggleDescription`) and Best Seller "View Details" navigation (`selectProduct`).<br>• Made the search feature (`#searchInput`) with card filtering and result count feedback.<br>• Created the food item rating system with interactive star buttons (`rateProduct`, `updateRatingDisplay`), running avg calculation, and review count updates. <br>• Made necessary changes or additions to HTML and CSS for the new JavaScript features.|

---

## 6. How to Run the Project

1. Download and unzip the project folder.
2. Make sure `index.html`, `styles.css`, `script.js`, and the `images/` folder are all together in the same main folder.
3. Double-click `index.html` to open the website in any web browser (such as Chrome, Edge, Firefox, or Safari).
