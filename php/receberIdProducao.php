<?php
require_once 'database.php';
header('Content-Type: application/json'); // Define o tipo de conteúdo como JSON

try {
    // Verifica se o parâmetro 'idAPI' foi passado
    if (!isset($_GET['idAPI']) || empty($_GET['idAPI'])) {
        echo json_encode(['success' => false, 'message' => 'ID da API não fornecido.']);
        exit;
    }

    $idAPI = $_GET['idAPI'];

    // Consulta para buscar o idProd baseado no idAPI
    $sql = "SELECT id FROM PRODUCAO WHERE idAPI = :idAPI";
    $stmt = Database::prepare($sql);
    $stmt->bindParam(':idAPI', $idAPI, PDO::PARAM_STR);
    $stmt->execute();

    // Obtém o resultado
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    // Verifica se encontrou o idProd
    if (!$result) {
        echo json_encode(['success' => false, 'message' => 'Produção não encontrada para o ID da API fornecido.']);
    } else {
        echo json_encode(['success' => true, 'idProd' => $result['id']]);
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Erro: ' . $e->getMessage()]);
}
