<?php
session_start();
header('Content-Type: application/json');
require_once 'database.php';

function getProductionsByTag($tagId) {
    // Modificada para retornar apenas as tags específicas de cada produção
    $sql = "SELECT 
                P.*,
                GROUP_CONCAT(DISTINCT T.nome) as tag_names
            FROM PRODUCAO P 
            INNER JOIN PRODUCAO_TAG PT ON P.id = PT.idProd 
            INNER JOIN TAG T ON T.id = PT.idTag 
            WHERE EXISTS (
                SELECT 1 
                FROM PRODUCAO_TAG PT2 
                WHERE PT2.idProd = P.id 
                AND PT2.idTag = :tagId
            )
            GROUP BY P.id
            ORDER BY P.nomeProd";
    
    $stmt = Database::prepare($sql);
    $stmt->bindParam(':tagId', $tagId);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

try {
    if (!isset($_GET['tagId']) || empty($_GET['tagId'])) {
        echo json_encode(['success' => false, 'message' => 'ID da tag não fornecido.']);
        exit;
    }

    $tagId = $_GET['tagId'];
    $productions = getProductionsByTag($tagId);
    
    // Converter as tags de string para array
    foreach ($productions as &$production) {
        $production['tags'] = $production['tag_names'] ? explode(',', $production['tag_names']) : [];
        unset($production['tag_names']); // Remove o campo original
    }
    
    echo json_encode([
        'success' => true,
        'productions' => $productions
    ]);
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Erro: ' . $e->getMessage()
    ]);
}