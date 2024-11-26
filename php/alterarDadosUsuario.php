<?php
session_start();

if (isset($_POST['btn-Atualizar'])):
    // Tratamento dos inputs
    $uUsuario = filter_input(INPUT_POST, 'uUsuario', FILTER_SANITIZE_SPECIAL_CHARS);
    $uEmail = filter_input(INPUT_POST, 'uEmail', FILTER_SANITIZE_EMAIL);
    $uSenha = filter_input(INPUT_POST, 'uSenha', FILTER_SANITIZE_SPECIAL_CHARS);
    $confirmSenha = filter_input(INPUT_POST, 'confirmSenha', FILTER_SANITIZE_SPECIAL_CHARS);
    $userId = $_SESSION['dados']['id'];

    // Processamento da imagem

    if (isset($_FILES['uFile']) && $_FILES['uFile']['error'] == 0) {
        $imageData = file_get_contents($_FILES['uFile']['tmp_name']);
        $imageBase64 = base64_encode($imageData); // Codifica a imagem em base64
    } else {
        $imageBase64 = null; 
    }

    // Criptografar senha se ela for atualizada
    $uSenha = !empty($uSenha) ? password_hash($uSenha, PASSWORD_DEFAULT) : null;

    // Conexão
    require_once 'database.php';

    try {
        // Construir a query SQL
        $sql = "UPDATE USUARIO SET usuario = :usuario, email = :email";
        
        // Condicionalmente incluir senha e imagem
        if ($uSenha) {
            $sql .= ", senha = :senha";
        }
        if ($imageBase64) {
            $sql .= ", pathImg = :pathImg";
        }
        $sql .= " WHERE id = :id";

        // Preparar a declaração SQL
        $stmt = Database::prepare($sql);
        $stmt->bindParam(':usuario', $uUsuario);
        $stmt->bindParam(':email', $uEmail);
        $stmt->bindParam(':id', $userId);

        // Bind condicionalmente a senha e a imagem
        if ($uSenha) {
            $stmt->bindParam(':senha', $uSenha);
        }
        if ($imageBase64) {
            $stmt->bindParam(':pathImg', $imageBase64);
        }

        // Executar a atualização
        if ($stmt->execute()) {

            // Atualizar dados na sessão
            $_SESSION['dados']['usuario'] = $uUsuario;
            $_SESSION['dados']['email'] = $uEmail;
            if ($imageBase64) {
                $_SESSION['dados']['foto'] = $imageBase64; // Atualiza a imagem na sessão
            }
            header('Location: /Web/perfilUsuario.php');
        } else {
            $_SESSION['mensagem'] = "Erro ao atualizar!";
            header('Location: /Web/editarPerfil.php');
        }
    } catch (PDOException $e) {
        $_SESSION['mensagem'] = "Erro ao conectar ao banco de dados: " . $e->getMessage();
        header('Location: /Web/editarPerfil.php');
    }
endif;
?>
