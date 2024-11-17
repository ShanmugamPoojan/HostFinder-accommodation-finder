// Get the owner_id from the URL query parameter
const urlParams = new URLSearchParams(window.location.search);
const ownerId = urlParams.get('owner_id');

const loginModal = document.getElementById("loginModal");
const registerModal = document.getElementById("registerModal");
const profilePage = document.getElementById("profilePage");

function openLoginModal(){
    loginModal.style.display = "block";
    registerModal.style.display = "none";
}
function openRegisterModal(){
    loginModal.style.display = "none";
    registerModal.style.display = "block";
}

openLoginModal();
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
                // Redirect to owner.html with owner_id as a query parameter
                window.location.href = `owner.html?owner_id=${data.owner_id}`;
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


// Add event listeners to all elements with the "close" class
document.addEventListener('DOMContentLoaded', () => {
    const closeButtons = document.querySelectorAll('.close');
    
    closeButtons.forEach(button => {
        button.onclick = function() {
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
window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
};



// if (!ownerId) {
//     alert("Owner ID missing. Please log in.");
//     window.location.href = 'index.html'; // Redirect to login page
// }

// function fetchAccommodations() {
//     fetch(`http://localhost:3000/api/accommodation?owner_id=${ownerId}`)
//         .then(response => response.json())
//         .then(data => {
//             displayAccommodations(data);
//         })
//         .catch(error => console.error('Error fetching accommodations:', error));
// }

// function displayAccommodations(accommodations) {
//     const container = document.getElementById('accommodations');
//     container.innerHTML = '';

//     accommodations.forEach(accommodation => {
//         const div = document.createElement('div');
//         div.classList.add('accommodation');
//         div.innerHTML = `
//             <h3>${accommodation.accommodation_name}</h3>
//             <p>${accommodation.description}</p>
//             <p><strong>Location:</strong> ${accommodation.location}</p>
//             <button onclick="editAccommodation(${accommodation.accommodation_id})">Edit</button>
//         `;
//         container.appendChild(div);
//     });
// }

// function editAccommodation(accommodationId) {
//     const newName = prompt("Enter new accommodation name:");
//     const newDescription = prompt("Enter new description:");

//     if (newName && newDescription) {
//         fetch(`http://localhost:3000/api/accommodation/${accommodationId}`, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 accommodation_name: newName,
//                 description: newDescription,
//             }),
//         })
//             .then(response => response.json())
//             .then(data => {
//                 if (data.success) {
//                     alert("Accommodation updated successfully!");
//                     fetchAccommodations(); // Refresh accommodations
//                 } else {
//                     alert("Failed to update accommodation.");
//                 }
//             })
//             .catch(error => console.error('Error updating accommodation:', error));
//     }
// }

// Fetch accommodations on page load
// fetchAccommodations();
