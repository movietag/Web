<?php
// Iniciar Sessão
session_start();
if (isset($_POST['btn-Login'])):
    // Tratamento dos inputs
    $uUsuarioEmail = filter_input(INPUT_POST, 'uUsuario-Email', FILTER_SANITIZE_SPECIAL_CHARS);
    $uSenha = filter_input(INPUT_POST, 'uSenha', FILTER_SANITIZE_SPECIAL_CHARS);

    // Conexão
    require_once 'config.php';

    // Consulta para verificar se o usuário ou e-mail existe
    $sql = "SELECT * FROM USUARIO WHERE usuario = '$uUsuarioEmail' OR email = '$uUsuarioEmail'";
    $result = mysqli_query($conn, $sql);

    $_SESSION['result'] = $result;

    if (mysqli_num_rows($result) > 0) {
        $rows = mysqli_fetch_assoc($result);
        $senhaBanco = $rows['senha'];
        // Verifica se a senha corresponde ao hash armazenado no banco de dados
        if (password_verify($uSenha, $senhaBanco)) {
            $_SESSION['status'] = true;
            header('Location: /index.php');
            exit;
        } else {
            $_SESSION['mensagem'] = "Usuário ou Senha incorreto.";
            header('Location: /login.php');
            exit;
        }
    } else {
        $_SESSION['mensagem'] = "Não há nenhum usuário/email com esses dados.";
        header('Location: /login.php');
        exit;
    }

endif;
?>
