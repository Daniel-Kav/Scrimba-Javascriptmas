<?php
session_start();
require_once 'config.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!isset($_SESSION['user_id'])) {
        echo json_encode(['success' => false, 'message' => 'Invalid session']);
        exit;
    }

    $user_id = $_SESSION['user_id'];
    $otp = $conn->real_escape_string($_POST['otp']);
    
    $sql = "SELECT * FROM users WHERE id = '$user_id' AND otp = '$otp' AND otp_expiry > NOW()";
    $result = $conn->query($sql);
    
    if ($result->num_rows > 0) {
        // Update user as verified
        $conn->query("UPDATE users SET is_verified = 1, otp = NULL WHERE id = '$user_id'");
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid or expired OTP']);
    }
}
?> 