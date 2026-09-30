/* =================================================_
   NORTH STAR BAKERY - TOUCHSTONE 4 INTERACTIVITY SCRIPT
   ================================================= */

   document.addEventListener("DOMContentLoaded", () => {
    // --- FEATURE 1: PRODUCT WISHLIST & FAVORITES TRACKER ---
    const wishlistButtons = document.querySelectorAll(".wishlist-btn");
    const wishlistContainer = document.getElementById("wishlist-items");

    // Load saved wishlist from localStorage using an array
    let userWishlist = JSON.parse(localStorage.getItem("bakeryWishlist")) || [];

    // Function to render wishlist dynamically on the page
    function renderWishlist() {
        if (!wishlistContainer) return;
        
        wishlistContainer.innerHTML = "";
        
        if (userWishlist.length === 0) {
            wishlistContainer.innerHTML = "<li><em>Your wishlist is currently empty. Click 'Add to Wishlist' on any product below!</em></li>";
            return;
        }

        userWishlist.forEach((item, index) => {
            const li = document.createElement("li");
            li.textContent = item;
            
            // Add a remove button for each favorite item
            const removeBtn = document.createElement("button");
            removeBtn.textContent = "Remove";
            removeBtn.style.marginLeft = "10px";
            removeBtn.style.padding = "2px 6px";
            removeBtn.style.fontSize = "0.8rem";
            removeBtn.style.cursor = "pointer";
            
            removeBtn.addEventListener("click", () => {
                removeItemFromWishlist(index);
            });

            li.appendChild(removeBtn);
            wishlistContainer.appendChild(li);
        });
    }

    // Function to add an item to the wishlist array and save to localStorage
    function addWishlistItem(itemName) {
        if (!userWishlist.includes(itemName)) {
            userWishlist.push(itemName);
            localStorage.setItem("bakeryWishlist", JSON.stringify(userWishlist));
            renderWishlist();
            alert(`"${itemName}" has been added to your bakery wishlist!`);
        } else {
            alert(`"${itemName}" is already in your wishlist.`);
        }
    }

    // Function to remove an item from the wishlist
    function removeItemFromWishlist(index) {
        userWishlist.splice(index, 1);
        localStorage.setItem("bakeryWishlist", JSON.stringify(userWishlist));
        renderWishlist();
    }

    // Attach click events to all wishlist buttons
    wishlistButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const productName = e.target.getAttribute("data-product");
            addWishlistItem(productName);
        });
    });

    // Initial render when page loads
    renderWishlist();


    // --- FEATURE 2: FORM VALIDATION ---
    const orderForm = document.getElementById("orderForm");
    
    if (orderForm) {
        orderForm.addEventListener("submit", (e) => {
            let isValid = true;

            // Get form fields
            const fullName = document.getElementById("fullname");
            const email = document.getElementById("email");
            const pickupDate = document.getElementById("pickup-date");

            // Get error span elements
            const nameError = document.getElementById("nameError");
            const emailError = document.getElementById("emailError");
            const dateError = document.getElementById("dateError");

            // Reset error messages
            nameError.textContent = "";
            emailError.textContent = "";
            dateError.textContent = "";

            // 1. Required Field Check: Full Name
            if (fullName.value.trim() === "") {
                nameError.textContent = "Please enter your full name.";
                isValid = false;
            }

            // 2. Required Field & Email Format Validation
            const emailValue = email.value.trim();
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailValue === "") {
                emailError.textContent = "Email address is required.";
                isValid = false;
            } else if (!emailPattern.test(emailValue)) {
                emailError.textContent = "Please enter a valid email address (e.g., name@example.com).";
                isValid = false;
            }

            // 3. Required Field Check: Pickup Date
            if (pickupDate.value.trim() === "") {
                dateError.textContent = "Please select a pickup date.";
                isValid = false;
            }

            // Prevent submission if validation fails
            if (!isValid) {
                e.preventDefault();
            } else {
                // Optional: Store last submitted name in sessionStorage for personalization
                sessionStorage.setItem("lastCustomer", fullName.value.trim());
            }
        });
    }
});