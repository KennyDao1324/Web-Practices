#  Garlic Mart — Final Web Project

Garlic Mart is a multi-page e-commerce demo website built using HTML, CSS, and Javascript

This project was created by Kha Dao to practice core Frontend development skills including dynamic rendering, localStorage, UI components, and client-side form validation. Ideas are from my mom's business, which is about garlic.

---

# Technologies Used

- HTML5 (Semantic structure)
- CSS3 (Flexbox, Grid, Responsive Design)
- Vanilla JavaScript (No frameworks)
- LocalStorage (Cart persistence)
- Basic Accessibility (ARIA, focus trap, skip link)

---

# 📁 Project Structure

```
Final-web/
│
├── index.html
├── products.html
├── product-detail.html
├── blog.html
├── gallery.html
├── contact.html
├── cart.html
│-Images
├── asset/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── app.js
|
│
└── README.md
```

---

# Pages Implemented

## Landing Page (Home)

- Hero section
- Brand logo
- Navigation menu
- Responsive layout

---

##  Products Page

- Dynamically rendered product list using JavaScript
- Price filtering (range input)
- Search by name or tag
- Sorting options:
    - Price ascending
    - Price descending
    - Name
- Buttons:
    - View details
    - Add to cart
- Toast notification when product is added
- Display number of filtered products

---

## Product Detail Page

- Reads product ID from URL:

```
product-detail.html?id=classic
```

- Dynamically displays product data
- Quantity input
- Add to cart
- Modal popup
- Tooltip
- Product specification table
- Link to order form

---

## Cart Page (cart.html)

### Features:

- Cart stored using `localStorage`
- Table includes:
    - Product
    - Unit price
    - Quantity (editable)
    - Line total
    - Action column (View / Remove)
- Automatic total price calculation
- Remove individual item
- Clear entire cart
- Cart item counter displayed in header

---

## Contact / Order Page

Form includes:

- Full name
- Email
- Topic
- Message
- Agreement checkbox

### Client-side validation:

- Name ≥ 2 characters
- Valid email format
- Message ≥ 10 characters
- Must accept terms

Displays:

- Field-level error messages
- Toast notification on successful submission
- Prefilled message when coming from product detail page

---

##  Gallery Page

- Displays product images
- Uses `<img>` elements
- CSS hover zoom effect

---

## Blog Page

- Article layout
- Card-based structure
- Responsive design

---

## JavaScript Features Implemented

##  DOM Utility Functions

```js
function $(selector)
function $all(selector)
```

---

## Dynamic Rendering

- Render product list
- Render product details
- Render cart table dynamically

---

## LocalStorage (Cart Management)

```js
localStorage.setItem()
localStorage.getItem()
```

- Save cart items
- Update quantity
- Calculate total price
- Display cart badge counter

---

## Toast Notifications

- Show temporary messages
- Auto hide after delay
- Close button support

---

## Modal Dialog

- Open / Close functionality
- Click outside to close
- Close with ESC key
- Focus trap for accessibility

---

## Form Validation

- Email regex validation
- Field-specific error messages
- Prevent submission if invalid

---

## URL Parameters

```js
new URLSearchParams(location.search)
```

- Extract product ID
- Dynamically display correct product

---

#  Accessibility (Basic)

- Skip to content link
- aria-current for active navigation
- aria-label usage
- aria-live for toast messages
- Focus trap in modal

---

# Responsive Design

- Flexbox for header and layout
- CSS Grid for product cards
- Responsive behavior for different screen sizes

---

# Learning Objectives Achieved

- Multi-page website structure
- Separation of HTML, CSS, and JavaScript
- Managing state using localStorage
- Rendering UI dynamically with JavaScript
- Implementing form validation
- Creating reusable UI components (Toast, Modal)
- Understanding frontend project structure

---

# How to Run the Project

### Option 1:
Open `index.html` directly in your browser.

### Option 2 (Recommended):
Use Live Server or WebStorm built-in server.

---

#  Possible Future Improvements

- Checkout page
- Discount codes
- Shipping cost calculation
- Dark mode toggle
- Product pagination
- Backend integration (NodeJS / Firebase / PHP)

---

# 👨‍💻 Author
Kha Dao

Educational project — built for learning Frontend Web Development.

---