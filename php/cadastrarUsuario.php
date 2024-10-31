<?php
// Iniciar Sessão

session_start();

if (isset($_POST['btn-cadastrar'])):
    // Tratamento dos inputs
    $uUsuario = filter_input(INPUT_POST, 'uUsuario', FILTER_SANITIZE_SPECIAL_CHARS);
    $uEmail = filter_input(INPUT_POST, 'uEmail', FILTER_SANITIZE_EMAIL);
    $uSenha = filter_input(INPUT_POST, 'uSenha', FILTER_SANITIZE_SPECIAL_CHARS);
    $confirmSenha = filter_input(INPUT_POST, 'confirmSenha', FILTER_SANITIZE_SPECIAL_CHARS);

    // Hash da senha
    $uSenha = password_hash($uSenha, PASSWORD_DEFAULT);

    // Conexão
    require_once 'config.php';

    // Verificar se o usuário ou e-mail já existe
    $sql = "SELECT * FROM USUARIO WHERE usuario = '$uUsuario' OR email = '$uEmail'";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        $_SESSION['mensagem'] = "Nome de usuário ou e-mail já cadastrado!";
        header('Location: ./cadastro.php');
        exit;
    } else {
        // Inserir no banco de dados com pathImg nulo
        $sql = "INSERT INTO USUARIO (usuario, email, senha, pathImg) VALUES ('$uUsuario', '$uEmail', '$uSenha', NULL)";

        if (mysqli_query($conn, $sql)) {
            $_SESSION['mensagem'] = "Cadastro com sucesso!";
            $_SESSION['status'] = True;
            header('Location: /index.php');
        } else {
            $_SESSION['mensagem'] = "Erro ao cadastrar!";
            header('Location: /cadastro.php');
        }
    }
endif;
?>