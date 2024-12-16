<?php
session_start();
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $entered_otp = $_POST['otp'];
    
    // Check if OTP exists and hasn't expired (10 minutes validity)
    if (!isset($_SESSION['otp']) || !isset($_SESSION['otp_time'])) {
        echo json_encode(['success' => false, 'message' => 'No OTP request found']);
        exit;
    }
    
    // Check if OTP has expired (10 minutes validity)
    if (time() - $_SESSION['otp_time'] > 600) {
        echo json_encode(['success' => false, 'message' => 'OTP has expired']);
        exit;
    }
    
    // Verify OTP
    if ($entered_otp === $_SESSION['otp']) {
        // Clear the OTP from session
        unset($_SESSION['otp']);
        unset($_SESSION['otp_time']);
        
        echo json_encode(['success' => true, 'message' => 'Phone verified successfully']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid OTP']);
    }
}
?> 