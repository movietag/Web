<?php
// Função para enviar respostas JSON
function jsonResponse($success, $message) {
    echo json_encode(['success' => $success, 'message' => $message]);
    exit;
}