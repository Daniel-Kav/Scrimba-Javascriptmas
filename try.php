<?php

// Update the path below to your autoload.php,
// see https://getcomposer.org/doc/01-basic-usage.md
// require_once "vendor/autoload.php";

// use Twilio\Rest\Client;

// // Find your Account SID and Auth Token at twilio.com/console
// // and set the environment variables. See http://twil.io/secure
// $sid = "SID";
// $token = "TOKEN";
// $twilio = new Client($sid, $token);

// $verification = $twilio->verify->v2
//     ->services("VA")
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

$sid    = "sid";
$token  = "token";
$twilio = new Client($sid, $token);

$verification_check = $twilio->verify->v2->services("VAA")
                                   ->verificationChecks
                                   ->create([
                                                "to" => "+254768441549",
                                                "code" => "35672"
                                                
                                            ]
                                    );

print($verification_check->sid);
?>