// =====================================================
// Cart Management System
// =====================================================

// Cart Storage Functions
const CART_STORAGE_KEY = 'pizzaCart';

// Get cart from localStorage
function getCart() {
    const cart = localStorage.getItem(CART_STORAGE_KEY);
    return cart ? JSON.parse(cart) : [];
}

// Save cart to localStorage
function saveCart(cart) {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    updateCartBadge();
}

// Update cart badge count
function updateCartBadge() {
    const cart = getCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badges = document.querySelectorAll('#cart-badge');
    badges.forEach(badge => {
        badge.textContent = totalItems;
    });
}

// Add item to cart
function addToCart(item) {
    const cart = getCart();
    const existingItem = cart.find(cartItem => cartItem.title === item.title);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            title: item.title,
            price: item.price,
            quantity: 1,
            image: item.image
        });
    }

    saveCart(cart);
}

// Remove item from cart
function removeFromCart(title) {
    let cart = getCart();
    cart = cart.filter(item => item.title !== title);
    saveCart(cart);
    displayCartItems();
}

// Update item quantity
function updateQuantity(title, change) {
    const cart = getCart();
    const item = cart.find(cartItem => cartItem.title === title);

    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(title);
            return;
        }
        saveCart(cart);
        displayCartItems();
    }
}

// Calculate totals
function calculateTotals() {
    const cart = getCart();
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = cart.length > 0 ? 15 : 0;
    const total = subtotal + deliveryFee;

    return { subtotal, deliveryFee, total };
}

// Display cart items on cart page
function displayCartItems() {
    const cartItemsList = document.getElementById('cart-items-list');
    const emptyCartMessage = document.getElementById('empty-cart-message');
    const checkoutForm = document.getElementById('checkout-form');
    const cart = getCart();

    if (!cartItemsList) return; // Not on cart page

    if (cart.length === 0) {
        cartItemsList.style.display = 'none';
        emptyCartMessage.style.display = 'block';
        if (checkoutForm) checkoutForm.style.display = 'none';
    } else {
        cartItemsList.style.display = 'block';
        emptyCartMessage.style.display = 'none';
        if (checkoutForm) checkoutForm.style.display = 'block';

        cartItemsList.innerHTML = cart.map(item => `
            <div class="cart-item" data-title="${item.title}">
                <div class="cart-item-image">
                    <img src="${item.image || 'assets/images/mg-2.jpg'}" alt="${item.title}">
                </div>
                <div class="cart-item-details">
                    <h4 class="cart-item-title">${item.title}</h4>
                    <p class="cart-item-price">﷼ ${item.price}</p>
                </div>
                <div class="cart-item-controls">
                    <div class="quantity-controls">
                        <button class="quantity-btn minus-btn" data-title="${item.title}">
                            <i class="fas fa-minus"></i>
                        </button>
                        <span class="quantity-value">${item.quantity}</span>
                        <button class="quantity-btn plus-btn" data-title="${item.title}">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                    <button class="remove-btn" data-title="${item.title}">
                        <i class="fas fa-trash-alt"></i>
                        حذف
                    </button>
                </div>
                <div class="cart-item-total">
                    <span>﷼ ${(item.price * item.quantity).toFixed(2)}</span>
                </div>
            </div>
        `).join('');

        // Attach event listeners to buttons
        attachCartItemListeners();
    }

    // Update totals
    updateTotalsDisplay();
}

// Attach event listeners to cart item buttons
function attachCartItemListeners() {
    document.querySelectorAll('.plus-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const title = this.getAttribute('data-title');
            updateQuantity(title, 1);
        });
    });

    document.querySelectorAll('.minus-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const title = this.getAttribute('data-title');
            updateQuantity(title, -1);
        });
    });

    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const title = this.getAttribute('data-title');
            window.Swal.fire({
                title: 'هل أنت متأكد؟',
                text: 'سيتم حذف هذا المنتج من السلة',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#dc3545',
                cancelButtonColor: '#6c757d',
                confirmButtonText: 'نعم، احذف',
                cancelButtonText: 'إلغاء'
            }).then((result) => {
                if (result.isConfirmed) {
                    removeFromCart(title);
                    window.Swal.fire({
                        icon: 'success',
                        title: 'تم الحذف!',
                        text: 'تم حذف المنتج من السلة',
                        timer: 1500,
                        showConfirmButton: false
                    });
                }
            });
        });
    });
}

// Update totals display
function updateTotalsDisplay() {
    const { subtotal, deliveryFee, total } = calculateTotals();

    const subtotalEl = document.getElementById('subtotal');
    const deliveryFeeEl = document.getElementById('delivery-fee');
    const totalEl = document.getElementById('total');

    if (subtotalEl) subtotalEl.textContent = `﷼ ${subtotal.toFixed(2)}`;
    if (deliveryFeeEl) deliveryFeeEl.textContent = `﷼ ${deliveryFee.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `﷼ ${total.toFixed(2)}`;
}

// =====================================================
// Payment Form Validation
// =====================================================

function formatCardNumber(value) {
    const cleaned = value.replace(/\s/g, '');
    const chunks = cleaned.match(/.{1,4}/g) || [];
    return chunks.join(' ');
}

function formatExpiryDate(value) {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
        return cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4);
    }
    return cleaned;
}

function validateCardNumber(cardNumber) {
    const cleaned = cardNumber.replace(/\s/g, '');
    return /^\d{16}$/.test(cleaned);
}

function validateExpiryDate(expiryDate) {
    if (!/^\d{2}\/\d{2}$/.test(expiryDate)) return false;

    const [month, year] = expiryDate.split('/').map(Number);
    if (month < 1 || month > 12) return false;

    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;

    if (year < currentYear) return false;
    if (year === currentYear && month < currentMonth) return false;

    return true;
}

function validateCVV(cvv) {
    return /^\d{3}$/.test(cvv);
}

function initializePaymentForm() {
    const paymentForm = document.getElementById('payment-form');
    if (!paymentForm) return;

    const cardNumberInput = document.getElementById('card-number');
    const expiryDateInput = document.getElementById('expiry-date');
    const cvvInput = document.getElementById('cvv');
    const cardholderNameInput = document.getElementById('cardholder-name');
    const deliveryAddressInput = document.getElementById('delivery-address');

    // Format card number as user types
    cardNumberInput?.addEventListener('input', function (e) {
        let value = e.target.value.replace(/\s/g, '');
        value = value.replace(/\D/g, '');
        e.target.value = formatCardNumber(value);
    });

    // Format expiry date as user types
    expiryDateInput?.addEventListener('input', function (e) {
        e.target.value = formatExpiryDate(e.target.value);
    });

    // Only allow numbers in CVV
    cvvInput?.addEventListener('input', function (e) {
        e.target.value = e.target.value.replace(/\D/g, '');
    });

    // Form submission
    paymentForm.addEventListener('submit', function (e) {
        e.preventDefault();

        let isValid = true;

        // Validate cardholder name
        if (!cardholderNameInput.value.trim()) {
            cardholderNameInput.classList.add('is-invalid');
            isValid = false;
        } else {
            cardholderNameInput.classList.remove('is-invalid');
            cardholderNameInput.classList.add('is-valid');
        }

        // Validate card number
        if (!validateCardNumber(cardNumberInput.value)) {
            cardNumberInput.classList.add('is-invalid');
            isValid = false;
        } else {
            cardNumberInput.classList.remove('is-invalid');
            cardNumberInput.classList.add('is-valid');
        }

        // Validate expiry date
        if (!validateExpiryDate(expiryDateInput.value)) {
            expiryDateInput.classList.add('is-invalid');
            isValid = false;
        } else {
            expiryDateInput.classList.remove('is-invalid');
            expiryDateInput.classList.add('is-valid');
        }

        // Validate CVV
        if (!validateCVV(cvvInput.value)) {
            cvvInput.classList.add('is-invalid');
            isValid = false;
        } else {
            cvvInput.classList.remove('is-invalid');
            cvvInput.classList.add('is-valid');
        }

        // Validate delivery address
        if (!deliveryAddressInput.value.trim()) {
            deliveryAddressInput.classList.add('is-invalid');
            isValid = false;
        } else {
            deliveryAddressInput.classList.remove('is-invalid');
            deliveryAddressInput.classList.add('is-valid');
        }

        if (isValid) {
            const { total } = calculateTotals();

            window.Swal.fire({
                icon: 'success',
                title: 'تم الدفع بنجاح!',
                html: `
                    <p>شكراً لطلبك من ركن البيتزا</p>
                    <p><strong>المبلغ المدفوع: ﷼ ${total.toFixed(2)}</strong></p>
                    <p>سيتم توصيل طلبك خلال 30-45 دقيقة</p>
                `,
                confirmButtonText: 'موافق',
                confirmButtonColor: '#dc3545',
            }).then(() => {
                // Clear cart after successful payment
                localStorage.removeItem(CART_STORAGE_KEY);
                updateCartBadge();
                window.location.href = 'index.html';
            });
        }
    });
}

// =====================================================
// Initialize Cart System
// =====================================================

export function initializeCart() {
    document.addEventListener('DOMContentLoaded', function () {
        // Update badge count on all pages
        updateCartBadge();

        // Initialize cart page if we're on it
        if (document.getElementById('cart-items-list')) {
            displayCartItems();
            initializePaymentForm();
        }

        // Handle add to cart buttons
        const addToCartButtons = document.querySelectorAll('.card .btn');

        addToCartButtons.forEach(button => {
            button.addEventListener('click', function (e) {
                e.preventDefault();

                const card = this.closest('.card');
                const cardTitle = card.querySelector('.title').textContent.trim();
                const priceText = card.querySelector('.price .new').textContent.trim();
                const price = parseFloat(priceText.replace(/[^\d.]/g, ''));
                const imageUrl = card.querySelector('.img img')?.src || 'assets/images/mg-2.jpg';

                addToCart({
                    title: cardTitle,
                    price: price,
                    image: imageUrl
                });

                window.Swal.fire({
                    icon: 'success',
                    title: 'تمت الإضافة!',
                    text: `تم إضافة ${cardTitle} إلى سلة الطلبات`,
                    confirmButtonText: 'موافق',
                    confirmButtonColor: '#dc3545',
                    timer: 2000,
                    timerProgressBar: true,
                    showConfirmButton: true
                });
            });
        });

        // Update year in footer
        const yearElement = document.getElementById('year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    });
}
