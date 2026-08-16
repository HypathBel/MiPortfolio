<?php
/**
 * Contact form handler for MiPortfolio
 * Returns the exact string "OK" on success (expected by the front-end).
 */
error_reporting(0);
ini_set('display_errors', '0');

header('Content-Type: text/plain; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit('Method not allowed');
}

function clean_input($data)
{
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data, ENT_QUOTES, 'UTF-8');
    return $data;
}

$name    = isset($_POST['name'])    ? clean_input($_POST['name'])    : '';
$email   = isset($_POST['email'])   ? clean_input($_POST['email'])   : '';
$subject = isset($_POST['subject']) ? clean_input($_POST['subject']) : '';
$message = isset($_POST['message']) ? clean_input($_POST['message']) : '';

$errors = array();

if (strlen($name) < 2) {
    $errors[] = 'Please enter a valid name.';
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Please enter a valid email address.';
}

if (strlen($subject) < 2) {
    $errors[] = 'Please enter a subject.';
}

if (strlen($message) < 10) {
    $errors[] = 'Please write a message (at least 10 characters).';
}

if (!empty($errors)) {
    http_response_code(400);
    exit(implode(' ', $errors));
}

$to      = 'isabelvillegas915@gmail.com';
$mailSubject = 'Portfolio contact: ' . $subject . ' (from ' . $name . ')';

$body  = "Name: " . $name . "\n";
$body .= "Email: " . $email . "\n";
$body .= "Subject: " . $subject . "\n\n";
$body .= $message . "\n";

$headers  = "From: " . $email . "\r\n";
$headers .= "Reply-To: " . $email . "\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";

if (mail($to, $mailSubject, $body, $headers)) {
    echo 'OK';
} else {
    http_response_code(500);
    exit('Sorry, the message could not be sent. Please try again or email me directly.');
}