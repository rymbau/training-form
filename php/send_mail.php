<?php
include('vendor/autoload.php');

$mail = new PHPMailer;

$mail->isSMTP();
$mail->Host = $_SERVER['SMTP_HOST'];
$mail->SMTPAuth = true;
$mail->Username = $_SERVER['SMTP_USERNAME'];
$mail->Password = $_SERVER['SMTP_PASSWORD'];
$mail->SMTPSecure = 'ssl';
$mail->Port = 465;
$mail->Timeout = 10;

$email_from = "trainingform@glicer.com";
$pseudo_from = "student";

$mail->setFrom($email_from, $pseudo_from);
$mail->addAddress('emmanuel.roecker@glicer.com', 'Emmanuel ROECKER');
$mail->addAddress('rym.bouchagour@glicer.com','Rym BOUCHAGOUR');

$mail->isHTML(true);

$mail->Subject =  "Retour Questionnaire - Evaluation Formateur";

$email_body = "";
while(list($Key,$val) = each($_POST)){
    $email_body .= "$val;";
}

$mail->Body    = $email_body;

if(!$mail->send()) {
    echo 'Impossible d\'envoyer le message.';
} else {
    echo 'Le message a bien été envoyé. ';
}
