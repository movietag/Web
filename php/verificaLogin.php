<?php
session_start();

function verificaLogado() {
    if (isset($_SESSION['status'])) {
        return $_SESSION['status'];
        }
}

// Retornando o resultado como JSON
header('Content-Type: application/json');
echo json_encode(['loggedIn' => verificaLogado()]);
?>
