<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require 'PHPMailer/PHPMailer/src/Exception.php';
require 'PHPMailer/PHPMailer/src/PHPMailer.php';
require 'PHPMailer/PHPMailer/src/SMTP.php';


// Instância da classe
$mail = new PHPMailer(true);
    try
    {
        // Configurações do servidor
        $mail->isSMTP();        //Devine o uso de SMTP no envio
        $mail->SMTPAuth = true; //Habilita a autenticação SMTP
        $destino = $_POST["email"];
        $destino = $_POST["nome"];
        $assunto =  $_POST["assunto"];
        $mensagem =  $_POST["mensagem"];

        $mail->Username   = 'movietag.pi@gmail.com';
        $mail->Password   = 'F1lminho';
        // Criptografia do envio SSL também é aceito
        $mail->SMTPSecure = 'tls';

        // Informações específicadas pelo Google
        $mail->Host = 'smtp.gmail.com';
        $mail->Port = 587;
        // Define o remetente
        $mail->setFrom('movietag.pi@gmail.com', 'MovieTag');
        // Define o destinatário
        $mail->addAddress($destino, 'Destinatário');
        // Conteúdo da mensagem
        $mail->isHTML(true);  // Seta o formato do e-mail para aceitar conteúdo HTML
        $mail->Subject = $assunto;
        $mail->Body    = '<p>Olá,</p>
            <p>Clique no link abaixo para redefinir sua senha:</p>
            <p>Se você não solicitou isso, ignore este email.</p>';

        $mail->AltBody = 'Clique no link abaixo para redefinir sua senha:';
        // Enviar
        $mail->send();
        echo 'A mensagem foi enviada!';
    }
    catch (Exception $e)
    {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }

?>