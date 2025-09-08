// ===============================================
// M-VEGES GROCERY STORE - JAVASCRIPT FUNDAMENTALS
// Complete Assignment Implementation
// ===============================================

// ====================================
// PART 1: JAVASCRIPT BASICS
// Variables, Data Types, Operators, and Conditionals
// ====================================

// Global variables to store application data
let customers = [];
let products = [];
let orders = [];
let storeSettings = {
    isOpen: true,
    storeName: "M-Veges Grocery Store",
    location: "Nairobi, Kenya",
    currency: "KES"
};

// Shopping cart array
let shoppingCart = [];

// Membership discounts (object data type)
const membershipDiscounts = {
    basic: 0.05,    // 5%
    premium: 0.10,  // 10%
    gold: 0.15      // 15%
};

/**
 * PART 1 FUNCTION: Customer Registration with Conditionals
 * Demonstrates: Variables, Data Types, Conditionals, Input Validation
 */
function registerCustomer() {
    // Get input values (string and number data types)
    const name = document.getElementById('customerName').value.trim();
    const email = document.getElementById('customerEmail').value.trim();
    const age = parseInt(document.getElementById('customerAge').value);
    const membershipType = document.getElementById('membershipType').value;
    
    // Input validation using conditionals
    if (!name || name.length < 2) {
        logToConsole('❌ Error: Please enter a valid name (at least 2 characters)');
        displayOutput('customerOutput', '<p style="color: red;">❌ Please enter a valid name!</p>');
        return;
    }
    
    // Email validation using regular expression and conditionals
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        logToConsole('❌ Error: Please enter a valid email address');
        displayOutput('customerOutput', '<p style="color: red;">❌ Please enter a valid email address!</p>');
        return;
    }
    
    // Age validation with multiple conditions
    if (isNaN(age) || age < 1 || age > 120) {
        logToConsole('❌ Error: Please enter a valid age (1-120)');
        displayOutput('customerOutput', '<p style="color: red;">❌ Please enter a valid age!</p>');
        return;
    }
    
    if (!membershipType) {
        logToConsole('❌ Error: Please select a membership type');
        displayOutput('customerOutput', '<p style="color: red;">❌ Please select a membership type!</p>');
        return;
    }
    
    // Create customer object using object literal
    const customer = {
        id: Date.now(), // Unique ID using timestamp
        name: name,
        email: email,
        age: age,
        membershipType: membershipType,
        registrationDate: new Date().toLocaleDateString(),
        totalPurchases: 0,
        loyaltyPoints: 0
    };
    
    // Age categorization using conditionals
    let ageCategory;
    let welcomeMessage;
    
    if (age < 18) {
        ageCategory = 'Youth';
        welcomeMessage = '🧑‍🎓 Welcome young shopper! Enjoy fresh vegetables for healthy growth!';
    } else if (age >= 18 && age < 30) {
        ageCategory = 'Young Adult';
        welcomeMessage = '💪 Perfect age for building healthy eating habits!';
    } else if (age >= 30 && age < 60) {
        ageCategory = 'Adult';
        welcomeMessage = '👨‍💼 Great to serve another health-conscious adult!';
    } else {
        ageCategory = 'Senior';
        welcomeMessage = '👴 Honored to serve our respected senior customer!';
    }
    
    // Add customer to global array
    customers.push(customer);
    
    // Calculate discount percentage
    const discountPercent = (membershipDiscounts[membershipType] * 100).toFixed(0);
    
    // Display registration success using template literals
    const outputHTML = `
        <div class="fade-in">
            <h3>✅ Registration Successful!</h3>
            <div style="background: #d4edda; padding: 1rem; border-radius: 8px; border-left: 4px solid #27ae60;">
                <p><strong>Customer ID:</strong> #${customer.id}</p>
                <p><strong>Name:</strong> ${customer.name}</p>
                <p><strong>Email:</strong> ${customer.email}</p>
                <p><strong>Age:</strong> ${customer.age} years (${ageCategory})</p>
                <p><strong>Membership:</strong> ${membershipType.toUpperCase()} (${discountPercent}% discount)</p>
                <p><strong>Registration Date:</strong> ${customer.registrationDate}</p>
                <p><em>${welcomeMessage}</em></p>
            </div>
        </div>
    `;
    
    displayOutput('customerOutput', outputHTML);
    logToConsole(`✅ Customer registered: ${name} (ID: ${customer.id})`);
    
    // Clear form inputs
    document.getElementById('customerName').value = '';
    document.getElementById('customerEmail').value = '';
    document.getElementById('customerAge').value = '';
    document.getElementById('membershipType').value = '';
    
    // Update customer count display
    updateStoreStats();
}

// ====================================
// PART 2: JAVASCRIPT FUNCTIONS
// Custom Functions for Reusability
// ====================================

/**
 * FUNCTION 1: Add Product to Inventory
 * Demonstrates: Function parameters, return values, object manipulation
 */
function addProduct() {
    const name = document.getElementById('productName').value.trim();
    const price = parseFloat(document.getElementById('productPrice').value);
    const quantity = parseInt(document.getElementById('productQuantity').value);
    const category = document.getElementById('productCategory').value;
    
    // Validation
    if (!name || price <= 0 || quantity < 0 || !category) {
        logToConsole('❌ Error: Please fill all product fields correctly');
        displayOutput('inventoryOutput', '<p style="color: red;">❌ Please fill all fields correctly!</p>');
        return false;
    }
    
    // Create product object
    const product = {
        id: generateProductId(),
        name: name,
        price: price,
        quantity: quantity,
        category: category,
        dateAdded: new Date().toLocaleDateString(),
        sales: 0
    };
    
    // Add to products array
    products.push(product);
    
    // Success message
    const successHTML = `
        <div class="fade-in">
            <h4>✅ Product Added Successfully!</h4>
            <p><strong>${product.name}</strong> - KES ${product.price}</p>
            <p>Category: ${product.category}</p>
            <p>Quantity: ${product.quantity}</p>
            <p>Date Added: ${product.dateAdded}</p>
        </div>
    `;
    
    displayOutput('inventoryOutput', successHTML);
    logToConsole(`✅ Product added: ${name} (ID: ${product.id})`);
}