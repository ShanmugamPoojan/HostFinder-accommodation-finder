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