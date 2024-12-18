// Product Image Change on Color Select
const colorRadios = document.querySelectorAll(".color-select");
const productImage = document.getElementById("product-image");
colorRadios.forEach((radio) => {
	radio.addEventListener("change", () => {
		productImage.src = radio.dataset.image;
	});
});

// Counter Logic
const counterElement = document.getElementById("counter");
const decreaseBtn = document.getElementById("decrease");
const increaseBtn = document.getElementById("increase");
let counter = 1;

decreaseBtn.addEventListener("click", () => {
	if (counter > 1) {
		counter--;
		counterElement.textContent = counter;
	}
});

increaseBtn.addEventListener("click", () => {
	counter++;
	counterElement.textContent = counter;
});

// Cart Logic
const cart = [];
const cartModal = document.getElementById("cart-modal");
const cartItems = document.getElementById("cart-items");
const checkoutDiv = document.getElementById("checkout-div");
const cartCountBadge = document.getElementById("cart-count");
const addToCartBtn = document.getElementById("add-to-cart");
const continueShoppingBtn = document.getElementById("continue-shopping");

// Size Selection Logic
const sizeButtons = document.querySelectorAll(".size-btn");
let selectedSize = "M"; // Default size
let selectedPrice = 79; // Default price

sizeButtons.forEach((button) => {
	button.addEventListener("click", () => {
		// Remove active class from all size buttons
		sizeButtons.forEach((btn) =>
			btn.classList.remove("bg-blue-500", "text-white")
		);

		// Add active class to the selected size button
		button.classList.add("bg-blue-500", "text-white");

		// Update selected size and price
		selectedSize = button.querySelector("span.font-bold").textContent;
		selectedPrice = parseInt(
			button.querySelector("span.text-sm.font-medium").textContent.slice(2),
			10
		);
	});
});

// Add to Cart
addToCartBtn.addEventListener("click", () => {
	const selectedColor = document.querySelector(
		'input[name="color"]:checked'
	).value;

	const existingItem = cart.find(
		(item) => item.color === selectedColor && item.size === selectedSize
	);

	if (existingItem) {
		existingItem.quantity += counter;
	} else {
		cart.push({
			color: selectedColor,
			size: selectedSize,
			quantity: counter,
			price: selectedPrice,
		});
	}

	// Update cart count badge
	cartCountBadge.textContent = cart.reduce(
		(sum, item) => sum + item.quantity,
		0
	);

	// Reset counter to 1 after adding to cart
	counter = 1;
	counterElement.textContent = counter;

	// Notify user
	alert("Product added to cart!");
});

// Show cart modal on checkout click
checkoutDiv.addEventListener("click", () => {
	renderCart(); // Render updated cart
	cartModal.classList.remove("hidden");
});

// Close modal
continueShoppingBtn.addEventListener("click", () => {
	cartModal.classList.add("hidden");
});

function renderCart() {
	cartItems.innerHTML = ""; // Clear previous cart items
	let totalPrice = 0;

	cart.forEach((item) => {
		const itemElement = document.createElement("div");
		itemElement.className = "grid grid-cols-5 items-center gap-2";

		const itemImageSrc = getItemImage(item.color); // Function to get image based on color
		const itemTotalPrice = (item.quantity * item.price).toFixed(2);
		totalPrice += parseFloat(itemTotalPrice);

		itemElement.innerHTML = `
      <div class="flex items-center space-x-2">
        <img src="${itemImageSrc}" alt="Product" class="w-10 h-10 rounded-md" />
        <span class="text-sm text-gray-800 font-medium">Smart Watch</span>
      </div>
      <span class="text-sm text-gray-600">${capitalize(item.color)}</span>
      <span class="text-sm text-gray-600">${item.size}</span>
      <span class="text-sm text-gray-600">${item.quantity}</span>
      <span class="text-sm text-gray-800 font-medium">$${itemTotalPrice}</span>
    `;

		cartItems.appendChild(itemElement);
	});

	// Update total price
	document.getElementById("total-price").textContent = `$${totalPrice.toFixed(
		2
	)}`;
}

// Helper to get product image based on color
function getItemImage(color) {
	switch (color) {
		case "violet":
			return "images/f1-image.png";
		case "cyan":
			return "images/f2-image.png";
		case "blue":
			return "images/f3-image.png";
		case "black":
			return "images/f4-image.png";
		default:
			return "images/f1-image.png";
	}
}

// Helper to capitalize the first letter of a string
function capitalize(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

// Set initial default size and price
document.addEventListener("DOMContentLoaded", () => {
	const defaultButton = document.querySelector('.size-btn:contains("M")');
	defaultButton.classList.add("bg-blue-500", "text-white");
});
