<?php
// Iniciar Sessão
session_start();
require_once 'database.php'; // Arquivo de conexão ao banco de dados
require_once 'jsonResponse.php'; // Função utilitária para resposta em JSON
require_once 'funcoesCompartilhadas.php'; // Funções auxiliares

header('Content-Type: application/json');

try {
    // Tratamento dos inputs
    $uUsuarioEmail = filter_var($_POST['uUsuario-Email'] ?? null, FILTER_SANITIZE_EMAIL);
    $uSenha = filter_var($_POST['uSenha'] ?? null, FILTER_SANITIZE_STRING);

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
