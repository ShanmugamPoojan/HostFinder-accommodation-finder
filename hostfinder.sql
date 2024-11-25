CREATE DATABASE hostfinder;
USE hostfinder;

-- Create User Table
CREATE TABLE user (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Owner Table
CREATE TABLE owner (
    owner_id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Accommodation Table with SET for room_sharing
CREATE TABLE accommodation (
    accommodation_id INT AUTO_INCREMENT PRIMARY KEY,
    owner_id INT NOT NULL,
    accommodation_name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    location VARCHAR(255) NOT NULL,
    landmark VARCHAR(255),
    description TEXT NOT NULL,
    total_rooms INT NOT NULL,
    gender_preference ENUM('boys', 'girls', 'both') DEFAULT 'both',
    food_type ENUM('veg', 'non-veg', 'both') DEFAULT 'both',
    room_sharing SET('single','double','triple') NOT NULL,
    bathroom SET('attach', 'common') NOT NULL,
    facilities JSON,
    restrictions TEXT NOT NULL,
    pictures JSON,
    contact varchar(10),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (owner_id) REFERENCES owner(owner_id) ON DELETE CASCADE
);

-- Create Roommate Requests Table
CREATE TABLE roommate_requests (
    request_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    age INT NOT NULL,
    gender ENUM('male', 'female', 'other') NOT NULL,
    profession VARCHAR(100) NOT NULL,
    room_sharing SET('double', 'triple') NOT NULL,
    location VARCHAR(255) NOT NULL,
    description TEXT,
    requirements TEXT,
    contact VARCHAR(10) NOT NULL,
    email VARCHAR(255),
    pictures varchar(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE
);

INSERT INTO owner (email, password, created_at) VALUES
('owner1@example.com', 'owner@123', CURRENT_TIMESTAMP),
('owner2@example.com', 'owner@123', CURRENT_TIMESTAMP),
('owner3@example.com', 'owner@123', CURRENT_TIMESTAMP),
('owner4@example.com', 'owner@123', CURRENT_TIMESTAMP),
('owner5@example.com', 'owner@123', CURRENT_TIMESTAMP);

INSERT INTO user (email, password, created_at) VALUES
('amit.verma@example.com', 'amit@123', CURRENT_TIMESTAMP),
('anjali.kumar@example.com', 'anjali@123', CURRENT_TIMESTAMP),
('rajesh.sharma@example.com', 'rajesh@123', CURRENT_TIMESTAMP),
('sneha.das@example.com', 'sneha@123', CURRENT_TIMESTAMP),
('vikram.singh@example.com', 'vikram@123', CURRENT_TIMESTAMP);

INSERT INTO accommodation (owner_id, accommodation_name, price, location, description, total_rooms, gender_preference, food_type, room_sharing, bathroom, facilities, restrictions, pictures, contact, created_at) VALUES
(1, 'Sunshine PG', 7500.00, 'Koramangala, Bengaluru', 'Affordable stay for working professionals', 10, 'both', 'both', 'single,double', 'attach', '["wifi", "laundry", "parking"]', 'No pets allowed', '["images/pg1_image1.jpg", "images/pg1_image2.jpg", "images/pg1_image3.jpg", "images/pg1_image4.jpg"]', '9876543210', CURRENT_TIMESTAMP),
(2, 'GreenNest Hostel', 6000.00, 'Viman Nagar, Pune', 'Spacious and comfortable hostel', 15, 'boys', 'veg', 'double', 'common', '["security", "laundry"]', 'Smoking not allowed', '["images/pg1_image4.jpg", "images/pg1_image2.jpg", "images/pg1_image3.jpg", "images/pg1_image4.jpg"]', '9823456789', CURRENT_TIMESTAMP),
(3, 'BlueHeaven Stay', 8500.00, 'Powai, Mumbai', 'Premium rooms for IT professionals', 12, 'girls', 'both', 'single,double', 'attach,common', '["wifi", "gym", "laundry"]', 'No loud music', '["images/pg1_image2.jpg", "images/pg1_image2.jpg", "images/pg1_image3.jpg", "images/pg1_image4.jpg"]', '9987654321', CURRENT_TIMESTAMP),
(4, 'CozyStay', 5000.00, 'Salt Lake, Kolkata', 'Cozy rooms for students', 8, 'both', 'veg', 'triple', 'attach', '["wifi", "kitchen"]', 'No alcohol', '["images/pg2_image1.jpg", "images/pg2_image2.jpg", "images/pg2_image3.jpg", "images/pg2_image4.jpg"]', '9876541234', CURRENT_TIMESTAMP),
(5, 'GreenLeaf Hostel', 7000.00, 'Gachibowli, Hyderabad', 'Eco-friendly accommodations', 20, 'both', 'non-veg', 'double', 'common', '["wifi", "laundry", "garden"]', 'No pets allowed', '["images/pg2_image4.jpg", "images/pg1_image2.jpg", "images/pg1_image3.jpg", "images/pg1_image4.jpg"]', '9123456789', CURRENT_TIMESTAMP);

INSERT INTO roommate_requests (user_id, name, age, gender, profession, room_sharing, location, description, requirements, contact, email, pictures, created_at) VALUES
(1, 'Rohan Gupta', 25, 'male', 'Software Developer', 'double', 'Whitefield, Bengaluru', 'Looking for a clean and quiet roommate', 'Vegetarian preferred', '9876543210', 'rohan.g@example.com', 'images/roommate3.jpg', CURRENT_TIMESTAMP),
(2, 'Priya Mehta', 23, 'female', 'Marketing Manager', 'triple', 'Kharadi, Pune', 'Searching for a budget-friendly stay', 'No smoking', '9823456789', 'priya.m@example.com', 'images/roommate5.jpg', CURRENT_TIMESTAMP),
(3, 'Rahul Jain', 27, 'male', 'Data Analyst', 'double', 'Andheri, Mumbai', 'Looking for a sociable roommate', 'No pets allowed', '9987654321', 'rahul.j@example.com', 'images/roommate4.jpg', CURRENT_TIMESTAMP),
(4, 'Sneha Rao', 24, 'female', 'Graphic Designer', 'double', 'Baner, Pune', 'Seeking a creative and friendly roommate', 'Non-veg preferred', '9876541234', 'sneha.r@example.com', 'images/roommate6.jpg', CURRENT_TIMESTAMP),
(5, 'Vikram Singh', 26, 'male', 'Financial Consultant', 'triple', 'Hitech City, Hyderabad', 'Searching for a like-minded individual', 'No loud music', '9123456789', 'vikram.s@example.com', 'images/roommate7.jpg', CURRENT_TIMESTAMP);

SELECT * FROM accommodation;
select * from roommate_requests;
select * from user;
select * from owner; 