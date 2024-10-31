<?php
session_start();

function verificaLogado() {
    if (isset($_SESSION['status'])) {
        return true; // O usuário está logado
    } else {
        return false; // O usuário não está logado
    }
}

// Retornando o resultado como JSON
header('Content-Type: application/json');
echo json_encode(['loggedIn' => verificaLogado()]);
?>
