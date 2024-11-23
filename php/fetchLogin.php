<?php
require_once "verificaLogin.php";

// Retornando o resultado como JSON
header('Content-Type: application/json');
echo json_encode(['loggedIn' => verificaLogado()]);
