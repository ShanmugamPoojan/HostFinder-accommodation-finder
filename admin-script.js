document.addEventListener('DOMContentLoaded', () => {
    const accommodationsContainer = document.getElementById('accommodations-container');
    const roommatesContainer = document.getElementById('roommates-container');

    // Fetch accommodations data
    fetch('http://localhost:3000/api/accommodation')
        .then(response => response.json())
        .then(data => {
            accommodationsContainer.innerHTML = '';
            data.forEach(accommodation => {
                const card = document.createElement('div');
                card.classList.add('card');

                const pictures = Array.isArray(accommodation.pictures)
                    ? accommodation.pictures
                    : JSON.parse(accommodation.pictures || '[]');
                

                card.innerHTML = `
                    <img src="${pictures[0] || 'images/default.jpg'}" alt="${accommodation.accommodation_name}"><br>
                    <h3>${accommodation.accommodation_name}</h3>
                    <p><strong>Location:</strong> ${accommodation.location}</p>
                    <p><strong>Gender preference:</strong> ${accommodation.gender_preference}</p>
                    <p><strong>Total Rooms:</strong> ${accommodation.total_rooms}</p>
                    <p><strong>Room Sharing:</strong> ${accommodation.room_sharing}</p>
                    <p><strong>Food Type:</strong> ${accommodation.food_type}</p><br>
                    <button class="delete-button" onclick="deleteAccommodation(${accommodation.accommodation_id})">
                        Delete
                    </button>
                `;

                accommodationsContainer.appendChild(card);
            });
        })
        .catch(error => console.error('Error fetching accommodations:', error));

    // Fetch roommate requests data
    fetch('http://localhost:3000/api/roommates')
        .then(response => response.json())
        .then(data => {
            roommatesContainer.innerHTML = '';
            data.forEach(request => {
                const card = document.createElement('div');
                card.classList.add('card');

                card.innerHTML = `
                    <img src="${request.pictures || 'images/default.jpg'}" alt="${request.name}"><br>
                    <h3>${request.name}</h3>
                    <p><strong>Age:</strong> ${request.age}</p>
                    <p><strong>Gender:</strong> ${request.gender}</p>
                    <p><strong>Profession:</strong> ${request.profession}</p>
                    <p><strong>Location:</strong> ${request.location}</p>
                    <p><strong>Contact:</strong> ${request.contact}</p>
                    <button class="delete-button" onclick="deleteRoommate(${request.request_id})">
                        Delete
                    </button>
                `;

                roommatesContainer.appendChild(card);
            });
        })
        .catch(error => console.error('Error fetching roommate requests:', error));
});

// Delete accommodation
function deleteAccommodation(id) {
    if (confirm('Are you sure you want to delete this accommodation?')) {
        fetch(`http://localhost:3000/api/accommodation/${id}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to delete accommodation');
                }
                alert('Accommodation deleted successfully!');
                location.reload(); // Refresh the page
            })
            .catch(error => {
                console.error('Error deleting accommodation:', error);
                alert('Failed to delete accommodation');
            });
    }
}

// Delete roommate request
function deleteRoommate(id) {
    if (confirm('Are you sure you want to delete this roommate request?')) {
        fetch(`http://localhost:3000/api/roommate/${id}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to delete roommate request');
                }
                alert('Roommate request deleted successfully!');
                location.reload(); // Refresh the page
            })
            .catch(error => {
                console.error('Error deleting roommate request:', error);
                alert('Failed to delete roommate request');
            });
    }
}
