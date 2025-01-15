<?php
session_start();
header('Content-Type: application/json');
require_once 'database.php';

try {
    if (!isset($_GET['tagId']) || empty($_GET['tagId'])) {
        echo json_encode(['success' => false, 'message' => 'ID da tag não fornecido.']);
        exit;
    }

    $tagId = $_GET['tagId'];
    
    // Buscar informações da tag
    $sql = "SELECT T.id, T.nome, COUNT(PT.idProd) as num_producoes 
            FROM TAG T 
            LEFT JOIN PRODUCAO_TAG PT ON T.id = PT.idTag 
            WHERE T.id = :tagId 
            GROUP BY T.id, T.nome";
    
    $stmt = Database::prepare($sql);
    $stmt->bindParam(':tagId', $tagId);
    $stmt->execute();
    
    $tagInfo = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if ($tagInfo) {
        echo json_encode([
            'success' => true, 
            'tag' => $tagInfo
        ]);
    } else {
        echo json_encode([
            'success' => false, 
            'message' => 'Tag não encontrada.'
        ]);
    }
} catch (Exception $e) {
    echo json_encode([
        'success' => false, 
        'message' => 'Erro: ' . $e->getMessage()
    ]);
}
?>