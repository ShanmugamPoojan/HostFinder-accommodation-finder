
const loginModal = document.getElementById("loginModal");
const registerModal = document.getElementById("registerModal");

function openLoginModal() {
    loginModal.style.display = "block";
    registerModal.style.display = "none";
}
function openRegisterModal() {
    loginModal.style.display = "none";
    registerModal.style.display = "block";
}


function login() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const requestDetails = document.getElementById('requestDetails');

    if (!email || !password) {
        alert("Please enter both email and password.");
        return;
    }

    // Send login data to the server
    fetch('http://localhost:3000/api/user/login', {
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
                localStorage.setItem('user_id', data.user_id);
                document.getElementById('noUser').style.display = "none"
                requestDetails.style.display = 'flex';
                // displayRoommateRequests(); // Store user_id in localStorage
                window.location.reload();
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
    fetch('http://localhost:3000/api/user/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
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

document.addEventListener('DOMContentLoaded', () => {
    const userId = localStorage.getItem('user_id');
    const requestSection = document.getElementById('roommateRequest');
    const requestDetails = document.getElementById('requestDetails');
    const editForm = document.getElementById('editRequestForm');
    const logoutButton = document.getElementById('logoutButton');

    // If no user is logged in, hide the user-specific sections
    if (!userId) {
        document.getElementById('noUser').style.display = "block"
        // document.getElementById( 'loginModal').style.display = "block";
        requestSection.style.display = 'none';
        logoutButton.style.display = 'none';
        return;
    }

    // Show the logout button if the user is logged in
    // logoutButton.style.display = 'block';
    document.getElementById('noUser').style.display = "none"

    // Fetch roommate request details for the logged-in user
    fetch(`http://localhost:3000/api/roommate_requests/${userId}`)
        .then(response => response.json())
        .then(data => {
            if (data) {
                document.getElementById('requestName').textContent = data.name;
                document.getElementById('requestAge').textContent = data.age;
                document.getElementById('requestGender').textContent = data.gender;
                document.getElementById('requestProfession').textContent = data.profession;
                document.getElementById('requestRoomSharing').textContent = data.room_sharing;
                document.getElementById('requestLocation').textContent = data.location;
                document.getElementById('requestDescription').textContent = data.description;
                document.getElementById('requestRequirements').textContent = data.requirements;
                document.getElementById('requestContact').textContent = data.contact;
                document.getElementById('requestEmail').textContent = data.email;
                document.getElementById('requestPictures').textContent = data.pictures;

                const profilePicture = document.getElementById('profilePicture');
                profilePicture.src = data.pictures || 'images/default_roommate.jpg';

                document.getElementById('editName').value = data.name;
                document.getElementById('editAge').value = data.age;
                document.getElementById('editGender').value = data.gender;
                document.getElementById('editProfession').value = data.profession;
                const roomSharingOptions = data.room_sharing ? data.room_sharing.split(',') : [];
                document.querySelectorAll('#editRoomSharing input[type="checkbox"]').forEach(checkbox => {
                    checkbox.checked = roomSharingOptions.includes(checkbox.value);
                });
                document.getElementById('editLocation').value = data.location;
                document.getElementById('editDescription').value = data.description;
                document.getElementById('editRequirements').value = data.requirements;
                document.getElementById('editContact').value = data.contact;
                document.getElementById('editEmail').value = data.email;
                document.getElementById('editPictures').value = data.pictures;

                requestDetails.style.display = 'flex';
            } else {
                editForm.style.display = 'block';
            }

            requestSection.style.display = 'block';
        })
        .catch(error => console.error('Error fetching roommate request:', error));
});

function showEditForm() {
    document.getElementById('requestDetails').style.display = 'none';
    document.getElementById('editRequestForm').style.display = 'block';
}
function closeEditForm(event) {
    event.preventDefault();
    document.getElementById('editRequestForm').style.display = 'none';
    document.getElementById('requestDetails').style.display = 'flex';
}

function logout() {
    localStorage.removeItem('user_id');
    alert('Logged out successfully!');
    window.location.reload();
}

// Logout Functionality
// function logout() {
//     localStorage.removeItem('user_id'); // Remove user ID from local storage
//     alert('You have been logged out successfully.');
//     location.reload(); // Reload the page to reset the state
// }

// Enable editing of roommate request
// function editRoommateRequest() {
//     const requestDetails = document.getElementById('requestDetails');
//     const editForm = document.getElementById('editRequestForm');

//     requestDetails.style.display = 'none';
//     editForm.style.display = 'block';

//     // Populate the form with existing data
//     document.getElementById('editName').value = document.getElementById('requestName').textContent;
//     document.getElementById('editAge').value = document.getElementById('requestAge').textContent;
//     document.getElementById('editGender').value = document.getElementById('requestGender').textContent;
//     document.getElementById('editProfession').value = document.getElementById('requestProfession').textContent;
//     document.getElementById('editRoomSharing').value = document.getElementById('requestRoomSharing').textContent;
//     document.getElementById('editLocation').value = document.getElementById('requestLocation').textContent;
//     document.getElementById('editDescription').value = document.getElementById('requestDescription').textContent;
//     document.getElementById('editRequirements').value = document.getElementById('requestRequirements').textContent;
//     document.getElementById('editContact').value = document.getElementById('requestContact').textContent;
//     document.getElementById('editEmail').value = document.getElementById('requestEmail').textContent;
//     document.getElementById('editPictures').value = document.getElementById('requestPictures').textContent;
// }

function closeRoommateRequest() {
    event.preventDefault()
    const requestDetails = document.getElementById('requestDetails');
    const editForm = document.getElementById('editRequestForm');

    editForm.style.display = 'none';
    requestDetails.style.display = 'flex';
}

// Save roommate request to the database
function saveRoommateRequest(event) {
    event.preventDefault();

    const userId = localStorage.getItem('user_id');
    const roomSharingOptions = Array.from(document.querySelectorAll('#editRoomSharing input[type="checkbox"]:checked')).map(opt => opt.value);
    const requestData = {
        name: document.getElementById('editName').value,
        age: document.getElementById('editAge').value,
        gender: document.getElementById('editGender').value,
        profession: document.getElementById('editProfession').value,
        room_sharing: roomSharingOptions.join(','),
        location: document.getElementById('editLocation').value,
        description: document.getElementById('editDescription').value,
        requirements: document.getElementById('editRequirements').value,
        contact: document.getElementById('editContact').value,
        email: document.getElementById('editEmail').value,
        pictures: document.getElementById('editPictures').value,
    };
    fetch(`http://localhost:3000/api/roommate_requests/${userId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Roommate request saved successfully!');
                location.reload(); // Refresh the page
            } else {
                alert(data.message || 'Failed to save the request.');
            }
        })
        .catch(error => console.error('Error saving roommate request:', error));
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
