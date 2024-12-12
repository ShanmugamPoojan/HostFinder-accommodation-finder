
document.addEventListener('DOMContentLoaded', () => {
    const roommatesContainer = document.querySelector('.roommates');

    // Fetch roommate data from the server
    fetch('http://localhost:3000/api/roommates')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Clear existing cards
            roommatesContainer.innerHTML = '';

            // Iterate over the roommate request data and create cards
            data.forEach(request => {
                const picture = request.pictures || 'images/default_roommate.jpg'; // Use default if no picture provided

                const card = document.createElement('div');
                card.classList.add('roommate-card');
                card.setAttribute('onclick', `onRoommateCardClick(${request.request_id})`);

                card.innerHTML = `
                    <img src="${picture}" alt="${request.name}" onerror="this.onerror=null; this.src='images/default_roommate.jpg';">
                    <h3>${request.name}</h3>
                    <p><b>Profession:</b> ${request.profession}</p>
                    <p><b>Location:</b> ${request.location}</p>
                    <br>
                    <p><u>Click for more details</u></p>
                `;

                roommatesContainer.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Error fetching roommates:', error);
        });
});

function onRoommateCardClick(requestId) {
    fetch(`http://localhost:3000/api/roommate/${requestId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            openRoommateModal(data);
        })
        .catch(error => {
            console.error('Error fetching roommate request:', error);
            alert('Failed to fetch roommate details. Please try again.');
        });
}

function openRoommateModal(data) {
    // Set the main image
    const roommateImage = document.getElementById('roommateImage');
    roommateImage.src = data.pictures || 'images/default_roommate.jpg';
    roommateImage.onerror = () => {
        roommateImage.src = 'images/default_roommate.jpg';
    };

    // Populate roommate details
    document.getElementById('roommateName').textContent = data.name || 'No Name Available';
    document.getElementById('roommateAge').textContent = data.age || 'N/A';
    document.getElementById('roommateGender').textContent = data.gender || 'N/A';
    document.getElementById('roommateProfession').textContent = data.profession || 'N/A';
    document.getElementById('roommateRoomSharing').textContent = data.room_sharing || 'N/A';
    document.getElementById('roommateLocation').textContent = data.location || 'Unknown';
    document.getElementById('roommateDescription').textContent = data.description || 'No Description Available';
    document.getElementById('roommateRequirements').textContent = data.requirements || 'No Requirements Provided';
    document.getElementById('roommateEmail').textContent = data.email || 'No Contact Provided';
    document.getElementById('roommateContact').textContent = data.contact || 'No Contact Provided';

    // Show the modal
    document.getElementById('roommateModal').style.display = 'block';
}

function closeRoommateModal() {
    document.getElementById('roommateModal').style.display = 'none';
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

