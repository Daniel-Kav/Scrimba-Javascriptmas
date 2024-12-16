<?php
session_start();
require_once 'config.php';
?>

<!DOCTYPE html>
<html>
<head>
    <title>Registration Form</title>
    <style>
        .container {
            max-width: 500px;
            margin: 50px auto;
            padding: 20px;
        }
        .form-group {
            margin-bottom: 15px;
        }
        input {
            width: 100%;
            padding: 8px;
            margin-top: 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Register</h2>
        <form id="registerForm">
            <div class="form-group">
                <label>Name:</label>
                <input type="text" name="name" required>
            </div>
            <div class="form-group">
                <label>Email:</label>
                <input type="email" name="email" required>
            </div>
            <div class="form-group">
                <label>Phone:</label>
                <input type="tel" name="phone" required>
            </div>
            <div class="form-group">
                <label>Password:</label>
                <input type="password" name="password" required>
            </div>
            <button type="submit">Register</button>
        </form>

        <div id="otpForm" style="display: none;">
            <h3>Enter OTP</h3>
            <div class="form-group">
                <input type="text" id="otp" maxlength="6" required>
            </div>
            <button onclick="verifyOTP()">Verify OTP</button>
        </div>
    </div>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script>
        $('#registerForm').on('submit', function(e) {
            e.preventDefault();
            $.ajax({
                url: 'send_otp.php',
                method: 'POST',
                data: $(this).serialize(),
                success: function(response) {
                    if(response.success) {
                        $('#registerForm').hide();
                        $('#otpForm').show();
                    } else {
                        alert(response.message);
                    }
                }
            });
        });

        function verifyOTP() {
            $.ajax({
                url: 'verify_otp.php',
                method: 'POST',
                data: {
                    otp: $('#otp').val()
                },
                success: function(response) {
                    if(response.success) {
                        alert('Registration successful!');
                        window.location.href = 'login.php';
                    } else {
                        alert(response.message);
                    }
                }
            });
        }
    </script>
</body>
</html> 