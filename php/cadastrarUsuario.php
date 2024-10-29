<?php
// Iniciar Sessão
session_start();

if (isset($_POST['btn-cadastrar'])):
    // Tratamento dos inputs
    $uUsuario = filter_input(INPUT_POST, 'uUsuario', FILTER_SANITIZE_SPECIAL_CHARS);
    $uEmail = filter_input(INPUT_POST, 'uEmail', FILTER_SANITIZE_EMAIL);
    $uSenha = filter_input(INPUT_POST, 'uSenha', FILTER_SANITIZE_SPECIAL_CHARS);
    $confirmSenha = filter_input(INPUT_POST, 'confirmSenha', FILTER_SANITIZE_SPECIAL_CHARS);

    // Verificação de confirmação de senha
    if ($uSenha !== $confirmSenha) {
        $_SESSION['mensagem'] = "As senhas não coincidem!";
        header('Location: ./cadastro.php');
        exit;
    }

    // Hash da senha
    $uSenha = password_hash($uSenha, PASSWORD_DEFAULT);

    // Conexão
    require_once 'config.php';

    // Inserir no banco de dados com pathImg nulo
    $sql = "INSERT INTO USUARIO (usuario, email, senha, pathImg) VALUES ('$uUsuario', '$uEmail', '$uSenha', NULL)";

    if (mysqli_query($connect, $sql)){
        $_SESSION['mensagem'] = "Cadastro com sucesso!";
        header('Location: ./index.php');
    } else {
        $_SESSION['mensagem'] = "Erro ao cadastrar!";
        header('Location: ./cadastro.php');
    }

endif;
?>
