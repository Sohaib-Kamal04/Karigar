<?php
header('Content-Type: application/json');

$server = "localhost";
$username = "root";
$password = "";
$database = "karigar";

$conn = mysqli_connect($server, $username, $password, $database);

if (!$conn) {
    die(json_encode(["status" => "error", "message" => "Database connection failed: " . mysqli_connect_error()]));
}

$service_id = isset($_POST['service_id']) ? intval($_POST['service_id']) : 0;
$customer_name = isset($_POST['customer_name']) ? trim($_POST['customer_name']) : '';
$requested_time = isset($_POST['requested_time']) ? trim($_POST['requested_time']) : '';

if ($service_id <= 0 || empty($customer_name) || empty($requested_time)) {
    die(json_encode(["status" => "error", "message" => "Missing or invalid input fields"]));
}

$check = mysqli_query($conn, "SELECT id FROM services WHERE id = $service_id");

if (!$check) {
    die(json_encode(["status" => "error", "message" => "Service lookup failed: " . mysqli_error($conn)]));
}

if (mysqli_num_rows($check) === 0) {
    die(json_encode(["status" => "error", "message" => "Invalid service_id: $service_id"]));
}

$stmt = mysqli_prepare($conn, "
    INSERT INTO service_requests (service_id, customer_name, requested_time, status)
    VALUES (?, ?, ?, 'Pending')
");

if (!$stmt) {
    die(json_encode(["status" => "error", "message" => "Prepare failed: " . mysqli_error($conn)]));
}

mysqli_stmt_bind_param($stmt, "iss", $service_id, $customer_name, $requested_time);

if (mysqli_stmt_execute($stmt)) {
    echo json_encode(["status" => "success", "message" => "Service booked successfully."]);
} else {
    echo json_encode(["status" => "error", "message" => "Booking failed: " . mysqli_stmt_error($stmt)]);
}

mysqli_stmt_close($stmt);
mysqli_close($conn);
?>
