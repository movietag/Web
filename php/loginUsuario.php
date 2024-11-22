<?php
// Iniciar Sessão
session_start();
require_once 'database.php';
require_once 'jsonResponse.php';
require_once 'funcoesCompartilhadas.php';

try {

    // Tratamento dos inputs
    $uUsuarioEmail = filter_var($_POST['uUsuario-Email'] ?? null, FILTER_SANITIZE_SPECIAL_CHARS);
    $uSenha = filter_var($_POST['uSenha'] ?? null, FILTER_SANITIZE_SPECIAL_CHARS);    
 
    // Verifica se algum resultado foi encontrado
    if (verificarUsuarioExiste($uUsuarioEmail, $uUsuarioEmail)) {
        $rows = buscaUsuario($uUsuarioEmail, $uUsuarioEmail);
        $senhaBanco = $rows['senha'];

        // Verifica se a senha corresponde ao hash armazenado no banco de dados
        if (password_verify($uSenha, $senhaBanco)) {
            $_SESSION['status'] = true;
            jsonResponse(true, 'Login realizado com sucesso!');
            salvarDadosSession($rows);
            exit;
        } else {
            jsonResponse(false, 'Usuário/Email ou Senha incorreto! ');
            exit;
        }
    } else {
        jsonResponse(false, 'Essa conta não existe!');
        exit;
    }
} catch (PDOException $e) {
    jsonResponse(false, 'Erro no servidor: ' . $e->getMessage());
}
