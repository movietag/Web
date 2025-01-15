<?php 
session_start();
header('Content-Type: application/json');
require_once 'database.php';

try {
    $idProd = $_GET['idProd'] ?? null; // ID da produção
    $idTag = $_GET['idTag'] ?? null;   // ID da tag (opcional)

    // Verifica se o parâmetro `idProd` está presente
    if (!$idProd) {
        echo json_encode(['success' => false, 'message' => 'ID da produção não fornecido.']);
        exit;
    }

    // Monta a consulta com base nos parâmetros fornecidos
    if ($idTag) {
        $sql = "SELECT DISTINCT T.id, T.nome 
                FROM TAG T 
                INNER JOIN PRODUCAO_TAG PT ON T.id = PT.idTag 
                WHERE PT.idProd = :idProd AND PT.idTag = :idTag
                ORDER BY T.nome";
        $stmt = Database::prepare($sql);
        $stmt->bindParam(':idProd', $idProd);
        $stmt->bindParam(':idTag', $idTag);
    } else {
        $sql = "SELECT DISTINCT T.id, T.nome 
                FROM TAG T 
                INNER JOIN PRODUCAO_TAG PT ON T.id = PT.idTag 
                WHERE PT.idProd = :idProd
                ORDER BY T.nome";
        $stmt = Database::prepare($sql);
        $stmt->bindParam(':idProd', $idProd);
    }

    $stmt->execute();
    $tags = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(['success' => true, 'tags' => $tags]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Erro: ' . $e->getMessage()]);
}
