<?php
// Iniciar Sessão
session_start();
require_once 'database.php'; // Arquivo de conexão ao banco de dados
require_once 'jsonResponse.php'; // Função utilitária para resposta em JSON
require_once 'funcoesCompartilhadas.php'; // Funções auxiliares

header('Content-Type: application/json');

try {
    // Tratamento dos inputs
    $uUsuarioEmail = $_POST['uUsuario-Email'] ?? null;
    $uUsuarioEmail = htmlspecialchars($uUsuarioEmail, ENT_QUOTES, 'UTF-8');
    $uUsuarioEmail = filter_var($uUsuarioEmail, FILTER_SANITIZE_STRING);

    $uSenha = $_POST['uSenha'] ?? null;

    // Verifica se os campos não são nulos
    if (!empty($uUsuarioEmail) && !empty($uSenha)) {
        // Verifica se o usuário existe
        if (verificarUsuarioExiste($uUsuarioEmail, $uUsuarioEmail)) {
            $rows = buscaUsuario($uUsuarioEmail, $uUsuarioEmail);
            $senhaBanco = $rows['senha'] ?? null;

            // Valida a senha usando password_verify
            if ($senhaBanco && password_verify($uSenha, $senhaBanco)) {
                // Sessão do usuário
                $_SESSION['status'] = true;
                salvarDadosSession($rows); // Salvar informações na sessão
                jsonResponse(true, 'Login realizado com sucesso!');
            } else {
                jsonResponse(false, 'Usuário/Email ou senha incorretos.');
            }
        } else {
            jsonResponse(false, 'Conta não encontrada.');
        }
    } else {
        jsonResponse(false, 'Preencha todos os campos.');
    }
} catch (PDOException $e) {
    jsonResponse(false, 'Erro no servidor: ' . $e->getMessage());
}
