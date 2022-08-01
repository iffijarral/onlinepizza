<?php
require 'Config.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require_once(APP_ROOT.'app/backend/core/Jwt.php');
function escape($string)
{
    return htmlentities($string, ENT_QUOTES, 'UTF-8');
}

function appName()
{
    echo Config::get('app/name');
}

function serverKey()
{
    return Config::get('app/serverKey');
}

function generateToken($userId)
{
    $serverKey  = serverKey();

    // create a token
    $payloadArray = array();
    $payloadArray['userId'] = $userId;

    $issuedAt   = new DateTimeImmutable();
    $exp     = $issuedAt->modify('+15 minutes')->getTimestamp();
    $nbf = $issuedAt->getTimestamp();

    if (isset($nbf)) {$payloadArray['nbf'] = $nbf;}
    if (isset($exp)) {$payloadArray['exp'] = $exp;}
    $token = JWT::encode($payloadArray, $serverKey, 'HS256');

    return $token;
//     // return to caller
//     $returnArray = array('token' => $token);
//     $jsonEncodedReturnArray = json_encode($returnArray, JSON_PRETTY_PRINT);
//     return $jsonEncodedReturnArray;
}

function decodeToken($token)
{
    $serverKey  = serverKey();
    try {
        $payload = JWT::decode($token, $serverKey, array('HS256'));
//         $returnArray = array('userId' => $payload->userId);
//         if (isset($payload->exp)) {
//             $returnArray['exp'] = date(DateTime::ISO8601, $payload->exp);;
//         }

        return $payload;
    }
    catch(Exception $e) {
        throw new Exception('Exception'.$e->getMessage());
    }
}
function sendMail ($to, $subject, $body)
{

    $mail = new PHPMailer;

    $mail->isSMTP();                                      // Set mailer to use SMTP
    $mail->Host = 'send.one.com';  // Specify main and backup SMTP servers
    $mail->SMTPAuth = true;                               // Enable SMTP authentication
    $mail->Username = 'no-reply@vitaliapizza.dk';                 // SMTP username
    $mail->Password = '240765momo';                           // SMTP password
    $mail->SMTPSecure = 'tls';                            // Enable encryption, 'ssl' also accepted

    $mail->From = 'no-reply@vitaliapizza.dk';
    $mail->FromName = 'Vitalia Pizza';
    $mail->addAddress($to);     // Add a recipient


    $mail->WordWrap = 50;                                 // Set word wrap to 50 characters
    $mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
    $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
    $mail->isHTML(true);                                  // Set email format to HTML

    $mail->Subject = $subject;
    $mail->Body    = $body;
    $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

    if(!$mail->send()) {
        //echo 'Message could not be sent.';
        throw new Exception('Mailer Error: ' . $mail->ErrorInfo);

    } else {
        return true;
    }

}