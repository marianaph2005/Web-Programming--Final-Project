
const products = {
    "Matcha Latte": {
        price: "KRW 4200",
        description: "Experience the smooth and refreshing taste of our signature Matcha Latte. Made with premium Japanese matcha and creamy fresh milk.",
        image: "images/Matcha Latte.png",
        ratings: []
    },
    "Signature Milk Tea": {
        price: "KRW 4200",
        description: "A classic milk tea with a smooth and creamy taste, perfect for any occasion.",
        image: "images/Signature Milk Tea.png",
        ratings: []
    },
    "Signature Coco": {
        price: "KRW 3500",
        description: "A rich and indulgent chocolate drink made with premium cocoa and fresh milk.",
        image: "images/Signature Coco.png",
        ratings: []
    },
    "Taro Milk Tea": {
        price: "KRW 4200",
        description: "A traditional taro milk tea with a smooth and creamy texture, topped with a hint of sweetness.",
        image: "images/Taro Milk Tea.png",
        ratings: []
    },
    "Black Sesame Mousse": {
        price: "KRW 4200",
        description: "A rich and nutty black sesame mousse with a smooth and creamy texture, perfect for dessert lovers.",
        image: "images/Black Sesame.png",
        ratings: []
    },
    "Matcha Mousse": {
        price: "KRW 4200",
        description: "A delightful matcha mousse with a rich and creamy texture, topped with a hint of sweetness.",
        image: "images/Matcha Mousse.png",
        ratings: []
    },
    "Hojicha Mousse": {
        price: "KRW 4200",
        description: "A traditional hojicha mousse with a rich and creamy texture, topped with a hint of sweetness.",
        image: "images/Hojicha Mousse.png",
        ratings: []
    }
};

let currentProduct = "Matcha Latte";

const cart = {};
const DELIVERY_FEE = 5000;

const productDetail = document.getElementById("product");
const productDetailPlaceholder = document.createComment("Product Detail Position");

if (productDetail && productDetail.parentNode) {
    productDetail.parentNode.insertBefore(productDetailPlaceholder, productDetail);
    productDetail.style.display = "none";
}

const productModal = document.createElement("div");
productModal.id = "productModal";
productModal.className = "product-modal";
productModal.setAttribute("aria-hidden", "true");

const productModalContent = document.createElement("div");
productModalContent.className = "product-modal-content";
productModalContent.setAttribute("role", "dialog");
productModalContent.setAttribute("aria-modal", "true");
productModalContent.setAttribute("aria-labelledby", "detailName");

productModal.appendChild(productModalContent);
document.body.appendChild(productModal);

function lockPageScroll() {
    document.documentElement.classList.add("product-modal-open");
    document.body.classList.add("product-modal-open");
}

function unlockPageScroll() {
    document.documentElement.classList.remove("product-modal-open");
    document.body.classList.remove("product-modal-open");
}

function openProductModal() {
    if (!productDetail) return;

    productModalContent.appendChild(productDetail);
    productDetail.style.display = "grid";
    productDetail.classList.add("modal-product-detail");

    lockPageScroll();
    productModal.classList.add("active");
    productModal.setAttribute("aria-hidden", "false");

    const closeButton = document.getElementById("closeProductDetail");
    if (closeButton) closeButton.focus();
}

function toggleDescription(descId) {
    const descElement = document.getElementById(descId);

    if (!descElement) return;

    const cardContent = descElement.closest(".card-content");

    if (!cardContent) return;

    const toggleBtn = cardContent.querySelector(".btn-outline");

    if (descElement.hidden) {
        descElement.hidden = false;

        if (toggleBtn) {
            toggleBtn.textContent = "Hide Description";
        }
    } else {
        descElement.hidden = true;

        if (toggleBtn) {
            toggleBtn.textContent = "View Description";
        }
    }
}

function selectProduct(productName) {
    const item = products[productName];

    if (!item || !productDetail) return;

    currentProduct = productName;

    document.getElementById("detailName").textContent = productName;
    document.getElementById("detailPrice").textContent = item.price;
    document.getElementById("detailDescription").textContent = item.description;
    document.getElementById("detailImage").src = item.image;
    document.getElementById("detailImage").alt = productName;
    document.getElementById("quantity").value = 1;

    updateRatingDisplay(productName);
    openProductModal();
}

function closeProductDetail() {
    if (!productDetail || !productDetailPlaceholder.parentNode) return;

    productModal.classList.remove("active");
    productModal.setAttribute("aria-hidden", "true");

    productDetail.style.display = "none";
    productDetail.classList.remove("modal-product-detail");

    productDetailPlaceholder.parentNode.insertBefore(
        productDetail,
        productDetailPlaceholder.nextSibling
    );

    unlockPageScroll();
}

productModal.addEventListener("click", function(event) {
    if (event.target === productModal) {
        closeProductDetail();
    }
});

const closeProductButton = document.getElementById("closeProductDetail");

if (closeProductButton) {
    closeProductButton.addEventListener("click", closeProductDetail);
}

const searchInput = document.getElementById("searchInput");

if (searchInput) {
    searchInput.addEventListener("input", function() {
        const query = searchInput.value.toLowerCase().trim();
        const cards = document.querySelectorAll("#menuGrid .product-card");
        const countElement = document.getElementById("searchResultCount");

        let visibleCount = 0;

        cards.forEach(function(card) {
            const titleElement = card.querySelector("h3");

            if (titleElement) {
                const drinkName = titleElement.textContent.toLowerCase();

                if (drinkName.includes(query)) {
                    card.style.display = "";
                    visibleCount++;
                } else {
                    card.style.display = "none";
                }
            }
        });

        if (countElement) {
            if (query === "") {
                countElement.textContent = "";
            } else if (visibleCount === 0) {
                countElement.textContent = "No drinks found.";
            } else if (visibleCount === 1) {
                countElement.textContent = "1 drink found!";
            } else {
                countElement.textContent = `${visibleCount} drinks found!`;
            }
        }

        if (productModal.classList.contains("active")) {
            const activeName = document.getElementById("detailName").textContent.toLowerCase();

            if (!activeName.includes(query) && query !== "") {
                closeProductDetail();
            }
        }
    });
}

function rateProduct(stars) {
    const item = products[currentProduct];

    if (!item) return;

    const rating = Number(stars);

    if (!Number.isInteger(rating) || rating < 1 || rating > 5) return;

    item.ratings.push(rating);

    updateRatingDisplay(currentProduct);
}

function updateRatingDisplay(productName) {
    const item = products[productName];

    if (!item) return;

    const ratings = item.ratings;
    const starButtons = document.querySelectorAll("#starButtons .star-btn");
    const detailRating = document.getElementById("detailRating");

    if (ratings.length === 0) {
        starButtons.forEach(function(btn) {
            btn.textContent = "☆";
        });

        if (detailRating) {
            detailRating.textContent = "0.0/5 (0 reviews)";
        }

        return;
    }

    const sum = ratings.reduce(function(total, score) {
        return total + score;
    }, 0);

    const avg = sum / ratings.length;
    const roundedStars = Math.round(avg);

    starButtons.forEach(function(btn, index) {
        btn.textContent = index < roundedStars ? "★" : "☆";
    });

    if (detailRating) {
        detailRating.textContent =
            `${avg.toFixed(1)}/5 (${ratings.length} ${ratings.length === 1 ? "review" : "reviews"})`;
    }
}

function getProductPrice(productName) {
    if (!products[productName]) return 0;

    return Number(
        products[productName].price.replace(/[^\d]/g, "")
    );
}

function formatKRW(amount) {
    return Number(amount).toLocaleString("en-US");
}

function openCartSidebar() {
    const overlay = document.getElementById("cartOverlay");

    if (!overlay) return;

    overlay.classList.add("active");
    document.body.classList.add("cart-open");
}

function closeCartSidebar() {
    const overlay = document.getElementById("cartOverlay");

    if (!overlay) return;

    overlay.classList.remove("active");
    document.body.classList.remove("cart-open");
}

function showCartStep(step) {
    const cartStep = document.getElementById("cartStepCart");
    const checkoutStep = document.getElementById("cartStepCheckout");
    const successStep = document.getElementById("cartStepSuccess");
    const pageTitle = document.getElementById("cartPageTitle");

    if (!cartStep || !checkoutStep || !successStep || !pageTitle) return;

    cartStep.hidden = step !== "cart";
    checkoutStep.hidden = step !== "checkout";
    successStep.hidden = step !== "success";

    const titles = {
        cart: "Your Shopping Cart",
        checkout: "Checkout",
        success: "Order Complete"
    };

    pageTitle.textContent = titles[step] || titles.cart;
}

function showCart() {
    showCartStep("cart");
}

function showCheckout() {
    if (Object.keys(cart).length === 0) {
        showCart();
        return;
    }

    const subtotal = Object.keys(cart).reduce(function(sum, productName) {
        return sum +
            getProductPrice(productName) * cart[productName].quantity;
    }, 0);

    const total = subtotal + DELIVERY_FEE;

    document.getElementById("checkoutTotal").textContent =
        formatKRW(total);

    showCartStep("checkout");
}

function addToCart() {
    const quantityInput = document.getElementById("quantity");

    const quantity = Math.max(
        1,
        parseInt(quantityInput.value, 10) || 1
    );

    if (!products[currentProduct]) return;

    if (cart[currentProduct]) {
        cart[currentProduct].quantity += quantity;
    } else {
        cart[currentProduct] = {
            quantity: quantity
        };
    }

    updateCartDisplay();
    closeProductDetail();
    showCart();
    openCartSidebar();
}

function updateCartDisplay() {
    const cartItems = document.getElementById("cartItems");
    const cartCount = document.getElementById("cartCount");
    const subtotalElement = document.getElementById("subtotal");
    const deliveryFeeElement = document.getElementById("deliveryFee");
    const totalElement = document.getElementById("total");

    if (!cartItems) return;

    const productNames = Object.keys(cart);

    const totalQuantity = productNames.reduce(function(sum, name) {
        return sum + cart[name].quantity;
    }, 0);

    if (cartCount) {
        cartCount.textContent = totalQuantity;
    }

    if (productNames.length === 0) {
        cartItems.innerHTML =
            '<p id="emptyCart">Your shopping cart is currently empty.</p>';

        if (subtotalElement) subtotalElement.textContent = "0";
        if (deliveryFeeElement) deliveryFeeElement.textContent = "0";
        if (totalElement) totalElement.textContent = "0";

        return;
    }

    cartItems.innerHTML = "";

    let subtotal = 0;

    productNames.forEach(function(productName) {
        const item = products[productName];
        const quantity = cart[productName].quantity;
        const unitPrice = getProductPrice(productName);
        const lineTotal = unitPrice * quantity;

        subtotal += lineTotal;

        const cartItem = document.createElement("article");
        cartItem.className = "cart-item";

        const image = document.createElement("img");
        image.src = item.image;
        image.alt = productName;

        const details = document.createElement("div");
        details.className = "cart-item-details";

        const name = document.createElement("h3");
        name.textContent = productName;

        const price = document.createElement("p");
        price.textContent = `KRW ${formatKRW(unitPrice)} each`;

        const quantityLabel = document.createElement("label");
        quantityLabel.textContent = "Quantity: ";

        const quantityInput = document.createElement("input");
        quantityInput.type = "number";
        quantityInput.min = "1";
        quantityInput.step = "1";
        quantityInput.value = quantity;

        quantityInput.addEventListener("change", function() {
            const newQuantity = Math.max(
                1,
                parseInt(quantityInput.value, 10) || 1
            );

            cart[productName].quantity = newQuantity;

            updateCartDisplay();
        });

        quantityLabel.appendChild(quantityInput);

        const lineTotalText = document.createElement("p");
        lineTotalText.textContent =
            `Item total: KRW ${formatKRW(lineTotal)}`;

        const removeButton = document.createElement("button");
        removeButton.type = "button";
        removeButton.textContent = "Remove";

        removeButton.addEventListener("click", function() {
            delete cart[productName];
            updateCartDisplay();
        });

        details.append(
            name,
            price,
            quantityLabel,
            lineTotalText,
            removeButton
        );

        cartItem.append(image, details);
        cartItems.appendChild(cartItem);
    });

    const total = subtotal + DELIVERY_FEE;

    if (subtotalElement) {
        subtotalElement.textContent = formatKRW(subtotal);
    }

    if (deliveryFeeElement) {
        deliveryFeeElement.textContent = formatKRW(DELIVERY_FEE);
    }

    if (totalElement) {
        totalElement.textContent = formatKRW(total);
    }
}

function placeOrder(event) {
    event.preventDefault();

    const form = document.getElementById("checkoutForm");

    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const name = document.getElementById("checkoutName").value.trim();
    const email = document.getElementById("checkoutEmail").value.trim();
    const payment = document.getElementById("paymentMethod").value;

    const productNames = Object.keys(cart);

    if (productNames.length === 0) {
        showCart();
        return;
    }

    const subtotal = productNames.reduce(function(sum, productName) {
        return sum +
            getProductPrice(productName) * cart[productName].quantity;
    }, 0);

    const total = subtotal + DELIVERY_FEE;

    const orderID = "KOCHA" + Date.now().toString().slice(-8);

    document.getElementById("orderNumber").textContent = orderID;
    document.getElementById("receiptName").textContent = name;
    document.getElementById("receiptEmail").textContent = email;
    document.getElementById("receiptPayment").textContent = payment;
    document.getElementById("receiptTotal").textContent = formatKRW(total);

    const receiptItems = document.getElementById("receiptItems");

    receiptItems.innerHTML = "";

    productNames.forEach(function(productName) {
        const receiptItem = document.createElement("p");
        receiptItem.className = "receipt-item";

        receiptItem.textContent =
            `${productName} × ${cart[productName].quantity} — KRW ${formatKRW(
                getProductPrice(productName) * cart[productName].quantity
            )}`;

        receiptItems.appendChild(receiptItem);
    });

    const delivery = document.createElement("p");
    delivery.className = "receipt-item";
    delivery.textContent =
        `Delivery Fee — KRW ${formatKRW(DELIVERY_FEE)}`;

    receiptItems.appendChild(delivery);

    showCartStep("success");

    Object.keys(cart).forEach(function(productName) {
        delete cart[productName];
    });

    updateCartDisplay();
    form.reset();
}

function checkout() {
    showCheckout();
}

const cartToggle = document.getElementById("cartToggle");

if (cartToggle) {
    cartToggle.addEventListener("click", function(event) {
        event.preventDefault();
        showCart();
        openCartSidebar();
    });
}

const closeCartButton = document.getElementById("closeCart");

if (closeCartButton) {
    closeCartButton.addEventListener("click", closeCartSidebar);
}

const continueShoppingButton = document.getElementById("continueShopping");

if (continueShoppingButton) {
    continueShoppingButton.addEventListener("click", closeCartSidebar);
}

const cartOverlay = document.getElementById("cartOverlay");

if (cartOverlay) {
    cartOverlay.addEventListener("click", function(event) {
        if (event.target === this) {
            closeCartSidebar();
        }
    });
}

document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        if (productModal.classList.contains("active")) {
            closeProductDetail();
        } else {
            closeCartSidebar();
        }
    }
});

const checkoutForm = document.getElementById("checkoutForm");

if (checkoutForm) {
    checkoutForm.addEventListener("submit", placeOrder);
}

const finishOrderButton = document.getElementById("finishOrder");

if (finishOrderButton) {
    finishOrderButton.addEventListener("click", function() {
        showCart();
        closeCartSidebar();
    });
}

updateCartDisplay();

function updateDateTime() {
    const datetimeElement = document.getElementById("datetime");

    if (!datetimeElement) return;

    const now = new Date();

    datetimeElement.textContent = now.toLocaleString("en-GB", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    });
}

updateDateTime();
setInterval(updateDateTime, 1000);

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

function setFieldError(field, hasError) {
    field.style.borderColor = hasError ? "#d93025" : "";

    if (hasError) {
        field.setAttribute("aria-invalid", "true");
    } else {
        field.removeAttribute("aria-invalid");
    }
}

const contactForm = document.getElementById("contactForm");

if (contactForm) {
    const contactName = document.getElementById("name");
    const contactEmail = document.getElementById("email");
    const contactMessage = document.getElementById("message");
    const formMessage = document.getElementById("formMessage");

    function showFormMessage(text, isError) {
        if (!formMessage) return;

        formMessage.textContent = text;
        formMessage.style.color = isError ? "#d93025" : "#2e7d32";
    }

    [contactName, contactEmail, contactMessage].forEach(function(field) {
        field.addEventListener("input", function() {
            setFieldError(field, false);
        });
    });

    contactForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const nameValue = contactName.value.trim();
        const emailValue = contactEmail.value.trim();
        const messageValue = contactMessage.value.trim();

        setFieldError(contactName, false);
        setFieldError(contactEmail, false);
        setFieldError(contactMessage, false);

        if (nameValue === "" || emailValue === "" || messageValue === "") {
            if (nameValue === "") setFieldError(contactName, true);
            if (emailValue === "") setFieldError(contactEmail, true);
            if (messageValue === "") setFieldError(contactMessage, true);

            showFormMessage("Please fill in all fields.", true);
            return;
        }

        if (!isValidEmail(emailValue)) {
            setFieldError(contactEmail, true);
            showFormMessage("Please enter a valid email address (e.g. name@example.com).", true);
            contactEmail.focus();
            return;
        }

        showFormMessage("Thank you, " + nameValue + "! Your message has been sent.", false);
        contactForm.reset();
    });
}
