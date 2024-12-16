<?php
session_start();
require_once 'config.php';
require_once 'vendor/autoload.php';
use Twilio\Rest\Client;

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $conn->real_escape_string($_POST['name']);
    $email = $conn->real_escape_string($_POST['email']);
    $phone = $conn->real_escape_string($_POST['phone']);
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
    
    // Generate OTP
    $otp = sprintf("%06d", mt_rand(0, 999999));
    $otp_expiry = date('Y-m-d H:i:s', strtotime('+10 minutes'));
    
    // Save user data and OTP
    $sql = "INSERT INTO users (name, email, phone, password, otp, otp_expiry) 
            VALUES ('$name', '$email', '$phone', '$password', '$otp', '$otp_expiry')";
    
    if ($conn->query($sql)) {
        // Store user ID in session
        $_SESSION['user_id'] = $conn->insert_id;
        
        // Send OTP via Twilio
        try {
            $client = new Client(TWILIO_SID, TWILIO_TOKEN);
            $message = $client->messages->create(
                $phone,
                [
                    'from' => TWILIO_PHONE,
                    'body' => "Your OTP for registration is: $otp"
                ]
            );
            
            echo json_encode(['success' => true]);
        } catch (Exception $e) {
            echo json_encode(['success' => false, 'message' => 'Failed to send OTP']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Registration failed']);
    }
}
?> 