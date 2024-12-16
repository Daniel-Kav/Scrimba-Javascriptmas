<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $entered_otp = $_POST['otp'];

    // Check if OTP matches the one sent
    if (isset($_SESSION['otp']) && $_SESSION['otp'] == $entered_otp) {
        echo "Phone number verified successfully!";
        // Clear session
        session_unset();
        session_destroy();
    } else {
        echo "Invalid OTP. Please try again.";
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <title>Verify OTP</title>
</head>
<body>
    <h2>Verify OTP</h2>
    <form method="POST" action="verify-otp.php">
        <label for="otp">Enter the OTP sent to your phone:</label>
        <input type="text" name="otp" placeholder="123456" required>
        <button type="submit">Verify OTP</button>
    </form>
</body>
</html>
