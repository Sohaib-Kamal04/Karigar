<?php
$server = "localhost";
$username = "root";
$password = "";

$conn = mysqli_connect($server, $username, $password);
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$sql = "CREATE DATABASE IF NOT EXISTS karigar";
if (mysqli_query($conn, $sql)) {
    echo "Database created successfully.<br>";
} else {
    die("Error creating database: " . mysqli_error($conn));
}

mysqli_select_db($conn, "karigar");

$schema = "
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('customer', 'provider', 'supplier') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS materials (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    category VARCHAR(100),
    price DECIMAL(10,2),
    stock INT
);

CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(255),
    customer_phone VARCHAR(50),
    customer_address TEXT,
    material_id INT,
    quantity INT,
    status ENUM('Pending','Accepted','Rejected','Shipped','Delivered') DEFAULT 'Pending',
    FOREIGN KEY (material_id) REFERENCES materials(id)
);

CREATE TABLE IF NOT EXISTS services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS service_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    service_id INT NOT NULL,
    customer_name VARCHAR(100) NOT NULL,
    requested_time VARCHAR(100) NOT NULL,
    status ENUM('Pending','Accepted','Rejected','Completed') DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE
);

ALTER TABLE users 
ADD COLUMN location VARCHAR(100) DEFAULT 'N/A',
ADD COLUMN bio TEXT DEFAULT 'No bio provided.',
ADD COLUMN profile_image VARCHAR(255) DEFAULT '../images/profileImage.jpg';
";

if (mysqli_multi_query($conn, $schema)) {
    echo "Tables created successfully.<br>";
    while (mysqli_more_results($conn)) {
        mysqli_next_result($conn);
    }
} else {
    die("Error creating tables: " . mysqli_error($conn));
}

$userInsert = mysqli_query($conn, "
    INSERT INTO users (name, email, password, role)
    VALUES ('Provider One', 'provider@example.com', 'pass123', 'provider')
");

if (!$userInsert) {
    echo "User Insert Error: " . mysqli_error($conn) . "<br>";
    $res = mysqli_query($conn, "SELECT id FROM users WHERE email = 'provider@example.com' LIMIT 1");
    $row = mysqli_fetch_assoc($res);
    $provider_id = $row ? $row['id'] : 0;
} else {
    $provider_id = mysqli_insert_id($conn);
}

if ($provider_id) {
    $result = mysqli_query($conn, "
        INSERT INTO services (title, description, price)
        VALUES 
            ('AC Repair', 'Fixing and servicing air conditioners', 1500.00),
            ('Plumbing Service', 'Fixing leaks and installing pipes', 1000.00)
    ");
    if (!$result) echo "Service Insert Error: " . mysqli_error($conn) . "<br>";
} else {
    echo "Skipping service insert: Invalid provider_id.<br>";
}

$result = mysqli_query($conn, "
    INSERT INTO materials (name, category, price, stock)
    VALUES
        ('Cement (50kg Bag)', 'Cement', 1200.00, 50),
        ('PVC Pipe (10ft)', 'Pipes', 350.00, 100),
        ('Wall Paint (1L)', 'Paint', 800.00, 30)
");
if (!$result) echo "Materials Insert Error: " . mysqli_error($conn) . "<br>";

$result = mysqli_query($conn, "
    INSERT INTO orders (customer_name, customer_phone, customer_address, material_id, quantity, status)
    VALUES 
        ('Ali Khan', '03001234567', '123 Model Town, Lahore', 1, 10, 'Pending'),
        ('Sara Malik', '03009876543', 'DHA Phase 4, Karachi', 2, 5, 'Accepted'),
        ('Usman Iqbal', '03001112222', 'Bahria Town, Islamabad', 3, 2, 'Shipped')
");
if (!$result) echo "Orders Insert Error: " . mysqli_error($conn) . "<br>";

$result = mysqli_query($conn, "
    INSERT INTO service_requests (service_id, customer_name, requested_time, status)
    VALUES 
        (1, 'Ayesha Noor', '2 PM - 4 PM', 'Pending'),
        (2, 'Hamza Sheikh', '10 AM - 12 PM', 'Accepted')
");
if (!$result) echo "Service Requests Insert Error: " . mysqli_error($conn) . "<br>";

echo "Dummy data inserted successfully.";



mysqli_close($conn);
?>
