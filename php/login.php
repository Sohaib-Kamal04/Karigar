<?php
session_start();
header('Content-Type: application/json');

$conn = mysqli_connect('localhost', 'root', '', 'Karigar');
if (!$conn) {
    http_response_code(500); 
    echo json_encode(['error' => 'Database connection failed']);
    exit;
}

$email = $_POST['email'] ?? '';
$password = $_POST['password'] ?? '';

if (empty($email) || empty($password)) {
    http_response_code(400); 
    echo json_encode(['error' => 'Email and password required']);
    exit;
}

$stmt = mysqli_prepare($conn, "SELECT id, name, password, role FROM users WHERE email=? LIMIT 1");
if (!$stmt) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to prepare statement']);
    exit;
}

mysqli_stmt_bind_param($stmt, 's', $email);
mysqli_stmt_execute($stmt);
mysqli_stmt_store_result($stmt);

if (mysqli_stmt_num_rows($stmt) === 0) {
    http_response_code(401); 
    echo json_encode(['error' => 'Invalid email or password']);
    exit;
}

mysqli_stmt_bind_result($stmt, $id, $name, $password_hash, $role);
mysqli_stmt_fetch($stmt);

if (!password_verify($password, $password_hash)) {
    http_response_code(401); 
    echo json_encode(['error' => 'Invalid email or password']);
    exit;
}

$_SESSION['user_id'] = $id;
$_SESSION['user_name'] = $name;
$_SESSION['user_role'] = $role;

echo json_encode([
    'success' => true,
    'name' => $name,
    'role' => $role
]);

mysqli_stmt_close($stmt);
mysqli_close($conn);
?>
