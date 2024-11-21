<?php
// Iniciar Sessão
session_start();
require_once 'database.php';
require_once 'jsonResponse.php';

function verificarUsuarioExiste($uUsuario, $uEmail){
    // Verificar se o usuário ou e-mail já existe
    $sql = "SELECT * FROM USUARIO WHERE usuario = :usuario OR email = :email";
    $stmt = Database::prepare($sql);
    $stmt->bindParam(':usuario', $uUsuario);
    $stmt->bindParam(':email', $uEmail);
    $stmt->execute();
    return $stmt->rowCount() > 0;
}

function inserirUsuario($uUsuario, $uEmail, $uSenha, $imageBase64){
    $sql = "INSERT INTO USUARIO (usuario, email, senha, pathImg) VALUES (:usuario, :email, :senha, :pathImg)";
    $stmt = Database::prepare($sql);
    $stmt->bindParam(':usuario', $uUsuario);
    $stmt->bindParam(':email', $uEmail);
    $stmt->bindParam(':senha', $uSenha);
    $pathImg = $imageBase64 ? $imageBase64 : null;
    $stmt->bindParam(':pathImg', $pathImg);
    return $stmt->execute();
}

function buscaUsuario($uUsuario, $uEmail){
    // Buscar dados do usuário recém cadastrado
    $sql = "SELECT * FROM USUARIO WHERE usuario = :usuario OR email = :email";
    $stmt = Database::prepare($sql);
    $stmt->bindParam(':usuario', $uUsuario);
    $stmt->bindParam(':email', $uEmail);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
}

function salvarDadosSession($rows){
    $_SESSION['dados'] = array(
        "id" => $rows['id'],
        "usuario" => $rows["usuario"],
        "email" => $rows["email"],
        "foto" => $rows['pathImg']
    );
}

try{
    // Tratamento dos inputs
    $uUsuario = filter_input(INPUT_POST, 'uUsuario', FILTER_SANITIZE_SPECIAL_CHARS);
    $uEmail = filter_input(INPUT_POST, 'uEmail', FILTER_SANITIZE_EMAIL);
    $uSenha = filter_input(INPUT_POST, 'uSenha', FILTER_SANITIZE_SPECIAL_CHARS);
    $confirmSenha = filter_input(INPUT_POST, 'confirmSenha', FILTER_SANITIZE_SPECIAL_CHARS);

    // Processamento da imagem
    if (isset($_FILES['uFile']) && $_FILES['uFile']['error'] == 0) {
        // Obter o conteúdo do arquivo e converter para Base64
        $imageData = file_get_contents($_FILES['uFile']['tmp_name']);
        $imageBase64 = base64_encode($imageData);
    }

    if ($uSenha == $confirmSenha){
        $uSenha = password_hash($uSenha, PASSWORD_DEFAULT);
    } else{
        jsonResponse(false, 'As senhas não coincidem!');
        exit;
    }

    if (verificarUsuarioExiste($uUsuario, $uEmail)) {
        jsonResponse(false, 'Usuário/Email já cadastrado!');
        exit;
    } else {
        if (inserirUsuario($uUsuario, $uEmail, $uSenha, $imageBase64)) {
            $_SESSION['status'] = true;
            $rows = buscaUsuario($uUsuario, $uEmail);

            salvarDadosSession($rows);
            jsonResponse(true, 'Usuário cadastrado com sucesso!');
        } else {
            jsonResponse(false, 'Erro ao inserir usuário');
        }
    }
} catch (PDOException $e) {
    jsonResponse(false, 'Error: ' . $e->getMessage());
}