<?php
session_start();
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $phone = $_POST['phone'];
    
    // Generate a 6-digit OTP
    $otp = sprintf("%06d", mt_rand(0, 999999));
    
    // Store OTP in session
    $_SESSION['otp'] = $otp;
    $_SESSION['phone'] = $phone;
    $_SESSION['otp_time'] = time();
    
    // Simulate Twilio SMS sending
    echo json_encode([
        'success' => true,
        'message' => 'OTP sent successfully',
        'otp' => $otp // In real production, never send OTP back to client!
    ]);
}
?> 