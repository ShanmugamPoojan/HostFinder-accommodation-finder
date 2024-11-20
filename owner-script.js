// Get the owner_id from local storage
const ownerId = localStorage.getItem("owner_id");

// Modal References
const loginModal = document.getElementById("loginModal");
const registerModal = document.getElementById("registerModal");

// Show the login modal
function openLoginModal() {
    loginModal.style.display = "block";
    registerModal.style.display = "none";
}

// Show the register modal
function openRegisterModal() {
    loginModal.style.display = "none";
    registerModal.style.display = "block";
}

document.addEventListener("DOMContentLoaded", () => {
    if (ownerId) {
        displayAccommodations();
    } else {
        openLoginModal();
    }
});

// Display accommodations for the logged-in owner
function displayAccommodations() {
    const accommodationSection = document.getElementById("ownerAccommodationSection");
    const accommodationForm = document.getElementById("accommodationForm");
    const noAccommodationMessage = document.getElementById("noAccommodationMessage");

    if (!ownerId) {
        alert("Please log in to access the owner portal.");
        openLoginModal();
        return;
    }

    fetch(`http://localhost:3000/api/accommodation/${ownerId}`)
        .then((response) => response.json())
        .then((data) => {
            if (data) {
                populateAccommodationDetails(data);
                accommodationSection.style.display = "block";
            } else {
                noAccommodationMessage.style.display = "block";
            }
        })
        .catch((error) => console.error("Error fetching accommodation data:", error));
}

// Populate accommodation details into the display section
function populateAccommodationDetails(data) {
    if (!data.accommodation_name) {
        console.error("Accommodation data is null or undefined.");
        document.getElementById("noAccommodationMessage").style.display = "block";
        document.getElementById("ownerAccommodationSection").style.display = "none";
        document.getElementById("accommodationForm").style.display = "none";
        return;
    }

    try {
        document.getElementById("accommodationName").textContent = data.accommodation_name || "N/A";
        document.getElementById("price").textContent = data.price || "N/A";
        document.getElementById("location").textContent = data.location || "N/A";
        document.getElementById("description").textContent = data.description || "N/A";
        document.getElementById("totalRooms").textContent = data.total_rooms || "N/A";
        document.getElementById("genderPreference").textContent = data.gender_preference || "N/A";
        document.getElementById("foodType").textContent = data.food_type || "N/A";
        document.getElementById("roomSharing").textContent = (data.room_sharing || "").split(",").join(", ") || "N/A";
        document.getElementById("bathrooms").textContent = (data.bathroom || "").split(",").join(", ") || "N/A";
        document.getElementById("restrictions").textContent = data.restrictions || "N/A";
        document.getElementById("contact").textContent = data.contact || "N/A";

        const facilitiesList = document.getElementById("facilitiesList");
        facilitiesList.innerHTML = "";
        const facilities = Array.isArray(data.facilities) ? data.facilities : JSON.parse(data.facilities || "[]");
        facilities.forEach((facility) => {
            const listItem = document.createElement("li");
            listItem.textContent = facility;
            facilitiesList.appendChild(listItem);
        });
    } catch (error) {
        console.error("Error processing accommodation details:", error);
    }
}

// Edit accommodation details
function editAccommodation() {
    const accommodationForm = document.getElementById("accommodationForm");
    const accommodationSection = document.getElementById("ownerAccommodationSection");

    accommodationSection.style.display = "none";
    accommodationForm.style.display = "block";

    // Prepopulate form
    document.getElementById("accommodationNameInput").value = document.getElementById("accommodationName").textContent;
    document.getElementById("priceInput").value = document.getElementById("price").textContent;
    document.getElementById("locationInput").value = document.getElementById("location").textContent;
    document.getElementById("descriptionInput").value = document.getElementById("description").textContent;
    document.getElementById("totalRoomsInput").value = document.getElementById("totalRooms").textContent;
    document.getElementById("genderPreferenceInput").value = document.getElementById("genderPreference").textContent;
    document.getElementById("foodTypeInput").value = document.getElementById("foodType").textContent;
    document.getElementById("contactInput").value = document.getElementById("contact").textContent;

    // Check checkboxes for room sharing
    const roomSharing = document.getElementById("roomSharing").textContent.split(", ");
    document.getElementById("roomSharingSingle").checked = roomSharing.includes("single");
    document.getElementById("roomSharingDouble").checked = roomSharing.includes("double");
    document.getElementById("roomSharingTriple").checked = roomSharing.includes("triple");

    // Check checkboxes for bathrooms
    const bathrooms = document.getElementById("bathrooms").textContent.split(", ");
    document.getElementById("bathroomAttach").checked = bathrooms.includes("attach");
    document.getElementById("bathroomCommon").checked = bathrooms.includes("common");

    document.getElementById("restrictionsInput").value = document.getElementById("restrictions").textContent;

    // Handle facilities
    const facilitiesList = document.getElementById("facilitiesList");
    const facilities = Array.isArray(facilitiesList.dataset.facilities) 
        ? facilitiesList.dataset.facilities 
        : JSON.parse(facilitiesList.dataset.facilities || "[]");

    document.getElementById("facilitiesInput").value = facilities.join(", ");

    // Handle pictures
    const picturesList = document.getElementById("picturesList");
    const pictures = Array.isArray(picturesList.dataset.pictures) 
        ? picturesList.dataset.pictures 
        : JSON.parse(picturesList.dataset.pictures || "[]");

    document.getElementById("picturesInput").value = pictures.join(", ");
    

}


// Save or update accommodation details
function saveAccommodation(event) {
    event.preventDefault();

    const roomSharing = Array.from(document.querySelectorAll("#accommodationForm input[name='roomSharing']:checked"))
        .map((checkbox) => checkbox.value)
        .join(",");
    const bathrooms = Array.from(document.querySelectorAll("#accommodationForm input[name='bathroom']:checked"))
        .map((checkbox) => checkbox.value)
        .join(",");

    const data = {
        accommodation_name: document.getElementById("accommodationNameInput").value,
        price: document.getElementById("priceInput").value,
        location: document.getElementById("locationInput").value,
        description: document.getElementById("descriptionInput").value,
        total_rooms: document.getElementById("totalRoomsInput").value,
        gender_preference: document.getElementById("genderPreferenceInput").value,
        food_type: document.getElementById("foodTypeInput").value,
        room_sharing: roomSharing,
        bathroom: bathrooms,
        restrictions: document.getElementById("restrictionsInput").value,
        facilities: document.getElementById("facilitiesInput").value.split(","),
        pictures: document.getElementById("picturesInput").value.split(","),
        contact: document.getElementById("contactInput").value,

    };

    fetch(`http://localhost:3000/api/accommodation/${ownerId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                alert("Accommodation saved successfully!");
                location.reload();
            } else {
                alert("Failed to save accommodation.");
            }
        })
        .catch((error) => console.error("Error saving accommodation:", error));
}

// Add new accommodation
function addAccommodation() {
    document.getElementById("noAccommodationMessage").style.display = "none";
    document.getElementById("accommodationForm").style.display = "block";
}

function cancelEdit() {
    event.preventDefault()
    const accommodationForm = document.getElementById("accommodationForm");
    const accommodationSection = document.getElementById("ownerAccommodationSection");

    accommodationForm.style.display = "none";
    accommodationSection.style.display = "block";
}
// ----------------------------------------------------------------------
function login() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    if (!email || !password) {
        alert("Please enter both email and password.");
        return;
    }

    // Send login data to the server
    fetch('http://localhost:3000/api/owner/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                alert("Login successful!");
                localStorage.setItem('owner_id', data.owner_id); // Store user_id in localStorage
                window.location.reload();
                // loginModal.style.display = "none";

            } else {
                alert(data.message || "Invalid email or password.");
            }
        })
        .catch(error => {
            console.error('Error during login:', error);
            alert("An error occurred. Please try again.");
        });
}

function register() {
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Validate inputs
    if (!email || !password || !confirmPassword) {
        alert("Please fill in all the fields.");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    // Send registration data to the server
    fetch('http://localhost:3000/api/owner/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: document.getElementById('registerEmail').value,
            password: document.getElementById('registerPassword').value,
        }),
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Registration successful!");
                openLoginModal();
            } else {
                alert(data.message || "Registration failed.");
            }
        })
        .catch(error => {
            console.error('Error during registration:', error);
        });

}
// Logout Functionality
function logout() {
    localStorage.removeItem("owner_id");
    alert("Logged out successfully!");
    window.location.href = "index.html";
}


// Add event listeners to all elements with the "close" class
document.addEventListener('DOMContentLoaded', () => {
    const closeButtons = document.querySelectorAll('.close');

    closeButtons.forEach(button => {
        button.onclick = function () {
            const modal = button.closest('.modal'); // Find the closest modal ancestor
            if (modal) {
                modal.style.display = 'none';
            } else {
                console.error('No modal found for this close button.');
            }
        };
    });
});

// Function to close the modal when clicking outside of it
window.onclick = function (event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
};
