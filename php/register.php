<?php
session_start();
header('Content-Type: application/json');

include 'db_connect.php';

$name = isset($_POST['name']) ? mysqli_real_escape_string($conn, $_POST['name']) : '';
$email = isset($_POST['email']) ? mysqli_real_escape_string($conn, $_POST['email']) : '';
$password = $_POST['password'] ?? '';
$role = isset($_POST['role']) ? mysqli_real_escape_string($conn, $_POST['role']) : '';

if (empty($name) || empty($email) || empty($password) || empty($role)) {
    echo json_encode(['error' => 'All fields required']);
    exit;
}


$query = "SELECT id FROM users WHERE email='$email' LIMIT 1";
$result = mysqli_query($conn, $query);
if (mysqli_num_rows($result) > 0) {
    echo json_encode(['error' => 'Email already registered']);
    exit;
}


$password_hash = password_hash($password, PASSWORD_DEFAULT);


$query = "INSERT INTO users (name, email, password, role) VALUES ('$name', '$email', '$password_hash', '$role')";
if (mysqli_query($conn, $query)) {
    echo json_encode(['success' => 'Registration successful']);
} else {
    echo json_encode(['error' => 'Registration failed: ' . mysqli_error($conn)]);
}

mysqli_close($conn);
?>