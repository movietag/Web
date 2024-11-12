<?php
// Iniciar Sessão
session_start();

if (isset($_POST['btn-Login'])):
    // Tratamento dos inputs
    $uUsuarioEmail = filter_var($_POST['uUsuario-Email'] ?? null, FILTER_SANITIZE_SPECIAL_CHARS);
    $uSenha = filter_var($_POST['uSenha'] ?? null, FILTER_SANITIZE_SPECIAL_CHARS);    

    // Conexão com PDO
    require_once 'database.php';

    try {
        // Consulta para verificar se o usuário ou e-mail existe
        $sql = "SELECT * FROM USUARIO WHERE usuario = :usuarioEmail OR email = :usuarioEmail";
        $stmt = Database::prepare($sql);
        $stmt->bindParam(':usuarioEmail', $uUsuarioEmail, PDO::PARAM_STR);
        $stmt->execute();

        // Verifica se algum resultado foi encontrado
        if ($stmt->rowCount() > 0) {
            $rows = $stmt->fetch(PDO::FETCH_ASSOC);
            $senhaBanco = $rows['senha'];

            // Verifica se a senha corresponde ao hash armazenado no banco de dados
            if (password_verify($uSenha, $senhaBanco)) {
                $_SESSION['status'] = true;
                $_SESSION['dados'] = [
                    "id" => $rows['id'],
                    "usuario" => $rows["usuario"],
                    "email" => $rows["email"],
                    "foto" => $rows['pathImg']
                ];
                header('Location: /Web/index.php'); // Ajuste o caminho conforme necessário
                exit;
            } else {
                $_SESSION['mensagem'] = "Usuário ou Senha incorreto.";
                header('Location: /Web/login.php');
                exit;
            }
        } else {
            $_SESSION['mensagem'] = "Não há nenhum usuário/email com esses dados.";
            header('Location: /Web/login.php');
            exit;
        }
    } catch (PDOException $e) {
        // Tratamento de erro na conexão ou execução da consulta
        $_SESSION['mensagem'] = "Erro ao conectar ao banco de dados: " . $e->getMessage();
        header('Location: /Web/login.php');
        exit;
    }

endif;

?>
