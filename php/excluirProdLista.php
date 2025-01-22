<?php

header('Content-Type: application/json');
session_start();

require_once 'database.php';
require_once 'jsonResponse.php';

try {
    // Obtém os parâmetros diretamente da URL
    $idLista = $_GET['idLista'] ?? null;
    $idAPI = $_GET['idApi'] ?? null;

    if (!$idLista || !$idAPI) {
        jsonResponse(false, 'Parâmetros idLista e idProd são obrigatórios.');
    }

    // Obter o ID da produção no banco de dados
    $sql = "SELECT id FROM PRODUCAO WHERE idAPI = :idAPI";
    $stmt = Database::prepare($sql);
    $stmt->bindParam(':idAPI', $idAPI);
    $stmt->execute();
    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$row) {
        jsonResponse(false, 'Produção não encontrada no banco de dados.');
    }

    $idProd = $row['id'];

    // Remover a produção da lista
    $sql = "DELETE FROM PRODUCAO_LISTA WHERE idProd = :idProd AND idLista = :idLista";
    $stmt = Database::prepare($sql);
    $stmt->bindParam(':idProd', $idProd);
    $stmt->bindParam(':idLista', $idLista);

    if ($stmt->execute()) {
        jsonResponse(true, 'Produção removida com sucesso da lista.');
    } else {
        jsonResponse(false, 'Erro ao remover a produção da lista.');
    }
} catch (Exception $e) {
    error_log('Erro no script: ' . $e->getMessage());
    jsonResponse(false, 'Erro interno no servidor.');
}
