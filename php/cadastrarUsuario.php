<?php

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

try {

    // Iniciar Sessão
    session_start();
    require_once 'database.php';
    require_once 'jsonResponse.php';
    require_once 'funcoesCompartilhadas.php';

    // Tratamento e validação dos inputs
    $uUsuario = filter_input(INPUT_POST, 'uUsuario', FILTER_SANITIZE_SPECIAL_CHARS);
    $uEmail = filter_input(INPUT_POST, 'uEmail', FILTER_VALIDATE_EMAIL); // Validação direta para e-mail
    $uSenha = filter_input(INPUT_POST, 'uSenha', FILTER_SANITIZE_SPECIAL_CHARS);
    $confirmSenha = filter_input(INPUT_POST, 'confirmSenha', FILTER_SANITIZE_SPECIAL_CHARS);

    // Verifica se algum campo obrigatório está vazio
    if (empty($uUsuario)) {
        jsonResponse(false, 'O campo Usuário é obrigatório.');
        exit;
    }

    if (!$uEmail) { // Se a validação do e-mail falhar, $uEmail será false
        jsonResponse(false, 'O campo E-mail é obrigatório e deve ser válido.');
        exit;
    }

    if (empty($uSenha)) {
        jsonResponse(false, 'O campo Senha é obrigatório.');
        exit;
    }

    if (empty($confirmSenha)) {
        jsonResponse(false, 'O campo Confirmar Senha é obrigatório.');
        exit;
    }

    // Verifica se as senhas coincidem
    if ($uSenha !== $confirmSenha) {
        jsonResponse(false, 'As senhas não coincidem.');
        exit;
    }

    // Criptografa a senha
    $uSenha = password_hash($uSenha, PASSWORD_DEFAULT);

    // Processamento da imagem
    if (isset($_FILES['uFile']) && $_FILES['uFile']['error'] == 0) {
        // Obter o conteúdo do arquivo e converter para Base64
        $imageData = file_get_contents($_FILES['uFile']['tmp_name']);
        $imageBase64 = base64_encode($imageData);
    } else {
        $imageBase64 = null; // Define como null caso nenhuma imagem seja enviada
    }

    // Verifica se o usuário ou e-mail já existem
    if (verificarUsuarioExiste($uUsuario, $uEmail)) {
        jsonResponse(false, 'Usuário ou E-mail já cadastrado.');
        exit;
    }

    // Insere o usuário no banco de dados
    if (inserirUsuario($uUsuario, $uEmail, $uSenha, $imageBase64)) {
        $_SESSION['status'] = true;
        $rows = buscaUsuario($uUsuario, $uEmail);

        salvarDadosSession($rows);
        jsonResponse(true, 'Usuário cadastrado com sucesso!');
    } else {
        jsonResponse(false, 'Erro ao inserir usuário.');
    }
} catch (PDOException $e) {
    jsonResponse(false, 'Erro no servidor: ' . $e->getMessage());
}
