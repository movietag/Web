<?php
require_once 'database.php';
require_once 'jsonResponse.php';
session_start();
header('Content-Type: application/json'); // Define o tipo de conteúdo como JSON

// Função para atualizar o nome da lista no banco de dados
function updateNomeLista($idLista, $novoNome) {
    $sql = "UPDATE LISTA SET nome = :novoNome WHERE id = :idLista";
    $stmt = Database::prepare($sql);
    $stmt->bindParam(':novoNome', $novoNome);
    $stmt->bindParam(':idLista', $idLista);
    return $stmt->execute();
}

try {
    // Obtém os parâmetros enviados via GET
    if (!isset($_GET['idLista']) || !isset($_GET['nome'])) {
        jsonResponse(false, 'Parâmetros insuficientes fornecidos.');
    }

    $idLista = $_GET['idLista'];
    $novoNome = $_GET['nome'];

    // Atualiza o nome da lista no banco de dados
    $resultado = updateNomeLista($idLista, $novoNome);

    if ($resultado) {
        jsonResponse(true, 'Nome da lista atualizado com sucesso!');
    } else {
        jsonResponse(false, 'Falha ao atualizar o nome da lista.');
    }
} catch (Exception $e) {
    jsonResponse(false, 'Erro: ' . $e->getMessage());
}