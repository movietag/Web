<?php

session_start();

function verificarUsuarioExiste($uUsuario, $uEmail){
    // Verificar se o usuário ou e-mail já existe
    $sql = "SELECT * FROM USUARIO WHERE usuario = :usuario OR email = :email";
    $stmt = Database::prepare($sql);
    $stmt->bindParam(':usuario', $uUsuario);
    $stmt->bindParam(':email', $uEmail);
    $stmt->execute();
    return $stmt->rowCount() > 0;
}

function buscaUsuario($uUsuario, $uEmail){
    // Buscar dados do usuário
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