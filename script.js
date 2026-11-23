// Product Datails
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

//JavaScript Requirements:
// 1. Interactive Menu Description: Show/Hide food item description on click
function toggleDescription(descId) {
  const descElement = document.getElementById(descId);
  const cardContent = descElement.closest('.card-content');
  const toggleBtn = cardContent.querySelector('.btn-outline');

  if (descElement.hidden) {
    descElement.hidden = false;
    toggleBtn.textContent = "Hide Description";
  } else {
    descElement.hidden = true;
    toggleBtn.textContent = "View Description";
  }
}

//4. Additional Features
// 4.1 Search / Filter Menu Items
const searchInput = document.getElementById("searchInput");

if (searchInput) {
  searchInput.addEventListener("input", function () {
    const query = searchInput.value.toLowerCase().trim();
    const cards = document.querySelectorAll("#menuGrid .product-card");
    const countElement = document.getElementById("searchResultCount");
    
    let visibleCount = 0;

    cards.forEach(function (card) {
      const titleElement = card.querySelector("h3");
      if (titleElement) {
        const drinkName = titleElement.textContent.toLowerCase();
        if (drinkName.includes(query)) {
          card.style.display = "";
          visibleCount++; // Count matching cards
        } else {
          card.style.display = "none";
        }
      }
    });

    // Update the result text based on count
    if (countElement) {
      if (query === "") {
        countElement.textContent = ""; // Clear text if search bar is empty
      } else if (visibleCount === 0) {
        countElement.textContent = "No drinks found.";
      } else if (visibleCount === 1) {
        countElement.textContent = "1 drink found!";
      } else {
        countElement.textContent = `${visibleCount} drinks found!`;
      }
    }
  });
}