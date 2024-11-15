<?php
session_start();
header('Content-Type: application/json');
require_once 'database.php';

// Função para buscar tags associadas a um ID de produção
function getTagsPorProducao($idProd) {
    $sql = "SELECT T.id, T.nome 
            FROM TAG T 
            INNER JOIN PRODUCAO_TAG PT ON T.id = PT.idTag 
            WHERE PT.idProd = :idProd";
    $stmt = Database::prepare($sql);
    $stmt->bindParam(':idProd', $idProd, PDO::PARAM_INT);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

try {
    if (!isset($_GET['idProd']) || empty($_GET['idProd'])) {
        echo json_encode(['success' => false, 'message' => 'ID da produção não fornecido.']);
        exit;
    }

    // Verifica se o usuário está logado
    $idProd = $_GET['idProd'];

    // Busca as tags associadas à produção
    $tags = getTagsPorProducao($idProd);
    
    echo json_encode(['success' => true, 'tags' => $tags]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Erro: ' . $e->getMessage()]);
}
