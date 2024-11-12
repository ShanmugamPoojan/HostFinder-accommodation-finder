// Modal functionality
const profileButton = document.getElementById("profileButton");
const profileModal = document.getElementById("profileModal");
const closeModal = document.getElementsByClassName("close")[0];
const profilePage = document.getElementById("profilePage");

profileButton.onclick = function() {
    profileModal.style.display = "block";
}

closeModal.onclick = function() {
    profileModal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == profileModal) {
        profileModal.style.display = "none";
    }
}
function searchAccommodations(event) {
    event.preventDefault();
    const searchQuery = document.getElementById("search-bar").value.toLowerCase();
    const accommodationCards = document.querySelectorAll(".accommodation-card");

    accommodationCards.forEach(card => {
        const location = card.getAttribute("data-location").toLowerCase();
        card.style.display = location.includes(searchQuery) ? "block" : "none";
    });
}

let currentIndex = 0;

function showNext() {
    const heroSections = document.querySelector('.hero-sections');
    currentIndex = (currentIndex + 1) % 2; // Switch between 0 and 1
    heroSections.style.transform = `translateX(-${currentIndex * 100}%)`;
}

function showPrevious() {
    const heroSections = document.querySelector('.hero-sections');
    currentIndex = (currentIndex - 1 + 2) % 2; // Ensure it cycles back
    heroSections.style.transform = `translateX(-${currentIndex * 100}%)`;
}


// Login Functionality
function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (email && password) { // Simple validation
        document.getElementById("userEmail").textContent = email;
        profileModal.style.display = "none";
        profilePage.style.display = "block";
    } else {
        alert("Please enter both email and password.");
    }
}

// JavaScript for Accommodation Modal

document.addEventListener('DOMContentLoaded', function () {
    const accommodationCards = document.querySelectorAll('.accommodation-card');
    const modal = document.getElementById('accommodationModal');
    const modalTitle = document.getElementById('accommodationTitle');
    const modalImage = document.getElementById('accommodationImage');
    const modalDescription = document.getElementById('accommodationDescription');
    const closeModal = document.querySelector('#accommodationModal .close');

    // Example details for accommodations (replace with database data in a real application)
    const accommodationDetails = [
        { title: 'Accommodation 1', image: 'images/room1.jpg', description: 'Details about Accommodation 1' },
        { title: 'Accommodation 2', image: 'images/room1.jpg', description: 'Details about Accommodation 2' },
        { title: 'Accommodation 2', image: 'images/room1.jpg', description: 'Details about Accommodation 2' },
        // Add more accommodation details as needed
    ];

    // Show modal with accommodation details
    accommodationCards.forEach((card, index) => {
        card.addEventListener('click', () => {
            const details = accommodationDetails[index];
            modalTitle.textContent = details.title;
            modalImage.src = details.image;
            modalDescription.textContent = details.description;
            modal.style.display = 'block';
        });
    });

    // Close modal
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close modal when clicking outside of it
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});

document.querySelectorAll('.thumbnail').forEach(thumbnail => {
    thumbnail.addEventListener('click', function() {
        document.getElementById('accommodationImage').src = this.src;
    });
});

