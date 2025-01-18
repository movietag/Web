<?php
// pesquisarPorTags.php
session_start();
header('Content-Type: application/json');
require_once 'database.php';

try {
    // Get JSON data from request
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($data['tags']) || empty($data['tags'])) {
        echo json_encode(['success' => false, 'message' => 'No tags provided']);
        exit;
    }
    
    $tags = $data['tags'];
    $tagCount = count($tags);
    
    // Build query to find productions that have ALL specified tags
    $sql = "SELECT 
                P.*,
                GROUP_CONCAT(DISTINCT T.nome) as tag_names
            FROM PRODUCAO P
            INNER JOIN PRODUCAO_TAG PT ON P.id = PT.idProd
            INNER JOIN TAG T ON PT.idTag = T.id
            WHERE P.id IN (
                SELECT PT2.idProd
                FROM PRODUCAO_TAG PT2
                INNER JOIN TAG T2 ON PT2.idTag = T2.id
                WHERE T2.nome IN (" . str_repeat('?,', count($tags) - 1) . "?)
                GROUP BY PT2.idProd
                HAVING COUNT(DISTINCT T2.nome) = ?
            )
            GROUP BY P.id
            ORDER BY P.nomeProd";
    
    $stmt = Database::prepare($sql);
    
    // Bind all tag names and the count
    $params = array_merge($tags, [$tagCount]);
    $stmt->execute($params);
    
    $productions = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Process tags for each production
    foreach ($productions as &$production) {
        $production['tags'] = $production['tag_names'] ? explode(',', $production['tag_names']) : [];
        unset($production['tag_names']);
    }
    
    echo json_encode([
        'success' => true,
        'productions' => $productions
    ]);
    
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Error: ' . $e->getMessage()
    ]);
}
?>