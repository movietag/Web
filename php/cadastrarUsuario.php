<?php

// Função para inserir um novo usuário no banco de dados.
function inserirUsuario($uUsuario, $uEmail, $uSenha, $imageBase64) {
    $sql = "INSERT INTO USUARIO (usuario, email, senha, pathImg) VALUES (:usuario, :email, :senha, :pathImg)";
    $stmt = Database::prepare($sql);
    $stmt->bindParam(':usuario', $uUsuario);
    $stmt->bindParam(':email', $uEmail);
    $stmt->bindParam(':senha', $uSenha);
    $pathImg = $imageBase64 ? $imageBase64 : null; // Define a imagem como null se não for enviada.
    $stmt->bindParam(':pathImg', $pathImg);
    return $stmt->execute(); // Executa a query e retorna o resultado.
}

try {
    // Inicia a sessão e importa as dependências necessárias para o funcionamento do script.
    session_start();
    require_once 'database.php';
    require_once 'jsonResponse.php';
    require_once 'funcoesCompartilhadas.php';

    // Tratamento e validação dos dados recebidos via POST.
    $uUsuario = filter_input(INPUT_POST, 'uUsuario', FILTER_SANITIZE_SPECIAL_CHARS); // Sanitiza o nome de usuário.
    $uEmail = filter_input(INPUT_POST, 'uEmail', FILTER_SANITIZE_EMAIL); // Sanitiza o e-mail.
    $uSenha = $_POST['uSenha'] ?? null; // Recebe a senha.
    $confirmSenha = $_POST['confirmSenha'] ?? null; // Recebe a confirmação da senha.

    // Verifica se os campos obrigatórios foram preenchidos.
    if (empty($uUsuario)) {
        jsonResponse(false, 'O campo Usuário é obrigatório.');
        exit;
    }

    if (!$uEmail || !filter_var($uEmail, FILTER_VALIDATE_EMAIL)) {
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

    // Verifica se as senhas coincidem.
    if ($uSenha !== $confirmSenha) {
        jsonResponse(false, 'As senhas não coincidem.');
        exit;
    }

    // Criptografa a senha antes de armazená-la no banco de dados.
    $uSenha = password_hash($uSenha, PASSWORD_DEFAULT);

    // Processa a imagem enviada pelo usuário (se houver).
    if (isset($_FILES['uFile']) && $_FILES['uFile']['error'] == 0) {
        // Lê o conteúdo do arquivo enviado e o converte para Base64.
        $imageData = file_get_contents($_FILES['uFile']['tmp_name']);
        $imageBase64 = base64_encode($imageData);
    } else {
        $imageBase64 = null; // Define como null caso nenhuma imagem seja enviada.
    }

    // Verifica se o usuário ou e-mail já estão cadastrados no banco de dados.
    if (verificarUsuarioExiste($uUsuario, $uEmail)) {
        jsonResponse(false, 'Usuário ou E-mail já cadastrado.');
        exit;
    }

    // Insere o novo usuário no banco de dados.
    if (inserirUsuario($uUsuario, $uEmail, $uSenha, $imageBase64)) {
        $_SESSION['status'] = true; // Define o status da sessão como logado.

        // Busca os dados do usuário recém-cadastrado.
        $rows = buscaUsuario($uUsuario, $uEmail);

        // Salva os dados do usuário na sessão.
        salvarDadosSession($rows);

        // Retorna uma resposta de sucesso.
        jsonResponse(true, 'Usuário cadastrado com sucesso!');
    } else {
        // Retorna uma mensagem de erro se a inserção falhar.
        jsonResponse(false, 'Erro ao inserir usuário.');
    }
} catch (PDOException $e) {
    // Captura e retorna erros relacionados ao banco de dados.
    jsonResponse(false, 'Erro no servidor: ' . $e->getMessage());
}
