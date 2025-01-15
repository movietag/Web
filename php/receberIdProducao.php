<?php
require_once 'database.php';
session_start();
header('Content-Type: application/json');

try {
    if (!isset($_SESSION['dados']['idProd'])) {
        if (!isset($_GET['idAPI']) || empty($_GET['idAPI'])) {
            error_log("Erro: ID da API não fornecido.");
            echo json_encode(['success' => false, 'message' => 'ID da API não fornecido.']);
            exit;
        }

        $idAPI = $_GET['idAPI'];
        error_log("ReceberIdProducao - ID da API recebido: " . $idAPI);

        $sql = "SELECT id FROM PRODUCAO WHERE idAPI = :idAPI";
        $stmt = Database::prepare($sql);
        $stmt->bindParam(':idAPI', $idAPI, PDO::PARAM_STR);
        $stmt->execute();

        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$result) {
            error_log("Produção não encontrada para o ID da API fornecido: " . $idAPI);
            echo json_encode(['success' => false, 'message' => 'Produção não encontrada para o ID da API fornecido.']);
        } else {
            error_log("ReceberIdProducao - ID da Produção encontrado: " . $result['id']);
            echo json_encode(['success' => true, 'idProd' => $result['id']]);
        }
    } else {
        $idProd = $_SESSION['dados']['idProd'];
        error_log("Sessão - ID da Produção: " . $idProd);
        echo json_encode(['success' => true, 'idProd' => $idProd]);
    }
} catch (Exception $e) {
    error_log("Erro: " . $e->getMessage());
    echo json_encode(['success' => false, 'message' => 'Erro: ' . $e->getMessage()]);
}
?>
