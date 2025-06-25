<?php
session_start();
header('Content-Type: application/json');

if (isset($_SESSION['user_id'])) {
    echo json_encode([
        'loggedIn' => true,
        'userName' => $_SESSION['user_name'],
        'role' => $_SESSION['user_role']
    ]);
} else {
    echo json_encode(['loggedIn' => false]);
}
?>
