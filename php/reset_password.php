<?php
include 'db_connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'];
    $new_password = password_hash($_POST['new_password'], PASSWORD_DEFAULT);

    $sql = "UPDATE users SET password = '$new_password' WHERE email = '$email'";
    if (mysqli_query($conn, $sql)) {
        echo "Password reset successful";
    } else {
        echo "Error: " . mysqli_error($conn);
    }
}
?>