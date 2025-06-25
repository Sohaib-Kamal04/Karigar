<?php
$conn = mysqli_connect("localhost", "root", "", "karigar");
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$name = $_POST['name'] ?? 'Guest';
$phone = $_POST['phone'] ?? 'N/A';
$address = $_POST['location'];
$material_id = $_POST['material_id'];
$quantity = $_POST['quantity'];

$sql = "INSERT INTO orders (customer_name, customer_phone, customer_address, material_id, quantity)
        VALUES ('$name', '$phone', '$address', $material_id, $quantity)";

if (mysqli_query($conn, $sql)) {
    echo "success";
} else {
    echo "error: " . mysqli_error($conn);
}

mysqli_close($conn);
?>
