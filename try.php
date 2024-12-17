<?php

// Update the path below to your autoload.php,
// see https://getcomposer.org/doc/01-basic-usage.md
// require_once "vendor/autoload.php";

// use Twilio\Rest\Client;

// // Find your Account SID and Auth Token at twilio.com/console
// // and set the environment variables. See http://twil.io/secure
// $sid = "AC132d4e0fec806ff3d83895397913f314";
// $token = "8eb4ea6551346a783f319babd2275c56";
// $twilio = new Client($sid, $token);

// $verification = $twilio->verify->v2
//     ->services("VA5e092e676301c2185ea94deba9dd8d41")
//     ->verifications->create(
//         "+254768441549", // To
//         "sms" // Channel
//     );

// print $verification->sid;

// <?php
// Update the path below to your autoload.php,
// see https://getcomposer.org/doc/01-basic-usage.md
require_once 'vendor/autoload.php';
use Twilio\Rest\Client;

$sid    = "AC132d4e0fec806ff3d83895397913f314";
$token  = "8eb4ea6551346a783f319babd2275c56";
$twilio = new Client($sid, $token);

$verification_check = $twilio->verify->v2->services("VA5e092e676301c2185ea94deba9dd8d41")
                                   ->verificationChecks
                                   ->create([
                                                "to" => "+254768441549",
                                                "code" => "[Code]"
                                            ]
                                    );

print($verification_check->sid);
?>