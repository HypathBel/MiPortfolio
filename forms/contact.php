<?php
//activar visualizacion errores
error_reporting(-1);
ini_set('display_errors', 'On');
set_error_handler("var_dump");

$name = $_POST['name'];
$email = $_POST['email'];
$subject = $_POST['subject'];
$message = $_POST['message'];

$headers = "From: isabelvillegas915@gmail.com\r\n";
$headers .= "Reply-To: $from\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=utf-8\r\n";

if(mail($email, $name, $subject, $message, $headers)){
	mail($email, $name, $subject, $message, $headers);
	echo "email correctly sent";
} else{
		$errorMessage = error_get_last()['message'];
		echo $errorMessage;
}

//mail($correo_destino, $nombre, $asunto, $mensaje);

?>
