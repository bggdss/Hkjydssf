// General JavaScript for interactions on Kid's Clothing Co. website

// --- Product Data Fetching Functions ---

/**
 * Fetches all products from the JSON file.
 * Simulates an API call.
 * @returns {Promise<Array<Object>>} A promise that resolves with the list of products.
 */
async function fetchProducts() {
    try {
        const response = await fetch('data/products.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const products = await response.json();
        return products;
    } catch (error) {
        console.error("Could not fetch products:", error);
        return []; // Return an empty array in case of error
    }
}

/**
 * Fetches a single product by its ID from the JSON file.
 * Simulates an API call.
 * @param {number | string} id The ID of the product to fetch.
 * @returns {Promise<Object|null>} A promise that resolves with the product, or null if not found.
 */
async function fetchProductById(id) {
    try {
        const products = await fetchProducts();
        // Ensure id is treated as a number for comparison, as JSON stores it as number.
        const productId = parseInt(id, 10);
        const product = products.find(p => p.id === productId);
        return product || null;
    } catch (error) {
        console.error(`Could not fetch product with id ${id}:`, error);
        return null;
    }
}


// --- Page Specific Logic ---

document.addEventListener('DOMContentLoaded', function() {
    console.log('Kid\'s Clothing Co. website scripts loaded.');

    // Check which page is currently loaded and call the appropriate function
    if (document.getElementById('product-listing-container')) {
        displayProductsOnPage();
    } else if (document.getElementById('product-detail-container')) {
        displayProductDetailsOnPage();
    }

    // Add event listeners for buttons or implement dynamic content loading here
    // e.g., cart functionality, form validation, interactive elements.

    // Initialize cart display on page load if cart elements exist
    if (document.getElementById('cart-items-container')) {
        displayCartItems();
    }
    // Initialize user-related elements on page load
    if (document.getElementById('account-details')) {
        displayAccountDetails();
    }
    if (document.getElementById('login-form')) {
        setupLoginFormListener();
    }
    if (document.getElementById('registration-form')) {
        setupRegistrationFormListener();
    }
    if (document.getElementById('logout-button')) { // Assuming a logout button with this ID on account page
        document.getElementById('logout-button').addEventListener('click', logoutUser);
    }

    updateCartIconCount(); // Update cart icon on every page load
    updateUserNav(); // Update navigation based on login state
});

// --- User Authentication Globals ---
const USER_SESSION_KEY = 'currentUser';
let sessionUsers = []; // To simulate in-memory user database for the session after fetch

// --- User Authentication Functions ---

/**
 * Fetches all users from the JSON file.
 * Stores them in sessionUsers for mock additions/registrations.
 * @returns {Promise<Array<Object>>} A promise that resolves with the list of users.
 */
async function fetchUsers() {
    if (sessionUsers.length > 0) { // Avoid re-fetching if already loaded for the session
        return sessionUsers;
    }
    try {
        const response = await fetch('data/users.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const users = await response.json();
        sessionUsers = [...users]; // Store a copy for session modifications
        return sessionUsers;
    } catch (error) {
        console.error("Could not fetch users:", error);
        sessionUsers = []; // Ensure it's empty on error
        return [];
    }
}


/**
 * Retrieves current user session data from sessionStorage.
 * @returns {Object|null} The user data object or null if not logged in.
 */
function getCurrentUser() {
    const userJson = sessionStorage.getItem(USER_SESSION_KEY);
    return userJson ? JSON.parse(userJson) : null;
}

/**
 * Saves user data to sessionStorage.
 * @param {Object} userData The user data to save.
 */
function saveCurrentUser(userData) {
    sessionStorage.setItem(USER_SESSION_KEY, JSON.stringify(userData));
}

/**
 * Clears user data from sessionStorage.
 */
function clearCurrentUser() {
    sessionStorage.removeItem(USER_SESSION_KEY);
}

/**
 * Registers a new user.
 * @param {string} name The user's name.
 * @param {string} email The user's email.
 * @param {string} password The user's password.
 * @returns {Promise<boolean>} True if registration is successful, false otherwise.
 */
async function registerUser(name, email, password) {
    const users = await fetchUsers();
    if (users.find(user => user.email === email)) {
        alert('Email already exists. Please use a different email.');
        return false;
    }
    // Simulate creating a new user (in a real app, this would be done by the backend)
    const newUser = {
        id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1, // Generate new ID
        name: name,
        email: email,
        password: password, // In a real app, hash the password
        address: "" // Default empty address
    };
    sessionUsers.push(newUser); // Add to our "session" copy of users
    console.log('Simulated user registration:', newUser);
    console.log('Current session users:', sessionUsers);
    // For this simulation, we'll log them in immediately after registration
    saveCurrentUser(newUser);
    updateUserNav();
    return true;
}

/**
 * Logs in a user.
 * @param {string} email The user's email.
 * @param {string} password The user's password.
 * @returns {Promise<boolean>} True if login is successful, false otherwise.
 */
async function loginUser(email, password) {
    const users = await fetchUsers(); // Ensure sessionUsers is populated
    const user = users.find(u => u.email === email);

    if (user && user.password === password) { // Plain text password check (BAD for production)
        saveCurrentUser(user);
        updateUserNav();
        return true;
    }
    alert('Invalid email or password.');
    return false;
}

/**
 * Logs out the current user.
 */
function logoutUser() {
    clearCurrentUser();
    updateUserNav();
    alert('You have been logged out.');
    // Redirect to homepage or login page
    window.location.href = 'index.html';
}

/**
 * Updates the navigation bar based on user login state.
 * Assumes nav links have IDs: #nav-login, #nav-register, #nav-account, #nav-logout
 */
function updateUserNav() {
    const currentUser = getCurrentUser();
    const navLogin = document.getElementById('nav-login');
    const navRegister = document.getElementById('nav-register');
    const navAccount = document.getElementById('nav-account');
    const navLogout = document.getElementById('nav-logout'); // This will be a new element

    if (currentUser) {
        if (navLogin) navLogin.style.display = 'none';
        if (navRegister) navRegister.style.display = 'none';
        if (navAccount) navAccount.style.display = 'inline-block'; // Or 'list-item'
        if (navLogout) navLogout.style.display = 'inline-block'; // Or 'list-item'
    } else {
        if (navLogin) navLogin.style.display = 'inline-block';
        if (navRegister) navRegister.style.display = 'inline-block';
        if (navAccount) navAccount.style.display = 'none';
        if (navLogout) navLogout.style.display = 'none';
    }
}


// --- Cart Management Functions ---
const CART_STORAGE_KEY = 'shoppingCart';

/**
 * Retrieves the cart from localStorage.
 * @returns {Array<Object>} The cart array, or an empty array if no cart exists.
 */
function getCart() {
    const cartJson = localStorage.getItem(CART_STORAGE_KEY);
    return cartJson ? JSON.parse(cartJson) : [];
}

/**
 * Saves the current cart array to localStorage.
 * @param {Array<Object>} cart The cart array to save.
 */
function saveCart(cart) {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    updateCartIconCount(); // Update icon whenever cart is saved
}

/**
 * Adds an item to the shopping cart.
 * @param {string|number} productId The ID of the product to add.
 * @param {number} quantity The quantity to add.
 * @param {string} size The selected size.
 */
async function addToCart(productId, quantity = 1, size) {
    if (!size) {
        alert('Please select a size.');
        console.error('Size not selected for product ID:', productId);
        return;
    }
    if (quantity <= 0) {
        console.error('Quantity must be positive for product ID:', productId);
        return;
    }

    const product = await fetchProductById(productId);
    if (!product) {
        console.error('Attempted to add non-existent product ID:', productId);
        return;
    }

    const cart = getCart();
    const existingItemIndex = cart.findIndex(item => item.id === product.id && item.size === size);

    if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image_url: product.image_url, // Store image for cart display
            quantity: quantity,
            size: size
        });
    }
    saveCart(cart);
    alert(`${product.name} (Size: ${size}) added to cart!`);
    console.log('Cart after adding:', cart);
}

/**
 * Removes an item (product + size combination) from the cart.
 * @param {string|number} productId The ID of the product to remove.
 * @param {string} size The size of the product to remove.
 */
function removeFromCart(productId, size) {
    let cart = getCart();
    // Ensure productId is compared as the same type it's stored (typically number from JSON)
    const idToRemove = parseInt(productId, 10);
    cart = cart.filter(item => !(item.id === idToRemove && item.size === size));
    saveCart(cart);
    console.log(`Item with ID ${idToRemove} and size ${size} removed. Cart:`, cart);
    // Re-render cart if on cart page
    if (document.getElementById('cart-items-container')) {
        displayCartItems();
    }
}

/**
 * Updates the quantity of an item in the cart.
 * If quantity is 0 or less, removes the item.
 * @param {string|number} productId The ID of the product to update.
 * @param {string} size The size of the product to update.
 * @param {number} newQuantity The new quantity.
 */
function updateCartQuantity(productId, size, newQuantity) {
    let cart = getCart();
    // Ensure productId is compared as the same type it's stored
    const idToUpdate = parseInt(productId, 10);
    const itemIndex = cart.findIndex(item => item.id === idToUpdate && item.size === size);

    if (itemIndex > -1) {
        if (newQuantity > 0) {
            cart[itemIndex].quantity = newQuantity;
        } else {
            cart.splice(itemIndex, 1); // Remove item if quantity is 0 or less
        }
        saveCart(cart);
        console.log(`Quantity updated for ID ${idToUpdate}, Size ${size}. New Qty: ${newQuantity}. Cart:`, cart);
    } else {
        console.error('Item not found for update:', productId, size);
    }
    // Re-render cart if on cart page
    if (document.getElementById('cart-items-container')) {
        displayCartItems();
    }
}

/**
 * Calculates the total price of all items in the cart.
 * @returns {number} The total price.
 */
function getCartTotal() {
    const cart = getCart();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

/**
 * Updates the cart icon in the header to show the number of items in the cart.
 * Assumes a cart icon element with id="cart-item-count".
 */
function updateCartIconCount() {
    const cart = getCart();
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartIconCountElement = document.getElementById('cart-item-count');
    if (cartIconCountElement) {
        cartIconCountElement.textContent = itemCount;
    }
}

// --- Functions to Display Cart on cart.html ---

/**
 * Renders the cart items on the cart.html page.
 */
function displayCartItems() {
    const cartContainer = document.getElementById('cart-items-container');
    const cartTotalElement = document.getElementById('cart-grand-total');
    if (!cartContainer || !cartTotalElement) return;

    const cart = getCart();
    cartContainer.innerHTML = ''; // Clear previous items

    if (cart.length === 0) {
        cartContainer.innerHTML = '<tr><td colspan="6">Your cart is empty.</td></tr>';
        cartTotalElement.textContent = '0.00';
        return;
    }

    cart.forEach(item => {
        const itemRow = document.createElement('tr');
        itemRow.innerHTML = `
            <td><img src="${item.image_url}" alt="${item.name}" style="width:50px; height:auto; margin-right:10px;">${item.name}</td>
            <td>${item.size}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>
                <input type="number" value="${item.quantity}" min="0" class="cart-item-quantity"
                       data-product-id="${item.id}" data-product-size="${item.size}" style="width: 60px;">
            </td>
            <td>$${(item.price * item.quantity).toFixed(2)}</td>
            <td>
                <button class="remove-cart-item-btn" data-product-id="${item.id}" data-product-size="${item.size}">Remove</button>
            </td>
        `;
        cartContainer.appendChild(itemRow);
    });

    // Add event listeners for remove buttons and quantity inputs
    document.querySelectorAll('.remove-cart-item-btn').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.dataset.productId;
            const productSize = this.dataset.productSize;
            removeFromCart(productId, productSize);
        });
    });

    document.querySelectorAll('.cart-item-quantity').forEach(input => {
        input.addEventListener('change', function() {
            const productId = this.dataset.productId;
            const productSize = this.dataset.productSize;
            const newQuantity = parseInt(this.value, 10);
            updateCartQuantity(productId, productSize, newQuantity);
        });
    });

    cartTotalElement.textContent = getCartTotal().toFixed(2);
}


// --- Functions to Display Products ---

/**
 * Fetches products and displays them on the products.html page.
 */
async function displayProductsOnPage() {
    const productsContainer = document.getElementById('product-listing-container');
    if (!productsContainer) return;

    const products = await fetchProducts();

    if (products.length === 0) {
        productsContainer.innerHTML = '<p>No products found.</p>';
        return;
    }

    productsContainer.innerHTML = ''; // Clear any placeholder content

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card'; // Added for styling (from theme.css)
        productCard.innerHTML = `
            <img src="${product.image_url}" alt="${product.name}" style="width:100%;max-width:200px;height:auto;">
            <h3>${product.name}</h3>
            <p>Price: $${product.price.toFixed(2)}</p>
            <a href="product_detail.html?id=${product.id}" class="button">View Details</a>
        `;
        productsContainer.appendChild(productCard);
    });
}

// --- Account Page Logic ---
function displayAccountDetails() {
    const currentUser = getCurrentUser();
    const accountDetailsContainer = document.getElementById('account-details');

    if (!currentUser) {
        window.location.href = 'login.html'; // Redirect if not logged in
        return;
    }

    if (accountDetailsContainer) {
        accountDetailsContainer.innerHTML = `
            <p><strong>Name:</strong> ${currentUser.name}</p>
            <p><strong>Email:</strong> ${currentUser.email}</p>
            <p><strong>Address:</strong> ${currentUser.address || 'Not set'}</p>
            // TODO: Add edit functionality later
        `;
    }
}

// --- Form Listener Setup ---
function setupLoginFormListener() {
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const success = await loginUser(email, password);
            if (success) {
                window.location.href = 'account.html';
            }
        });
    }
}

function setupRegistrationFormListener() {
    const registrationForm = document.getElementById('registration-form');
    if (registrationForm) {
        registrationForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;

            if (password !== confirmPassword) {
                alert('Passwords do not match.');
                return;
            }
            const success = await registerUser(name, email, password);
            if (success) {
                window.location.href = 'account.html';
            }
        });
    }
}


// Modify displayProductDetailsOnPage to store product ID for cart
async function displayProductDetailsOnPage() {
    const productDetailContainer = document.getElementById('product-detail-container');
    if (!productDetailContainer) return;

    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');
    document.body.dataset.currentPageProductId = productId; // Store it for add to cart

    if (!productId) {
        productDetailContainer.innerHTML = '<p>No product ID specified.</p>';
        return;
    }

    const product = await fetchProductById(productId);

    if (!product) {
        productDetailContainer.innerHTML = '<p>Product not found.</p>';
        return;
    }

    productDetailContainer.innerHTML = `
        <img src="${product.image_url}" alt="${product.name}" style="width:100%;max-width:300px;height:auto;">
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <p><strong>Price:</strong> $${product.price.toFixed(2)}</p>
        <div>
            <label for="size-select"><strong>Select Size:</strong></label>
            <select id="size-select">
                ${product.sizes.map(size => `<option value="${size}">${size}</option>`).join('')}
            </select>
        </div>
        <div>
            <label for="quantity-input"><strong>Quantity:</strong></label>
            <input type="number" id="quantity-input" value="1" min="1" style="width: 60px;">
        </div>
        <p><strong>Category:</strong> ${product.category}</p>
        <button id="add-to-cart-btn" data-product-id="${product.id}">Add to Cart</button>
        `; // Added data-product-id to button

    // Re-attach event listener for the "Add to Cart" button specifically for this new content
    const addToCartButton = document.getElementById('add-to-cart-btn');
    if (addToCartButton) {
        addToCartButton.addEventListener('click', () => {
            const selectedSizeEl = document.getElementById('size-select');
            const quantityEl = document.getElementById('quantity-input');

            if (!selectedSizeEl || !quantityEl) {
                console.error("Size or quantity elements not found on product page.");
                return;
            }
            const selectedSize = selectedSizeEl.value;
            const quantity = parseInt(quantityEl.value, 10);

            // Use the productID from the closure of displayProductDetailsOnPage
            addToCart(productId, quantity, selectedSize);
        });
    }
}
