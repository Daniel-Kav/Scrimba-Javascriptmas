<?php
require_once 'vendor/autoload.php'; // Include Twilio SDK

use Twilio\Rest\Client;

session_start(); // Start session to store OTP and phone number

// Twilio credentials (load from environment variables for security)
$account_sid = getenv('TWILIO_ACCOUNT_SID') ?: 'your_account_sid_here';
$auth_token = getenv('TWILIO_AUTH_TOKEN') ?: 'your_auth_token_here';
$twilio_number = getenv('TWILIO_PHONE_NUMBER') ?: '+254768441549';

if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $user_number = $_POST['phone_number']; // Retrieve phone number from form input

    // Validate phone number input
    if (empty($user_number)) {
        die("Phone number is required!");
    }

    try {
        // Generate random 6-digit OTP
        $otp = rand(100000, 999999);
        
        // Save OTP and phone number in session
        $_SESSION['otp'] = $otp;
        $_SESSION['user_number'] = $user_number;

        // Send SMS using Twilio
        $client = new Client($account_sid, $auth_token);
        $message = $client->messages->create(
            $user_number, // User's phone number
            [
                'from' => $twilio_number,
                'body' => "Your verification code is: $otp"
            ]
        );

        echo "OTP sent successfully!";
    } catch (Exception $e) {
        echo "Error: " . $e->getMessage();
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <title>Send OTP</title>
</head>
<body>
    <h2>Phone Number Verification</h2>
    <form method="POST" action="send-otp.php">
        <label for="phone_number">Enter your phone number:</label>
        <input type="text" name="phone_number" placeholder="+254XXXXXXXXX" required>
        <button type="submit">Send OTP</button>
    </form>
</body>
</html>
