<?php
require_once 'HTTP/Request2.php';
$request = new HTTP_Request2();
$request->setUrl('https://kq6lqn.api.infobip.com/2fa/2/pin');
$request->setMethod(HTTP_Request2::METHOD_POST);
$request->setConfig(array(
    'follow_redirects' => TRUE
));
$request->setHeader(array(
    'Authorization' => 'App eea2bc427153e7ddcff15339c0475d5a-bb9dab2b-adfc-4fa2-a63f-97661cca651a',
    'Content-Type' => 'application/json',
    'Accept' => 'application/json'
));
$request->setBody('{"applicationId":"{{applicationId}}","messageId":"{{messageId}}","from":"447491163443","to":"254768441549"}');
try {
    $response = $request->send();
    if ($response->getStatus() == 200) {
        echo $response->getBody();
    }
    else {
        echo 'Unexpected HTTP status: ' . $response->getStatus() . ' ' .
        $response->getReasonPhrase();
    }
}
catch(HTTP_Request2_Exception $e) {
    echo 'Error: ' . $e->getMessage();
}