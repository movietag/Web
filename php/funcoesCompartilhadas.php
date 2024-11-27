<?php

session_start(); 
// Inicia a sessão para permitir o gerenciamento de dados do usuário.

function verificarUsuarioExiste($uUsuario, $uEmail) {
    $sql = "SELECT * FROM USUARIO WHERE usuario = :usuario OR email = :email";
    // Consulta para verificar se o nome de usuário ou e-mail já estão cadastrados.
    
    $stmt = Database::prepare($sql);
    $stmt->bindParam(':usuario', $uUsuario);
    $stmt->bindParam(':email', $uEmail);
    $stmt->execute();
    return $stmt->rowCount() > 0; // Retorna verdadeiro se um registro correspondente for encontrado.
}

function buscaUsuario($uUsuario, $uEmail) {
    $sql = "SELECT * FROM USUARIO WHERE usuario = :usuario OR email = :email";
    $stmt = Database::prepare($sql);
    $stmt->bindParam(':usuario', $uUsuario);
    $stmt->bindParam(':email', $uEmail);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC); // Retorna os dados do usuário, se encontrado.
}
