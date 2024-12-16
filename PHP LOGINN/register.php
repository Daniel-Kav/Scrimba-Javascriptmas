<?php
session_start();
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
        <h2>Phone Verification</h2>
        <form id="phoneForm">
            <div class="form-group">
                <label>Phone Number:</label>
                <input type="tel" name="phone" required>
            </div>
            <button type="submit">Send OTP</button>
        </form>

        <div id="otpForm" style="display: none;">
            <h3>Enter OTP</h3>
            <p>Simulated SMS sent to: <span id="phoneDisplay"></span></p>
            <div class="form-group">
                <input type="text" id="otp" maxlength="6" required>
            </div>
            <button onclick="verifyOTP()">Verify OTP</button>
        </div>

        <div id="successMessage" style="display: none;">
            <h3 style="color: green;">Phone Verified Successfully! ✓</h3>
        </div>
    </div>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script>
        $('#phoneForm').on('submit', function(e) {
            e.preventDefault();
            const phone = $('input[name="phone"]').val();
            
            $.ajax({
                url: 'send_otp.php',
                method: 'POST',
                data: { phone: phone },
                success: function(response) {
                    if(response.success) {
                        $('#phoneForm').hide();
                        $('#phoneDisplay').text(phone);
                        $('#otpForm').show();
                        alert('Simulated SMS: Your OTP is: ' + response.otp);
                    } else {
                        alert(response.message);
                    }
                }
            });
        });

        function verifyOTP() {
            const enteredOTP = $('#otp').val();
            
            $.ajax({
                url: 'verify_otp.php',
                method: 'POST',
                data: { otp: enteredOTP },
                success: function(response) {
                    if(response.success) {
                        $('#otpForm').hide();
                        $('#successMessage').show();
                    } else {
                        alert(response.message);
                    }
                }
            });
        }
    </script>
</body>
</html> 