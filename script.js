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
// 4.1 Search Menu Items
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

    // Update the result text based on count aka how many drinks found
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

//4.4. Food Item Rating System
//Food Item Rating System (when clicking a star button 1-5)
function rateProduct(stars) {
  const item = products[currentProduct];
  if (!item) return;

  //Push the user's star rating into the current drink's rating array
  item.ratings.push(stars);
  
  // Refresh the display aka rating
  updateRatingDisplay(currentProduct);
}

//Update the Rating on the Product Detail Page
function updateRatingDisplay(productName) {
  const item = products[productName];
  if (!item) return;
  
  const ratings = item.ratings;
  const starButtons = document.querySelectorAll("#starButtons .star-btn");
  const detailRating = document.getElementById("detailRating");

  if (ratings.length === 0) {
    if (starButtons.length > 0) {
      starButtons.forEach(btn => btn.textContent = "☆");
    }
    if (detailRating) {
      detailRating.textContent = "0.0/5 (0 reviews)";
    }
    return;
  }

  // Calculate the new avg
  const sum = ratings.reduce((total, score) => total + score, 0);
  const avg = sum / ratings.length;
  const roundedStars = Math.round(avg);

  // Light up the interactive detail stars up to the avg rating
  if (starButtons.length > 0) {
    starButtons.forEach((btn, index) => {
      btn.textContent = index < roundedStars ? "★" : "☆";
    });
  }

  // Update the text score and review count
  if (detailRating) {
    detailRating.textContent = `${avg.toFixed(1)}/5 (${ratings.length} ${ratings.length === 1 ? "review" : "reviews"})`;
  }
}